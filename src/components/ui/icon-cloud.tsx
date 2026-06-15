import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface IconCloudItem {
  src: string;
  label: string;
}

export interface IconCloudProps {
  icons?: React.ReactNode[];
  images?: string[];
  items?: IconCloudItem[];
  className?: string;
  size?: number;
}

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const ICON_SIZE = 40;

function getDpr() {
  return window.devicePixelRatio || 1;
}

/** Native display resolution for each icon buffer */
function getIconBufferSize() {
  return Math.round(ICON_SIZE * getDpr());
}

function configureCanvasQuality(ctx: CanvasRenderingContext2D) {
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Rasterize icon/SVG at exact pixel size (drawImage dest size drives SVG resolution) */
function rasterizeIcon(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  pixelSize: number
) {
  configureCanvasQuality(ctx);

  const center = pixelSize / 2;
  const drawSize = Math.round(pixelSize * 0.85);
  const offset = (pixelSize - drawSize) / 2;

  ctx.save();
  ctx.beginPath();
  ctx.arc(center, center, center, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, offset, offset, drawSize, drawSize);
  ctx.restore();
}

function isExternalUrl(src: string) {
  return /^https?:\/\//i.test(src);
}

function drawFallbackOn(
  ctx: CanvasRenderingContext2D,
  label: string,
  pixelSize: number
) {
  const center = pixelSize / 2;
  ctx.fillStyle = "#64748b";
  ctx.beginPath();
  ctx.arc(center, center, center, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = `bold ${Math.round(pixelSize * 0.275)}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const text = label
    .split(/[\s·]+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  ctx.fillText(text || "?", center, center);
}

// ---------------------------------------------------------------------------
// Main-thread canvas renderer
// ---------------------------------------------------------------------------

interface LegacyIcon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

interface TargetRotation {
  x: number;
  y: number;
  startX: number;
  startY: number;
  startTime: number;
  duration: number;
}

function IconCloudLegacy({
  icons,
  images,
  items,
  className,
  size = 400,
}: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const reduceMotionRef = useRef(false);
  const coarsePointerRef = useRef(false);
  const rotationRef = useRef({ x: 0, y: 0 });
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);
  const labelsRef = useRef<string[]>([]);
  const iconPositionsRef = useRef<LegacyIcon[]>([]);
  const pointerPosRef = useRef({ x: size / 2, y: size / 2 });
  const isDraggingRef = useRef(false);
  const lastPointerPosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef<TargetRotation | null>(null);
  const activePointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    coarsePointerRef.current = window.matchMedia("(pointer: coarse)").matches;
    pointerPosRef.current = { x: size / 2, y: size / 2 };
  }, [size]);

  useEffect(() => {
    const resolvedItems: IconCloudItem[] =
      items ?? (images?.map((src, i) => ({ src, label: `T${i + 1}` })) ?? []);

    if (!icons && resolvedItems.length === 0) return;

    const imageSources = icons ? [] : resolvedItems.map((item) => item.src);
    labelsRef.current = icons
      ? resolvedItems.map((_, i) => `I${i + 1}`)
      : resolvedItems.map((item) => item.label);

    const count = icons?.length ?? imageSources.length;
    imagesLoadedRef.current = new Array(count).fill(false);
    const iconPixelSize = getIconBufferSize();

    const newIconCanvases = Array.from({ length: count }, (_, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = iconPixelSize;
      offscreen.height = iconPixelSize;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return offscreen;
      configureCanvasQuality(offCtx);

      const markReady = (failed = false) => {
        if (!imagesLoadedRef.current[index]) {
          if (failed) drawFallbackOn(offCtx, labelsRef.current[index] ?? "?", iconPixelSize);
          imagesLoadedRef.current[index] = true;
        }
      };

      const loadIcon = (img: HTMLImageElement) => {
        offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
        try {
          rasterizeIcon(offCtx, img, iconPixelSize);
          markReady();
        } catch {
          markReady(true);
        }
      };

      if (icons) {
        const el = icons[index] as React.ReactElement<Record<string, unknown>>;
        const img = new Image();
        const src = (el.props?.src as string) ?? "";
        if (isExternalUrl(src)) img.crossOrigin = "anonymous";
        img.onload = () => loadIcon(img);
        img.onerror = () => markReady(true);
        if (typeof el?.type === "string" && (el.type === "img" || el.type === "svg")) {
          img.src = src;
        } else {
          markReady(true);
        }
      } else {
        const src = imageSources[index];
        const img = new Image();
        if (isExternalUrl(src)) img.crossOrigin = "anonymous";
        img.onload = () => loadIcon(img);
        img.onerror = () => markReady(true);
        img.src = src;
      }

      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images, items]);

  useEffect(() => {
    const count = icons?.length ?? items?.length ?? images?.length ?? 0;
    if (count === 0) {
      iconPositionsRef.current = [];
      return;
    }
    const newIcons: LegacyIcon[] = [];
    const offset = 2 / count;
    const increment = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;
      newIcons.push({ x: x * 100, y: y * 100, z: z * 100, scale: 1, opacity: 1, id: i });
    }
    iconPositionsRef.current = newIcons;
  }, [icons, images, items]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    const dpr = getDpr();
    canvas.width = Math.round(size * dpr);
    canvas.height = Math.round(size * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    let running = true;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const halfIcon = ICON_SIZE / 2;

    const animate = () => {
      if (!running) return;
      if (!isVisible) { animationFrameRef.current = requestAnimationFrame(animate); return; }

      const iconPositions = iconPositionsRef.current;
      if (iconPositions.length === 0) { animationFrameRef.current = requestAnimationFrame(animate); return; }

      ctx.clearRect(0, 0, size, size);
      const centerX = size / 2;
      const centerY = size / 2;
      const pointerPos = pointerPosRef.current;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const dx = pointerPos.x - centerX;
      const dy = pointerPos.y - centerY;
      const speed = 0.003 + (Math.sqrt(dx * dx + dy * dy) / maxDistance) * 0.01;
      const targetRotation = targetRotationRef.current;

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);
        rotationRef.current = {
          x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * easedProgress,
          y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * easedProgress,
        };
        if (progress >= 1) targetRotationRef.current = null;
      } else if (!isDraggingRef.current && !reduceMotionRef.current) {
        rotationRef.current = {
          x: rotationRef.current.x + 0.001 + (dy / size) * speed,
          y: rotationRef.current.y + 0.003 + (dx / size) * speed,
        };
      }

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      for (let index = 0; index < iconPositions.length; index++) {
        const icon = iconPositions[index];
        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;
        const scale = (rotatedZ + 200) / 300;
        const opacity = Math.max(0.45, Math.min(1, (rotatedZ + 150) / 200));
        if (!iconCanvasesRef.current[index] || !imagesLoadedRef.current[index]) continue;
        ctx.globalAlpha = opacity;
        ctx.drawImage(
          iconCanvasesRef.current[index],
          centerX + rotatedX - halfIcon * scale,
          centerY + rotatedY - halfIcon * scale,
          ICON_SIZE * scale,
          ICON_SIZE * scale
        );
      }
      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      running = false;
      observer.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [size]);

  const updatePointer = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    if (!rect || !canvas) return;
    pointerPosRef.current = {
      x: ((clientX - rect.left) / rect.width) * size,
      y: ((clientY - rect.top) / rect.height) * size,
    };
  };

  const focusIcon = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    if (!rect || !canvas) return false;
    const x = ((clientX - rect.left) / rect.width) * size;
    const y = ((clientY - rect.top) / rect.height) * size;
    const halfIcon = ICON_SIZE / 2;

    for (const icon of iconPositionsRef.current) {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);
      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;
      const screenX = size / 2 + rotatedX;
      const screenY = size / 2 + rotatedY;
      const scale = (rotatedZ + 200) / 300;
      const radius = halfIcon * scale;
      const hitDx = x - screenX;
      const hitDy = y - screenY;
      if (hitDx * hitDx + hitDy * hitDy < radius * radius) {
        const targetX = -Math.atan2(icon.y, Math.sqrt(icon.x * icon.x + icon.z * icon.z));
        const targetY = Math.atan2(icon.x, icon.z);
        const d = Math.hypot(targetX - rotationRef.current.x, targetY - rotationRef.current.y);
        targetRotationRef.current = {
          x: targetX, y: targetY,
          startX: rotationRef.current.x, startY: rotationRef.current.y,
          startTime: performance.now(),
          duration: Math.min(2000, Math.max(800, d * 1000)),
        };
        return true;
      }
    }
    return false;
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    activePointerIdRef.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    if (!focusIcon(event.clientX, event.clientY)) {
      isDraggingRef.current = true;
      lastPointerPosRef.current = { x: event.clientX, y: event.clientY };
    }
    updatePointer(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointerIdRef.current !== event.pointerId) return;
    updatePointer(event.clientX, event.clientY);
    if (isDraggingRef.current) {
      const sensitivity = coarsePointerRef.current ? 0.0035 : 0.002;
      const deltaX = event.clientX - lastPointerPosRef.current.x;
      const deltaY = event.clientY - lastPointerPosRef.current.y;
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * sensitivity,
        y: rotationRef.current.y + deltaX * sensitivity,
      };
      lastPointerPosRef.current = { x: event.clientX, y: event.clientY };
    }
  };

  const endPointer = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointerIdRef.current !== event.pointerId) return;
    isDraggingRef.current = false;
    activePointerIdRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onPointerLeave={endPointer}
      className={cn("max-w-full touch-none rounded-lg", className)}
      style={{
        width: "100%",
        height: "auto",
        maxWidth: size,
        aspectRatio: "1 / 1",
        touchAction: "none",
      }}
      aria-label="Nube interactiva de tecnologías"
      role="img"
    />
  );
}

// ---------------------------------------------------------------------------
// Public export
// ---------------------------------------------------------------------------

export function IconCloud(props: IconCloudProps) {
  return <IconCloudLegacy {...props} />;
}
