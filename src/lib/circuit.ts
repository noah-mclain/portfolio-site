/** Shared look for the circuit traces: grid, directions and pad shapes. */

export const GRID = 16;
export const MIN_RUN = 3; // cells to travel straight before another bend is allowed

// 8 compass directions; even indices are orthogonal, odd are diagonal.
export const DIRS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

/** Pixel center of a grid cell. */
export const px = (c: number) => c * GRID + GRID / 2;

/** Stroke and fill in the theme accent, as thin rounded lines. */
export function applyTraceStyle(ctx: CanvasRenderingContext2D, alpha: number) {
  const accent =
    getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#a78bfa';
  ctx.strokeStyle = accent;
  ctx.fillStyle = accent;
  ctx.lineWidth = 1;
  ctx.lineCap = 'round';
  ctx.globalAlpha = alpha;
}

/** Hollow pad where a trace ends. */
export function ringPad(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.beginPath();
  ctx.arc(x, y, 3.2, 0, Math.PI * 2);
  ctx.stroke();
}

/** Solid dot where a trace branches. */
export function junctionDot(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.beginPath();
  ctx.arc(x, y, 1.8, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Repaint everything already drawn in the current accent, keeping each pixel's
 * transparency. Used on theme flips so the board changes color without restarting.
 */
export function recolor(ctx: CanvasRenderingContext2D) {
  const accent =
    getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#a78bfa';
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'source-in';
  ctx.globalAlpha = 1;
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.restore();
  ctx.strokeStyle = accent;
  ctx.fillStyle = accent;
}
