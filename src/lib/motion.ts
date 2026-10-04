import { useEffect, useRef, useState } from "react";

/** Same easing curve the site has always used for its animations. */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const slopeX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    let t = x;
    for (let i = 0; i < 8; i++) {
      const err = sampleX(t) - x;
      if (Math.abs(err) < 1e-5) break;
      const d = slopeX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= err / d;
    }
    return sampleY(t);
  };
}

const easeOutExpo = cubicBezier(0.16, 1, 0.3, 1);

/** True once the element has scrolled into view (and stays true). */
export function useInViewOnce<T extends Element>(margin = "-80px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, inView]);

  return { ref, inView };
}

/** Counts from 0 up to `value` once `start` becomes true. */
export function useCountUp(value: number, start: boolean, duration = 1.6) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / (duration * 1000), 1);
      setDisplay(Math.round(value * easeOutExpo(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, value, duration]);

  return display;
}

/**
 * Reports how far the element has been scrolled through (0 to 1).
 * "hero":  0 when its top hits the top of the screen, 1 when its bottom does.
 * "track": 0 when its top hits the top of the screen, 1 when its bottom hits the screen bottom.
 */
export function onScrollProgress(
  el: HTMLElement,
  mode: "hero" | "track",
  cb: (progress: number) => void,
) {
  let queued = false;

  const update = () => {
    queued = false;
    const r = el.getBoundingClientRect();
    const span = mode === "hero" ? r.height : r.height - window.innerHeight;
    const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    cb(p);
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();

  return () => {
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}
