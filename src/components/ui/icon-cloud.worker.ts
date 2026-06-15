interface Icon {
  x: number;
  y: number;
  z: number;
}

interface TargetRotation {
  x: number;
  y: number;
  startX: number;
  startY: number;
  startTime: number;
  duration: number;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

// requestAnimationFrame polyfill for workers (available in Chrome/Firefox with OffscreenCanvas,
// falls back to setTimeout for any environment that lacks it)
const rAF: (cb: FrameRequestCallback) => number =
  typeof requestAnimationFrame !== "undefined"
    ? (cb) => requestAnimationFrame(cb)
    : (cb) => setTimeout(() => cb(performance.now()), 1000 / 60) as unknown as number;

const cAF: (id: number) => void =
  typeof cancelAnimationFrame !== "undefined"
    ? (id) => cancelAnimationFrame(id)
    : (id) => clearTimeout(id);

let canvas: OffscreenCanvas | null = null;
let ctx: OffscreenCanvasRenderingContext2D | null = null;
let bitmaps: ImageBitmap[] = [];
let positions: Icon[] = [];
let rotation = { x: 0, y: 0 };
let targetRot: TargetRotation | null = null;
let pointer = { x: 200, y: 200 };
let lastPointer = { x: 0, y: 0 };
let isDragging = false;
let isVisible = true;
let reduceMotion = false;
let coarsePointer = false;
let rafId = 0;

function buildPositions(count: number) {
  positions = [];
  const offset = 2 / count;
  const inc = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * inc;
    positions.push({
      x: Math.cos(phi) * r * 100,
      y: y * 100,
      z: Math.sin(phi) * r * 100,
    });
  }
}

function hitTest(x: number, y: number): boolean {
  if (!canvas) return false;
  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);
  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);
  const hw = canvas.width / 2;
  const hh = canvas.height / 2;

  for (const ico of positions) {
    const rx = ico.x * cosY - ico.z * sinY;
    const rz = ico.x * sinY + ico.z * cosY;
    const ry = ico.y * cosX + rz * sinX;
    const sc = (rz + 200) / 300;
    const sx = hw + rx;
    const sy = hh + ry;
    const rad = 20 * sc;
    if ((x - sx) ** 2 + (y - sy) ** 2 < rad * rad) {
      const tx = -Math.atan2(ico.y, Math.sqrt(ico.x ** 2 + ico.z ** 2));
      const ty = Math.atan2(ico.x, ico.z);
      const d = Math.hypot(tx - rotation.x, ty - rotation.y);
      targetRot = {
        x: tx,
        y: ty,
        startX: rotation.x,
        startY: rotation.y,
        startTime: performance.now(),
        duration: Math.min(2000, Math.max(800, d * 1000)),
      };
      return true;
    }
  }
  return false;
}

function frame() {
  if (!canvas || !ctx) return;
  rafId = rAF(frame);

  if (!isVisible || positions.length === 0 || bitmaps.length === 0) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const dx = pointer.x - cx;
  const dy = pointer.y - cy;
  const maxD = Math.sqrt(cx * cx + cy * cy);
  const speed = 0.003 + (Math.sqrt(dx * dx + dy * dy) / maxD) * 0.01;

  if (targetRot) {
    const p = Math.min(1, (performance.now() - targetRot.startTime) / targetRot.duration);
    const e = easeOutCubic(p);
    rotation = {
      x: targetRot.startX + (targetRot.x - targetRot.startX) * e,
      y: targetRot.startY + (targetRot.y - targetRot.startY) * e,
    };
    if (p >= 1) targetRot = null;
  } else if (!isDragging && !reduceMotion) {
    rotation = {
      x: rotation.x + 0.001 + (dy / canvas.height) * speed,
      y: rotation.y + 0.003 + (dx / canvas.width) * speed,
    };
  }

  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);
  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);
  const hw = canvas.width / 2;
  const hh = canvas.height / 2;

  for (let i = 0; i < positions.length; i++) {
    const ico = positions[i];
    const rx = ico.x * cosY - ico.z * sinY;
    const rz = ico.x * sinY + ico.z * cosY;
    const ry = ico.y * cosX + rz * sinX;
    const sc = (rz + 200) / 300;
    const op = Math.max(0.45, Math.min(1, (rz + 150) / 200));
    const bmp = bitmaps[i];
    if (!bmp) continue;
    ctx.globalAlpha = op;
    ctx.drawImage(bmp, hw + rx - 20 * sc, hh + ry - 20 * sc, 40 * sc, 40 * sc);
  }
  ctx.globalAlpha = 1;
}

self.onmessage = ({ data }: MessageEvent) => {
  switch (data.type) {
    case "init": {
      canvas = data.canvas as OffscreenCanvas;
      reduceMotion = data.reduceMotion as boolean;
      coarsePointer = data.coarsePointer as boolean;
      pointer = { x: data.size / 2, y: data.size / 2 };
      ctx = canvas.getContext("2d", {
        alpha: true,
        desynchronized: true,
      }) as OffscreenCanvasRenderingContext2D;
      cAF(rafId);
      rafId = rAF(frame);
      break;
    }
    case "setBitmaps": {
      bitmaps = data.bitmaps as ImageBitmap[];
      buildPositions(bitmaps.length);
      break;
    }
    case "setVisible": {
      isVisible = data.visible as boolean;
      break;
    }
    case "pointerMove": {
      if (isDragging) {
        const sens = coarsePointer ? 0.0035 : 0.002;
        rotation = {
          x: rotation.x + (data.y - lastPointer.y) * sens,
          y: rotation.y + (data.x - lastPointer.x) * sens,
        };
      }
      pointer = { x: data.x, y: data.y };
      lastPointer = { x: data.x, y: data.y };
      break;
    }
    case "pointerDown": {
      if (!hitTest(data.x as number, data.y as number)) {
        isDragging = true;
        lastPointer = { x: data.x, y: data.y };
      }
      pointer = { x: data.x, y: data.y };
      break;
    }
    case "pointerUp": {
      isDragging = false;
      break;
    }
  }
};
