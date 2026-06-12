import { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

const FRAGMENT_SHADER = `
uniform float iTime;
uniform vec2 iResolution;
uniform float iLightMode;

#define NUM_OCTAVES 3

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);

  float res = mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
    u.y
  );
  return res * res;
}

float fbm(vec2 x) {
  float v = 0.0;
  float a = 0.3;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(x);
    x = rot * x * 2.0 + shift;
    a *= 0.4;
  }
  return v;
}

void main() {
  vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
  vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
  vec2 v;
  vec4 o = vec4(0.0);

  float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

  for (float i = 0.0; i < 35.0; i++) {
    v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
    float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));

    vec4 darkColors = vec4(
      0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
      0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
      0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
      1.0
    );
    vec4 lightColors = vec4(
      0.20 + 0.12 * sin(i * 0.2 + iTime * 0.4),
      0.48 + 0.18 * cos(i * 0.3 + iTime * 0.5),
      0.78 + 0.14 * sin(i * 0.4 + iTime * 0.3),
      1.0
    );
    vec4 auroraColors = mix(darkColors, lightColors, iLightMode);

    vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
    float thinnessFactor = smoothstep(0.0, 1.0, i / 35.0) * mix(0.6, 0.55, iLightMode);
    o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
  }

  float divisor = mix(100.0, 115.0, iLightMode);
  o = tanh(pow(o / divisor, vec4(1.6)));
  vec3 aurora = (o * mix(1.5, 1.35, iLightMode)).rgb;

  vec3 darkResult = aurora;
  vec3 base = vec3(0.97, 0.975, 0.985);
  vec3 tint = vec3(
    aurora.r * 0.14 + aurora.g * 0.10 + 0.03,
    aurora.g * 0.20 + aurora.b * 0.12 + 0.05,
    aurora.b * 0.22 + aurora.g * 0.14 + 0.08
  );
  float strength = clamp(length(aurora) * mix(0.0, 3.2, iLightMode), 0.0, 1.0);
  vec3 lightResult = mix(base, min(base + tint, vec3(0.88, 0.94, 0.98)), strength);

  gl_FragColor = vec4(mix(darkResult, lightResult, iLightMode), 1.0);
}
`;

export type ShaderVariant = "light" | "dark";

export interface AnimatedShaderBackgroundProps {
  className?: string;
  variant?: ShaderVariant;
}

export function AnimatedShaderBackground({
  className,
  variant = "dark",
}: AnimatedShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    Object.assign(renderer.domElement.style, {
      display: "block",
      width: "100%",
      height: "100%",
    });
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        iLightMode: { value: variant === "light" ? 1.0 : 0.0 },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: FRAGMENT_SHADER,
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId = 0;
    const animate = () => {
      material.uniforms.iTime.value += 0.016;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      materialRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.iLightMode.value =
        variant === "light" ? 1.0 : 0.0;
    }
  }, [variant]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      aria-hidden
    >
      <div className="relative z-10 divider" />
    </div>
  );
}

export default AnimatedShaderBackground;
