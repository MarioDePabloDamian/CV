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

// OffscreenCanvas + Worker supported in Chrome 69+, Firefox 105+, Safari 16.4+
const SUPPORTS_OFFSCREEN =
  typeof OffscreenCanvas !== "undefined" &&
  typeof Worker !== "undefined" &&
  typeof createImageBitmap !== "undefined";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Draw a circular clipped icon onto a 40×40 canvas element */
function drawIconOnCanvas(
  offCtx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  failed: boolean
) {
  if (failed) {
    // Silently leave blank — fallback drawn by caller
    return;
  }
  offCtx.beginPath();
  offCtx.arc(20, 20, 20, 0, Math.PI * 2);
  offCtx.closePath();
  offCtx.clip();
  const maxSize = 34;
  const scale = Math.min(
    maxSize / (img.naturalWidth || maxSize),
    maxSize / (img.naturalHeight || maxSize)
  );
  const w = (img.naturalWidth || maxSize) * scale;
  const h = (img.naturalHeight || maxSize) * scale;
  offCtx.drawImage(img, (40 - w) / 2, (40 - h) / 2, w, h);
}

function drawFallbackOn(ctx: CanvasRenderingContext2D, label: string) {
  ctx.fillStyle = "#64748b";
  ctx.beginPath();
  ctx.arc(20, 20, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 11px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const text = label
    .split(/[\s·]+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  ctx.fillText(text || "?", 20, 20);
}

// ---------------------------------------------------------------------------
// Worker path: load images in main thread (handles CORS), transfer ImageBitmaps
// ---------------------------------------------------------------------------

async function buildBitmaps(resolvedItems: IconCloudItem[]): Promise<ImageBitmap[]> {
  const bitmaps = await Promise.all(
    resolvedItems.map(
      (item) =>
        new Promise<ImageBitmap>((resolve) => {
          const offscreen = document.createElement("canvas");
          offscreen.width = 40;
          offscreen.height = 40;
          const ctx = offscreen.getContext("2d")!;

          const fallback = async () => {
            drawFallbackOn(ctx, item.label);
            resolve(await createImageBitmap(offscreen));
          };

          const img = new Image();
          if (item.src.includes("cdn.simpleicons.org")) img.crossOrigin = "anonymous";

          img.onload = async () => {
            try {
              drawIconOnCanvas(ctx, img, false);
              resolve(await createImageBitmap(offscreen));
            } catch {
              await fallback();
            }
          };
          img.onerror = () => fallback();
          img.src = item.src;
        })
    )
  );
  return bitmaps;
}

// ---------------------------------------------------------------------------
// Worker-powered component
// ---------------------------------------------------------------------------

function IconCloudWorker({
  images,
  items,
  className,
  size = 400,
}: Omit<IconCloudProps, "icons">) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const activePointerIdRef = useRef<number | null>(null);

  // Boot worker + transfer OffscreenCanvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let offscreen: OffscreenCanvas;
    try {
      offscreen = canvas.transferControlToOffscreen();
    } catch {
      // Already transferred or not supported — bail out
      return;
    }

    const worker = new Worker(
      new URL("./icon-cloud.worker.ts", import.meta.url),
      { type: "module" }
    );
    workerRef.current = worker;

    worker.postMessage(
      {
        type: "init",
        canvas: offscreen,
        size,
        reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        coarsePointer: window.matchMedia("(pointer: coarse)").matches,
      },
      [offscreen]
    );

    const observer = new IntersectionObserver(
      ([entry]) =>
        worker.postMessage({ type: "setVisible", visible: entry.isIntersecting }),
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      worker.terminate();
      workerRef.current = null;
      observer.disconnect();
    };
  }, [size]);

  // Re-send bitmaps when items change
  useEffect(() => {
    const worker = workerRef.current;
    if (!worker) return;

    const resolvedItems: IconCloudItem[] =
      items ?? images?.map((src, i) => ({ src, label: `T${i + 1}` })) ?? [];
    if (resolvedItems.length === 0) return;

    buildBitmaps(resolvedItems).then((bitmaps) => {
      if (!workerRef.current) return; // unmounted while loading
      workerRef.current.postMessage({ type: "setBitmaps", bitmaps }, bitmaps);
    });
  }, [items, images]);

  // Pointer helpers
  const toCanvas = (clientX: number, clientY: number) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: ((clientX - rect.left) / rect.width) * size,
      y: ((clientY - rect.top) / rect.height) * size,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    activePointerIdRef.current = e.pointerId;
    e.currentTarget.setPointerCapture(e.pointerId);
    const pos = toCanvas(e.clientX, e.clientY);
    if (pos) workerRef.current?.postMessage({ type: "pointerDown", ...pos });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;
    const pos = toCanvas(e.clientX, e.clientY);
    if (pos) workerRef.current?.postMessage({ type: "pointerMove", ...pos });
  };

  const endPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activePointerIdRef.current !== e.pointerId) return;
    activePointerIdRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    workerRef.current?.postMessage({ type: "pointerUp" });
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

// ---------------------------------------------------------------------------
// Fallback: main-thread rendering (Safari < 16.4, or when icons[] are passed)
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

    const newIconCanvases = Array.from({ length: count }, (_, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = 40;
      offscreen.height = 40;
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return offscreen;

      const markReady = (failed = false) => {
        if (!imagesLoadedRef.current[index]) {
          if (failed) drawFallbackOn(offCtx, labelsRef.current[index] ?? "?");
          imagesLoadedRef.current[index] = true;
        }
      };

      if (icons) {
        const el = icons[index] as React.ReactElement<Record<string, unknown>>;
        const img = new Image();
        img.onload = () => {
          offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
          offCtx.scale(0.4, 0.4);
          offCtx.drawImage(img, 0, 0);
          markReady();
        };
        img.onerror = () => markReady(true);
        if (typeof el?.type === "string" && (el.type === "img" || el.type === "svg")) {
          img.src = (el.props?.src as string) ?? "";
        } else {
          markReady(true);
        }
      } else {
        const src = imageSources[index];
        const img = new Image();
        if (src.includes("cdn.simpleicons.org")) img.crossOrigin = "anonymous";
        img.onload = () => {
          offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
          drawIconOnCanvas(offCtx, img, false);
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

    let running = true;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const animate = () => {
      if (!running) return;
      if (!isVisible) { animationFrameRef.current = requestAnimationFrame(animate); return; }

      const iconPositions = iconPositionsRef.current;
      if (iconPositions.length === 0) { animationFrameRef.current = requestAnimationFrame(animate); return; }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
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
          x: rotationRef.current.x + 0.001 + (dy / canvas.height) * speed,
          y: rotationRef.current.y + 0.003 + (dx / canvas.width) * speed,
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
        if (!iconCanvasesRef.current[index] || !imagesLoadedRef.current[index]) continue;
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
      observer.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
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

// ---------------------------------------------------------------------------
// Public export — picks the right implementation automatically
// ---------------------------------------------------------------------------

export function IconCloud(props: IconCloudProps) {
  // If React nodes are passed, always use legacy (needs renderToString in browser)
  // If browser lacks OffscreenCanvas, use legacy
  if (props.icons || !SUPPORTS_OFFSCREEN) {
    return <IconCloudLegacy {...props} />;
  }
  return <IconCloudWorker {...props} />;
}
