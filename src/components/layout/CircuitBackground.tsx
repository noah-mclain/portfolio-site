import { useEffect, useRef, useState } from 'react';
import styles from './CircuitBackground.module.css';

/**
 * Scroll-reactive circuit board that etches itself behind the page,
 * styled after a real PCB: traces run on a fixed grid, mostly straight
 * with 45°/90° bends, never cross (an occupancy grid reserves cells),
 * and terminate in hollow ring pads with the occasional solder dot.
 *
 * The drawing budget each frame scales with scroll velocity: fast
 * scrolling routes traces quickly, idling lets the board build almost
 * imperceptibly. Drawing is incremental onto a persistent canvas — each
 * frame strokes only the new pixels, so per-frame cost stays tiny.
 */

const GRID = 20;
const MAX_WALKERS = 5;
const IDLE_BUDGET = 0.4; // px per frame when the page is still
const SCROLL_GAIN = 1.1; // extra px per frame per px/frame of scroll speed
const MAX_BUDGET = 160;
const FILL_RATIO = 0.22; // fraction of grid cells that ends up traced

// 8 compass directions. Preference order keeps runs straight with
// occasional 45° bends, like PCB routing.
const DIRS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

interface Walker {
  /** Current position in grid cells. */
  cx: number;
  cy: number;
  dir: number;
  /** Target cell of the move in progress, or null while idle. */
  tx: number;
  ty: number;
  /** 0..1 progress along the current move. */
  t: number;
  moving: boolean;
}

function createRenderer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  let cols = 0;
  let rows = 0;
  let drawn = 0;
  let cap = 0;
  let occupied = new Set<number>();
  let walkers: Walker[] = [];

  const key = (cx: number, cy: number) => cy * 4096 + cx;
  const px = (c: number) => c * GRID + GRID / 2;
  const free = (cx: number, cy: number) =>
    cx >= 0 && cy >= 0 && cx < cols && cy < rows && !occupied.has(key(cx, cy));

  function ringPad(cx: number, cy: number) {
    ctx!.beginPath();
    ctx!.arc(px(cx), px(cy), 3.4, 0, Math.PI * 2);
    ctx!.stroke();
  }

  function dotPad(cx: number, cy: number) {
    ctx!.beginPath();
    ctx!.arc(px(cx), px(cy), 2, 0, Math.PI * 2);
    ctx!.fill();
  }

  function spawn(w: Walker): boolean {
    for (let tries = 0; tries < 24; tries++) {
      const cx = 1 + Math.floor(Math.random() * (cols - 2));
      const cy = 1 + Math.floor(Math.random() * (rows - 2));
      if (!free(cx, cy)) continue;
      occupied.add(key(cx, cy));
      Object.assign(w, { cx, cy, dir: Math.floor(Math.random() * 8), t: 0, moving: false });
      ringPad(cx, cy);
      return true;
    }
    return false;
  }

  /** Pick the next cell: prefer straight, then 45° bends, then 90°. */
  function route(w: Walker): boolean {
    const turns = Math.random() < 0.72 ? [0, 1, -1, 2, -2] : [1, -1, 0, 2, -2];
    for (const turn of turns) {
      const dir = (w.dir + turn + 8) % 8;
      const [dx, dy] = DIRS[dir];
      if (free(w.cx + dx, w.cy + dy)) {
        w.dir = dir;
        w.tx = w.cx + dx;
        w.ty = w.cy + dy;
        w.t = 0;
        w.moving = true;
        occupied.add(key(w.tx, w.ty));
        return true;
      }
    }
    return false;
  }

  function reset() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx!.clearRect(0, 0, width, height);

    const style = getComputedStyle(document.documentElement);
    const accent = style.getPropertyValue('--color-accent').trim() || '#a78bfa';
    ctx!.strokeStyle = accent;
    ctx!.fillStyle = accent;
    ctx!.lineWidth = 1.1;
    ctx!.lineCap = 'round';
    ctx!.globalAlpha = 0.15;

    cols = Math.ceil(width / GRID);
    rows = Math.ceil(height / GRID);
    occupied = new Set();
    drawn = 0;
    cap = cols * rows * FILL_RATIO * GRID;
    walkers = [];
    for (let i = 0; i < MAX_WALKERS; i++) {
      const w = {} as Walker;
      if (spawn(w)) walkers.push(w);
    }
  }

  /** Advance the board by `budget` pixels of freshly-drawn trace. */
  function step(budget: number): boolean {
    if (drawn >= cap) return false;
    let remaining = Math.min(budget, cap - drawn);

    let guard = 400;
    while (remaining > 0.5 && guard-- > 0) {
      for (const w of walkers) {
        if (remaining <= 0.5) break;

        if (!w.moving) {
          if (!route(w)) {
            // Dead end: cap the trace with a pad and restart elsewhere.
            if (Math.random() < 0.3) dotPad(w.cx, w.cy);
            else ringPad(w.cx, w.cy);
            if (!spawn(w)) remaining = 0; // board is saturated
            continue;
          }
        }

        const [dx, dy] = DIRS[w.dir];
        const moveLen = GRID * Math.hypot(dx, dy);
        const dt = Math.min(remaining / moveLen, 1 - w.t, 1);

        ctx!.beginPath();
        ctx!.moveTo(px(w.cx) + dx * GRID * w.t, px(w.cy) + dy * GRID * w.t);
        w.t += dt;
        ctx!.lineTo(px(w.cx) + dx * GRID * w.t, px(w.cy) + dy * GRID * w.t);
        ctx!.stroke();

        drawn += dt * moveLen;
        remaining -= dt * moveLen;

        if (w.t >= 1) {
          w.cx = w.tx;
          w.cy = w.ty;
          w.moving = false;
          // Occasionally end the trace on purpose so pads pepper the board.
          if (Math.random() < 0.045) {
            ringPad(w.cx, w.cy);
            if (!spawn(w)) remaining = 0;
          }
        }
      }
    }
    return drawn < cap;
  }

  return { reset, step, drawInstant: () => step(cap * 0.5) };
}

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = createRenderer(canvas);
    if (!renderer) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    renderer.reset();
    setVisible(true);

    if (reduced) {
      // No animation: etch a partial board once and leave it static.
      renderer.drawInstant();
      return;
    }

    let raf = 0;
    let lastY = window.scrollY;
    let velocity = 0;

    const frame = () => {
      const y = window.scrollY;
      // Exponentially smoothed scroll speed in px/frame.
      velocity = velocity * 0.88 + Math.abs(y - lastY) * 0.12;
      lastY = y;

      const budget = Math.min(IDLE_BUDGET + velocity * SCROLL_GAIN, MAX_BUDGET);
      if (renderer.step(budget)) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const restart = () => {
      cancelAnimationFrame(raf);
      renderer.reset();
      lastY = window.scrollY;
      velocity = 0;
      raf = requestAnimationFrame(frame);
    };

    // Rebuild on theme flips (trace color changes) and real size changes.
    const observer = new MutationObserver(restart);
    observer.observe(document.documentElement, { attributeFilter: ['data-theme'] });

    let lastW = window.innerWidth;
    let lastH = window.innerHeight;
    const onResize = () => {
      // Ignore mobile URL-bar jitter; only rebuild on meaningful changes.
      if (Math.abs(window.innerWidth - lastW) > 64 || Math.abs(window.innerHeight - lastH) > 160) {
        lastW = window.innerWidth;
        lastH = window.innerHeight;
        restart();
      }
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.canvas} ${visible ? styles.visible : ''}`}
      aria-hidden
    />
  );
}
