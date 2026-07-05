import { useEffect, useRef, useState } from 'react';
import styles from './CircuitBackground.module.css';

/**
 * Scroll-reactive circuit board that etches itself behind the page, styled
 * after a real PCB: long straight runs on a 16px grid, brief 45° jogs, and
 * hollow ring pads at trace ends. New traces branch off the existing net at
 * junction dots, so the whole board grows as one connected circuit instead
 * of scattered squiggles. An occupancy grid keeps traces from crossing.
 *
 * The drawing budget each frame scales with scroll velocity: fast scrolling
 * routes traces quickly, idling lets the board build almost imperceptibly.
 * Drawing is incremental onto a persistent canvas — each frame strokes only
 * the new pixels, so per-frame cost stays tiny.
 */

const GRID = 16;
const MAX_WALKERS = 6;
const IDLE_BUDGET = 0.4; // px per frame when the page is still
const SCROLL_GAIN = 1.1; // extra px per frame per px/frame of scroll speed
const MAX_BUDGET = 170;
const FILL_RATIO = 0.3; // fraction of grid cells that ends up traced
const MIN_RUN = 3; // cells to travel straight before another bend is allowed

// 8 compass directions; even indices are orthogonal, odd are diagonal.
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
  /** Target cell of the move in progress. */
  tx: number;
  ty: number;
  /** 0..1 progress along the current move. */
  t: number;
  moving: boolean;
  /** Cells travelled since the last bend. */
  run: number;
  /** Cells left before this trace ends in a pad. */
  remaining: number;
}

function createRenderer(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  let cols = 0;
  let rows = 0;
  let drawn = 0;
  let cap = 0;
  let occupied = new Set<number>();
  let net: number[] = []; // cells already traced, sampled for branching
  let walkers: Walker[] = [];

  const key = (cx: number, cy: number) => cy * 4096 + cx;
  const px = (c: number) => c * GRID + GRID / 2;
  const free = (cx: number, cy: number) =>
    cx >= 1 && cy >= 1 && cx < cols - 1 && cy < rows - 1 && !occupied.has(key(cx, cy));

  function claim(cx: number, cy: number) {
    occupied.add(key(cx, cy));
    net.push(key(cx, cy));
  }

  function ringPad(cx: number, cy: number) {
    ctx!.beginPath();
    ctx!.arc(px(cx), px(cy), 3.2, 0, Math.PI * 2);
    ctx!.stroke();
  }

  function junctionDot(cx: number, cy: number) {
    ctx!.beginPath();
    ctx!.arc(px(cx), px(cy), 1.8, 0, Math.PI * 2);
    ctx!.fill();
  }

  function initWalker(w: Walker, cx: number, cy: number, dir: number) {
    Object.assign(w, {
      cx,
      cy,
      dir,
      t: 0,
      moving: false,
      run: MIN_RUN, // free to bend right away
      remaining: 10 + Math.floor(Math.random() * 26),
    });
  }

  /** Start a new trace: usually branching off the net, sometimes an island. */
  function spawn(w: Walker): boolean {
    if (net.length > 0 && Math.random() < 0.9) {
      for (let tries = 0; tries < 30; tries++) {
        const k = net[Math.floor(Math.random() * net.length)];
        const cx = k % 4096;
        const cy = Math.floor(k / 4096);
        const dirs = [0, 2, 4, 6].sort(() => Math.random() - 0.5);
        for (const dir of dirs) {
          const [dx, dy] = DIRS[dir];
          if (free(cx + dx, cy + dy)) {
            junctionDot(cx, cy);
            initWalker(w, cx, cy, dir);
            return true;
          }
        }
      }
    }
    for (let tries = 0; tries < 24; tries++) {
      const cx = 1 + Math.floor(Math.random() * (cols - 2));
      const cy = 1 + Math.floor(Math.random() * (rows - 2));
      if (!free(cx, cy)) continue;
      claim(cx, cy);
      ringPad(cx, cy);
      initWalker(w, cx, cy, [0, 2, 4, 6][Math.floor(Math.random() * 4)]);
      return true;
    }
    return false;
  }

  /**
   * Pick the next cell, PCB-style: hold a straight line, occasionally take a
   * 45° bend; a diagonal leg snaps back to orthogonal at the first chance so
   * diagonals read as short jogs and lane changes, not wandering.
   */
  function route(w: Walker): boolean {
    if (w.remaining <= 0) return false;

    const onDiagonal = w.dir % 2 === 1;
    let order: number[];
    if (onDiagonal) {
      const snap = Math.random() < 0.5 ? [w.dir + 1, w.dir - 1] : [w.dir - 1, w.dir + 1];
      order = w.run >= 1 ? [...snap, w.dir] : [w.dir, ...snap];
    } else if (w.run < MIN_RUN) {
      order = [w.dir];
    } else {
      const roll = Math.random();
      if (roll < 0.78) order = [w.dir, w.dir + 1, w.dir - 1];
      else if (roll < 0.89) order = [w.dir + 1, w.dir, w.dir - 1];
      else order = [w.dir - 1, w.dir, w.dir + 1];
    }

    for (const raw of order) {
      const dir = (raw + 8) % 8;
      const [dx, dy] = DIRS[dir];
      if (!free(w.cx + dx, w.cy + dy)) continue;
      w.run = dir === w.dir ? w.run + 1 : 0;
      w.dir = dir;
      w.tx = w.cx + dx;
      w.ty = w.cy + dy;
      w.t = 0;
      w.moving = true;
      claim(w.tx, w.ty);
      return true;
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
    ctx!.lineWidth = 1;
    ctx!.lineCap = 'round';
    ctx!.globalAlpha = 0.15;

    cols = Math.ceil(width / GRID);
    rows = Math.ceil(height / GRID);
    occupied = new Set();
    net = [];
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
            // Trace complete (or boxed in): cap it with a pad, branch anew.
            ringPad(w.cx, w.cy);
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
          w.remaining--;
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
