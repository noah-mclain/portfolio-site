import { useEffect, useRef, type RefObject } from 'react';
import { applyTraceStyle, junctionDot, recolor, ringPad } from '@/lib/circuit';
import styles from './Experience.module.css';

/**
 * The background circuit's guided cousin. While the Experience list is on
 * screen, a trace leaves from under the last letter of the section title,
 * steps across to the center line at 45° and runs down into each role's node,
 * lighting it as it lands. Each takeaway gets a short branch ending in a pad.
 *
 * Routes come straight from the layout, so they are the same on every visit.
 * Drawing follows scroll position and never un-draws.
 */

type Pt = [number, number];

interface Trace {
  pts: Pt[];
  branch?: boolean;
  /** A ring pad (the lead-in) or a junction dot (a branch) where the trace starts. */
  start?: 'pad' | 'dot';
  padEnd?: boolean;
  /** Index of the node this trace lands on. */
  node?: number;
  /** Drawn length at which this trace begins, and its own length. */
  from: number;
  len: number;
}

const AXON_ALPHA = 0.65;
const BRANCH_ALPHA = 0.4;
const PAD = 120; // canvas overhang above the list, so the title's lead-in has room
const J = 16; // size of every 45° jog

/** Lay the traces out over the current layout, in canvas coordinates. */
function route(list: HTMLElement): Trace[] {
  const box = list.getBoundingClientRect();
  const rel = (r: DOMRect) => ({
    l: r.left - box.left,
    r: r.right - box.left,
    t: r.top - box.top + PAD,
    b: r.bottom - box.top + PAD,
  });
  const entries = [...list.querySelectorAll<HTMLElement>(':scope > li')];
  if (!entries.length) return [];
  const nodes = entries.map((li) => rel(li.querySelector('[data-node]')!.getBoundingClientRect()));
  const cx = (nodes[0].l + nodes[0].r) / 2;
  const narrow = cx < list.offsetWidth / 3; // one-column layout, line on the left
  const traces: Omit<Trace, 'from' | 'len'>[] = [];
  const range = document.createRange();

  // Lead-in: a pad under the title's last "e", an underline to the right, a jog, then one long diagonal.
  const h2 = list.closest('section')?.querySelector('h2');
  if (h2) {
    range.selectNodeContents(h2);
    const rects = range.getClientRects();
    const tr = rel(rects[rects.length - 1]);
    const fs = parseFloat(getComputedStyle(h2).fontSize);
    const sy = tr.b - fs * 0.1;
    const s = 10;
    const dir = Math.sign(cx - tr.r) || 1;
    let x = tr.r + 6 + s;
    let y = sy + s;
    const pts: Pt[] = [[tr.r - fs * 0.32, sy], [tr.r + 6, sy], [x, y]];
    if (dir > 0) {
      const xa = x + (cx - x) * 0.35;
      pts.push([xa, y], [xa + s, y + s]);
      x = xa + s;
      y += s;
    } else {
      pts.push([x, y + s], [x - s, y + 2 * s]);
      x -= s;
      y += 2 * s;
    }
    const D = Math.max(s, Math.min(nodes[0].t - y - 24, Math.abs(cx - x) - s));
    pts.push([cx - dir * D, y], [cx, y + D], [cx, nodes[0].t]);
    traces.push({ pts, start: 'pad', node: 0 });
  } else {
    traces.push({ pts: [[cx, nodes[0].t - 40], [cx, nodes[0].t]], start: 'pad', node: 0 });
  }

  entries.forEach((li, i) => {
    const body = rel(li.querySelector('[data-body]')!.getBoundingClientRect());
    const side = narrow || (body.l + body.r) / 2 > cx ? 1 : -1;
    const edge = side < 0 ? body.r + 10 : body.l - 10;
    const year = li.querySelector('[data-year]');
    let y = year ? rel(year.getBoundingClientRect()).b : nodes[i].b;

    for (const el of li.querySelectorAll<HTMLElement>('[data-takeaway]')) {
      range.selectNodeContents(el);
      const r = rel(range.getClientRects()[0] ?? el.getBoundingClientRect());
      const yj = Math.max(y, Math.round((r.t + r.b) / 2) - J);
      traces.push({ pts: [[cx, y], [cx, yj]] });
      traces.push({
        pts: [[cx, yj], [cx + side * J, yj + J], [edge, yj + J]],
        branch: true,
        start: 'dot',
        padEnd: true,
      });
      y = yj;
    }

    if (i === entries.length - 1) {
      traces.push({ pts: [[cx, y], [cx, y + 48]], padEnd: true });
      return;
    }
    const next = nodes[i + 1].t;
    const room = next - y;
    if (room > 6 * J) {
      const lean = narrow ? 1 : -side; // lean toward the next role's side
      const a = y + (room - 2 * J) / 2 - J;
      traces.push({
        pts: [[cx, y], [cx, a], [cx + lean * J, a + J], [cx + lean * J, a + 2 * J], [cx, a + 3 * J], [cx, next]],
        node: i + 1,
      });
    } else {
      traces.push({ pts: [[cx, y], [cx, next]], node: i + 1 });
    }
  });

  let total = 0;
  return traces.map((t) => {
    let len = 0;
    for (let k = 1; k < t.pts.length; k++) {
      len += Math.hypot(t.pts[k][0] - t.pts[k - 1][0], t.pts[k][1] - t.pts[k - 1][1]);
    }
    const out = { ...t, from: total, len };
    total += len;
    return out;
  });
}

/** Paint the part of every trace that lies between drawn lengths a and b. */
function paint(ctx: CanvasRenderingContext2D, traces: Trace[], a: number, b: number) {
  for (const t of traces) {
    const end = t.from + t.len;
    if (end < a || t.from > b) continue;
    applyTraceStyle(ctx, t.branch ? BRANCH_ALPHA : AXON_ALPHA);
    ctx.lineWidth = t.branch ? 1.25 : 1.5;
    if (t.start && a <= t.from && b > t.from) {
      (t.start === 'pad' ? ringPad : junctionDot)(ctx, t.pts[0][0], t.pts[0][1]);
    }
    let walked = t.from;
    for (let k = 1; k < t.pts.length; k++) {
      const [x0, y0] = t.pts[k - 1];
      const [x1, y1] = t.pts[k];
      const seg = Math.hypot(x1 - x0, y1 - y0);
      const f0 = Math.max(0, (a - walked) / seg);
      const f1 = Math.min(1, (b - walked) / seg);
      walked += seg;
      if (!seg || f1 <= f0) continue;
      ctx.beginPath();
      ctx.moveTo(x0 + (x1 - x0) * f0, y0 + (y1 - y0) * f0);
      ctx.lineTo(x0 + (x1 - x0) * f1, y0 + (y1 - y0) * f1);
      ctx.stroke();
    }
    const [ex, ey] = t.pts[t.pts.length - 1];
    if (t.padEnd && a < end && b >= end) ringPad(ctx, ex, ey);
  }
}

/** Drawn length at which the trace tip reaches canvas y `line`. */
function reach(traces: Trace[], line: number) {
  let len = 0;
  for (const t of traces) {
    for (let k = 1; k < t.pts.length; k++) {
      const [x0, y0] = t.pts[k - 1];
      const [x1, y1] = t.pts[k];
      const seg = Math.hypot(x1 - x0, y1 - y0);
      if (y0 > line) return len;
      if (y1 > line) return len + (seg * (line - y0)) / (y1 - y0);
      len += seg;
    }
  }
  return len;
}

export function ExperienceCircuit({ listRef }: { listRef: RefObject<HTMLOListElement> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!list || !canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const entries = [...list.querySelectorAll<HTMLElement>(':scope > li')];
    let traces = route(list);
    let drawn = 0; // drawn length; only ever grows
    let raf = 0;

    list.dataset.circuit = 'on';

    function light() {
      for (const t of traces) {
        if (t.node !== undefined && drawn >= t.from + t.len - 0.5) entries[t.node].dataset.reached = '';
      }
    }

    function redraw() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = list!.offsetWidth * dpr;
      canvas!.height = (list!.offsetHeight + PAD + 64) * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      paint(ctx!, traces, 0, drawn);
    }

    function frame() {
      raf = 0;
      const r = list!.getBoundingClientRect();
      const last = traces[traces.length - 1];
      const total = last ? last.from + last.len : 0;
      // The tip follows a line 70% down the viewport, easing toward it so branches visibly draw.
      const target = reduced ? total : reach(traces, window.innerHeight * 0.7 - r.top + PAD);
      if (target > drawn) {
        const next = reduced ? target : Math.min(target, drawn + 3 + (target - drawn) * 0.08);
        paint(ctx!, traces, drawn, next);
        drawn = next;
        light();
        raf = requestAnimationFrame(frame);
      }
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    // Resizes and font loads re-route from the same layout rules, then repaint what was drawn.
    const relayout = () => {
      traces = route(list);
      redraw();
      schedule();
    };
    const resize = new ResizeObserver(relayout);
    resize.observe(list);
    const theme = new MutationObserver(() => recolor(ctx));
    theme.observe(document.documentElement, { attributeFilter: ['data-theme'] });
    window.addEventListener('scroll', schedule, { passive: true });

    let alive = true;
    document.fonts.ready.then(() => alive && relayout());
    redraw();
    schedule();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      resize.disconnect();
      theme.disconnect();
      delete list.dataset.circuit;
    };
  }, [listRef]);

  return <canvas ref={canvasRef} className={styles.circuit} aria-hidden />;
}
