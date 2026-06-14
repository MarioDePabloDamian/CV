import React, { useEffect, useRef } from "react";
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

interface TargetRotation {
  x: number;
  y: number;
  startX: number;
  startY: number;
  startTime: number;
  duration: number;
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
  const animationFrameRef = useRef<number>(0);
  const reduceMotionRef = useRef(false);
  const coarsePointerRef = useRef(false);
  const rotationRef = useRef({ x: 0, y: 0 });
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);
  const labelsRef = useRef<string[]>([]);
  const iconPositionsRef = useRef<Icon[]>([]);
  const pointerPosRef = useRef({ x: size / 2, y: size / 2 });
  const isDraggingRef = useRef(false);
  const lastPointerPosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef<TargetRotation | null>(null);
  const activePointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    coarsePointerRef.current = window.matchMedia("(pointer: coarse)").matches;
    pointerPosRef.current = { x: size / 2, y: size / 2 };
  }, [size]);

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
    if (count === 0) {
      iconPositionsRef.current = [];
      return;
    }

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
    iconPositionsRef.current = newIcons;
  }, [icons, images, items]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
    });
    if (!ctx) return;

    let running = true;

    const animate = () => {
      if (!running) return;

      const iconPositions = iconPositionsRef.current;
      if (iconPositions.length === 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const pointerPos = pointerPosRef.current;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const dx = pointerPos.x - centerX;
      const dy = pointerPos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.003 + (distance / maxDistance) * 0.01;
      const targetRotation = targetRotationRef.current;

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

        if (progress >= 1) {
          targetRotationRef.current = null;
        }
      } else if (!isDraggingRef.current && !reduceMotionRef.current) {
        const autoRotateX = 0.001;
        const autoRotateY = 0.003;
        rotationRef.current = {
          x: rotationRef.current.x + autoRotateX + (dy / canvas.height) * speed,
          y: rotationRef.current.y + autoRotateY + (dx / canvas.width) * speed,
        };
      }

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);
      const halfW = canvas.width / 2;
      const halfH = canvas.height / 2;

      for (let index = 0; index < iconPositions.length; index++) {
        const icon = iconPositions[index];
        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;
        const scale = (rotatedZ + 200) / 300;
        const opacity = Math.max(0.45, Math.min(1, (rotatedZ + 150) / 200));

        if (
          !iconCanvasesRef.current[index] ||
          !imagesLoadedRef.current[index]
        ) {
          continue;
        }

        ctx.globalAlpha = opacity;
        ctx.drawImage(
          iconCanvasesRef.current[index],
          halfW + rotatedX - 20 * scale,
          halfH + rotatedY - 20 * scale,
          40 * scale,
          40 * scale
        );
      }

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      running = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [size]);

  const updatePointer = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    if (!rect || !canvas) return;

    pointerPosRef.current = {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const focusIcon = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    if (!rect || !canvas) return false;

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    for (const icon of iconPositionsRef.current) {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const screenX = canvas.width / 2 + rotatedX;
      const screenY = canvas.height / 2 + rotatedY;
      const scale = (rotatedZ + 200) / 300;
      const radius = 20 * scale;
      const hitDx = x - screenX;
      const hitDy = y - screenY;

      if (hitDx * hitDx + hitDy * hitDy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        );
        const targetY = Math.atan2(icon.x, icon.z);
        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const rotDistance = Math.hypot(targetX - currentX, targetY - currentY);
        const duration = Math.min(2000, Math.max(800, rotDistance * 1000));

        targetRotationRef.current = {
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          startTime: performance.now(),
          duration,
        };
        return true;
      }
    }
    return false;
  };

  const dragSensitivity = () =>
    coarsePointerRef.current ? 0.0035 : 0.002;

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
      const deltaX = event.clientX - lastPointerPosRef.current.x;
      const deltaY = event.clientY - lastPointerPosRef.current.y;
      rotationRef.current = {
        x: rotationRef.current.x + deltaY * dragSensitivity(),
        y: rotationRef.current.y + deltaX * dragSensitivity(),
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
      width={size}
      height={size}
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
