import { useEffect, useRef, type CSSProperties } from "react";
import logoHand from "@/assets/opt/logo-hand-white.webp";
import { useLang } from "@/lib/i18n";
import { onScrollProgress } from "@/lib/motion";

const rise = (y: number, delay: number): CSSProperties =>
  ({ "--y": `${y}px`, "--delay": `${delay}s` }) as CSSProperties;

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll effect: content drifts down and fades, glow grows. Only moves/fades a layer.
  useEffect(() => {
    const section = ref.current;
    const glow = glowRef.current;
    const content = contentRef.current;
    if (!section || !glow || !content) return;
    return onScrollProgress(section, "hero", (p) => {
      content.style.transform = `translate3d(0, ${p * 140}px, 0)`;
      content.style.opacity = String(Math.max(0, 1 - p / 0.8));
      glow.style.transform = `scale(${1 + p * 0.6})`;
    });
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="dark relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background text-foreground"
    >
      <div
        ref={glowRef}
        className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      <div ref={contentRef} className="relative mx-auto max-w-4xl px-6 pb-20 pt-28 text-center">
        <img
          src={logoHand}
          alt="Handchecks"
          width={600}
          height={155}
          fetchPriority="high"
          decoding="async"
          className="hero-logo mx-auto h-12 w-auto sm:h-16"
        />

        <p
          className="hero-fade mt-10 text-xs uppercase tracking-[0.28em] text-white/45"
          style={rise(0, 0.25)}
        >
          {t.hero.eyebrow}
        </p>

        <h1
          className="hero-in mt-6 text-4xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl"
          style={rise(24, 0.35)}
        >
          {t.hero.title}
          <span className="block text-white/45">{t.hero.titleAccent}</span>
        </h1>

        <p
          className="hero-in mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          style={rise(20, 0.5)}
        >
          {t.hero.sub}
        </p>

        <div className="hero-in mt-12" style={rise(20, 0.65)}>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.04]"
          >
            {t.hero.cta}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <div className="hero-bob absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/35">
        {t.hero.scroll}
      </div>
    </section>
  );
}
