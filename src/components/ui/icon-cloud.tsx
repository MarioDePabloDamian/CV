import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

import { cn } from "@/lib/utils";

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

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

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function drawFallbackIcon(
  ctx: CanvasRenderingContext2D,
  label: string,
  failed: boolean
) {
  ctx.fillStyle = failed ? "#64748b" : "#0ea5e9";
  ctx.beginPath();
  ctx.arc(20, 20, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 11px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const text = label
    .split(/[\s·]+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  ctx.fillText(text || "?", 20, 20);
}

export function IconCloud({
  icons,
  images,
  items,
  className,
  size = 400,
}: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPointerPos, setLastPointerPos] = useState({ x: 0, y: 0 });
  const [pointerPos, setPointerPos] = useState({ x: size / 2, y: size / 2 });
  const [targetRotation, setTargetRotation] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    distance: number;
    startTime: number;
    duration: number;
  } | null>(null);
  const [, setLoadTick] = useState(0);
  const animationFrameRef = useRef<number>(0);
  const reduceMotionRef = useRef(false);
  const rotationRef = useRef({ x: 0, y: 0 });
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);
  const labelsRef = useRef<string[]>([]);

  const bumpLoad = () => setLoadTick((tick) => tick + 1);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    const resolvedItems: IconCloudItem[] =
      items ??
      (images?.map((src, index) => ({ src, label: `T${index + 1}` })) ?? []);

    if (!icons && resolvedItems.length === 0) return;

    const imageSources = icons ? [] : resolvedItems.map((item) => item.src);
    labelsRef.current = icons
      ? resolvedItems.map((_, index) => `I${index + 1}`)
      : resolvedItems.map((item) => item.label);

    const count = icons?.length ?? imageSources.length;
    imagesLoadedRef.current = new Array(count).fill(false);

    const newIconCanvases = Array.from({ length: count }, (_, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = 40;
      offscreen.height = 40;
      const offCtx = offscreen.getContext("2d");

      if (!offCtx) return offscreen;

      const markReady = (failed = false) => {
        if (!imagesLoadedRef.current[index]) {
          if (failed) {
            drawFallbackIcon(offCtx, labelsRef.current[index] ?? "?", true);
          }
          imagesLoadedRef.current[index] = true;
          bumpLoad();
        }
      };

      if (icons) {
        offCtx.scale(0.4, 0.4);
        const svgString = renderToString(icons[index] as React.ReactElement);
        const img = new Image();
        img.onload = () => {
          offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
          offCtx.drawImage(img, 0, 0);
          markReady();
        };
        img.onerror = () => markReady(true);
        img.src =
          "data:image/svg+xml;base64," +
          btoa(unescape(encodeURIComponent(svgString)));
      } else {
        const src = imageSources[index];
        const img = new Image();
        if (src.includes("cdn.simpleicons.org")) {
          img.crossOrigin = "anonymous";
        }
        img.onload = () => {
          offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
          offCtx.beginPath();
          offCtx.arc(20, 20, 20, 0, Math.PI * 2);
          offCtx.closePath();
          offCtx.clip();

          const maxSize = 34;
          const scale = Math.min(
            maxSize / (img.naturalWidth || maxSize),
            maxSize / (img.naturalHeight || maxSize)
          );
          const width = (img.naturalWidth || maxSize) * scale;
          const height = (img.naturalHeight || maxSize) * scale;
          offCtx.drawImage(
            img,
            (40 - width) / 2,
            (40 - height) / 2,
            width,
            height
          );
          markReady();
        };
        img.onerror = () => markReady(true);
        img.src = src;
      }

      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images, items]);

  useEffect(() => {
    const count = icons?.length ?? items?.length ?? images?.length ?? 0;
    if (count === 0) return;

    const newIcons: Icon[] = [];
    const offset = 2 / count;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;
      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      newIcons.push({
        x: x * 100,
        y: y * 100,
        z: z * 100,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    setIconPositions(newIcons);
  }, [icons, images, items]);

  const focusIcon = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return false;

    const x = ((clientX - rect.left) / rect.width) * canvasRef.current.width;
    const y = ((clientY - rect.top) / rect.height) * canvasRef.current.height;

    for (const icon of iconPositions) {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const screenX = canvasRef.current.width / 2 + rotatedX;
      const screenY = canvasRef.current.height / 2 + rotatedY;
      const scale = (rotatedZ + 200) / 300;
      const radius = 20 * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        );
        const targetY = Math.atan2(icon.x, icon.z);
        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        );
        const duration = Math.min(2000, Math.max(800, distance * 1000));

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        });
        return true;
      }
    }
    return false;
  };

  const updatePointer = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;

    setPointerPos({
      x: ((clientX - rect.left) / rect.width) * canvasRef.current.width,
      y: ((clientY - rect.top) / rect.height) * canvasRef.current.height,
    });
  };

  const handlePointerDown = (clientX: number, clientY: number) => {
    if (!focusIcon(clientX, clientY)) {
      setIsDragging(true);
      setLastPointerPos({ x: clientX, y: clientY });
    }
    updatePointer(clientX, clientY);
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    updatePointer(clientX, clientY);
    if (isDragging) {
      const deltaX = clientX - lastPointerPos.x;
      const deltaY = clientY - lastPointerPos.y;
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };
      setLastPointerPos({ x: clientX, y: clientY });
    }
  };

  const handlePointerUp = () => setIsDragging(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const dx = pointerPos.x - centerX;
      const dy = pointerPos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.003 + (distance / maxDistance) * 0.01;

      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);

        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * easedProgress,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * easedProgress,
        };

        if (progress >= 1) setTargetRotation(null);
      } else if (!isDragging && !reduceMotionRef.current) {
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvas.height) * speed,
          y: rotationRef.current.y + (dx / canvas.width) * speed,
        };
      }

      iconPositions.forEach((icon, index) => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;
        const scale = (rotatedZ + 200) / 300;
        const opacity = Math.max(0.45, Math.min(1, (rotatedZ + 150) / 200));

        ctx.save();
        ctx.translate(canvas.width / 2 + rotatedX, canvas.height / 2 + rotatedY);
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        if (
          iconCanvasesRef.current[index] &&
          imagesLoadedRef.current[index]
        ) {
          ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40);
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [iconPositions, isDragging, pointerPos, targetRotation, icons, images, items]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
      onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={(e) => {
        const touch = e.touches[0];
        if (touch) handlePointerDown(touch.clientX, touch.clientY);
      }}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) {
          e.preventDefault();
          handlePointerMove(touch.clientX, touch.clientY);
        }
      }}
      onTouchEnd={handlePointerUp}
      className={cn("max-w-full touch-none rounded-lg", className)}
      style={{ width: "100%", height: "auto", maxWidth: size, aspectRatio: "1 / 1" }}
      aria-label="Nube interactiva de tecnologías"
      role="img"
    />
  );
}
