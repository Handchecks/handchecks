import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { onScrollProgress, useCountUp, useInViewOnce } from "@/lib/motion";
import { Reveal } from "./Reveal";
import moroccanBrothers from "@/assets/opt/client-moroccan-brothers.webp";
import sofian from "@/assets/opt/client-sofian.webp";
import logo8 from "@/assets/opt/logo-8-2-v2.webp";
import logo9 from "@/assets/opt/logo-9-2-v2.webp";
import logo10 from "@/assets/opt/logo-10-2-v2.webp";
import logo11 from "@/assets/opt/logo-11-2-v2.webp";
import logo7 from "@/assets/opt/logo-7-2-v2.webp";
import logo42 from "@/assets/opt/logo-4-3-v2.webp";
import logo52 from "@/assets/opt/logo-5-3-v2.webp";
import logo62 from "@/assets/opt/logo-6-3-v2.webp";
import logo32 from "@/assets/opt/logo-3-3-v2.webp";

const CLIENTS = [
  { handle: "@moroccan_brothers", followers: 15, views: 3, image: moroccanBrothers },
  { handle: "@sofian.immobilier", followers: 5, views: 1, image: sofian },
];

// Scattered "cloud" placement: x/y in % of the cloud box, size in % of its width.
const LOGOS = [
  { src: logo8, name: "Jet 7 Auto", x: 8, y: 22, size: 15, order: 0 },
  { src: logo9, name: "Hello Pilates", x: 26, y: 4, size: 12, order: 4 },
  { src: logo11, name: "Casanova", x: 42, y: 26, size: 17, order: 1 },
  { src: logo10, name: "AFM", x: 65, y: 6, size: 13, order: 6 },
  { src: logo7, name: "Jumeirah Premium Auto", x: 80, y: 28, size: 16, order: 2 },
  { src: logo42, name: "Padel Plaza", x: 16, y: 62, size: 14, order: 5 },
  { src: logo52, name: "Hillal Bnb", x: 38, y: 72, size: 13, order: 8 },
  { src: logo62, name: "Kleaning", x: 58, y: 60, size: 15, order: 3 },
  { src: logo32, name: "Society Club Monte-Carlo", x: 82, y: 74, size: 14, order: 7 },
];

function Counter({ value, prefix = "+", suffix }: { value: number; prefix?: string; suffix: string }) {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>("-80px");
  const display = useCountUp(value, inView);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function ClientPanel({
  c,
  followersLabel,
  viewsLabel,
}: {
  c: (typeof CLIENTS)[number];
  followersLabel: string;
  viewsLabel: string;
}) {
  return (
    <div className="flex w-screen shrink-0 items-center justify-center px-6">
      <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:gap-14 sm:text-left">
        <img
          src={c.image}
          alt={`${c.handle} profile`}
          loading="lazy"
          className="h-40 w-40 rounded-full object-cover sm:h-56 sm:w-56"
        />
        <div>
          <div className="text-6xl font-bold leading-none tracking-tight sm:text-7xl lg:text-8xl">
            <Counter value={c.followers} suffix="k" />
          </div>
          <p className="mt-3 text-sm uppercase tracking-[0.24em] text-muted-foreground">
            {followersLabel}
          </p>
          <div className="mt-8 text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl">
            <Counter value={c.views} suffix="M" />
          </div>
          <p className="mt-3 text-sm uppercase tracking-[0.24em] text-muted-foreground">
            {viewsLabel}
          </p>
          <p className="mt-8 text-xl font-medium sm:text-2xl">{c.handle}</p>
        </div>
      </div>
    </div>
  );
}

type Logo = (typeof LOGOS)[number];

function LogoImg({ l }: { l: Logo }) {
  return (
    <img
      src={l.src}
      alt={l.name}
      loading="eager"
      decoding="async"
      fetchPriority="low"
      width={256}
      height={256}
      className="h-full w-full object-contain"
    />
  );
}

function boxStyle(l: Logo) {
  return {
    left: `${l.x}%`,
    top: `${l.y}%`,
    width: `${l.size}%`,
  } as const;
}

const POP = "0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";

/** Logo that pops in once the sideways scroll has gone far enough. */
function ScrollLogo({ l, shown }: { l: Logo; shown: boolean }) {
  return (
    <div
      style={{
        ...boxStyle(l),
        opacity: shown ? 1 : 0,
        transform: `scale(${shown ? 1 : 0.4})`,
        transition: `opacity ${POP}, transform ${POP}`,
      }}
      className="absolute aspect-square -translate-x-1/2 -translate-y-1/2"
    >
      <LogoImg l={l} />
    </div>
  );
}

/** Logo that pops in when it scrolls into view (used when animations are turned off in settings). */
function ViewLogo({ l }: { l: Logo }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("-40px");
  return (
    <div
      ref={ref}
      style={{
        ...boxStyle(l),
        opacity: inView ? 1 : 0,
        transform: `scale(${inView ? 1 : 0.5})`,
        transition: `opacity ${POP} ${l.order * 0.08}s, transform ${POP} ${l.order * 0.08}s`,
      }}
      className="absolute aspect-square -translate-x-1/2 -translate-y-1/2"
    >
      <LogoImg l={l} />
    </div>
  );
}

function LogoCloud({ shownCount }: { shownCount?: number }) {
  return (
    <div className="relative mx-auto aspect-[16/9] w-full max-w-3xl">
      {LOGOS.map((l) =>
        shownCount !== undefined ? (
          <ScrollLogo key={l.name} l={l} shown={l.order < shownCount} />
        ) : (
          <ViewLogo key={l.name} l={l} />
        ),
      )}
    </div>
  );
}

export function Clients() {
  const { t, lang } = useLang();
  const followersLabel = lang === "fr" ? "FOLLOWERS" : "followers";
  const viewsLabel = lang === "fr" ? "vues" : "views";
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const [shownCount, setShownCount] = useState(0);
  const panels = CLIENTS.length + 1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Sideways scroll: slides the panels left as you scroll down, and pops the logos in.
  useEffect(() => {
    const track = trackRef.current;
    const slide = slideRef.current;
    if (!track || !slide) return;
    return onScrollProgress(track, "track", (p) => {
      slide.style.transform = `translate3d(${-((100 * (panels - 1)) / panels) * p}%, 0, 0)`;
      const count =
        p < 0.5 ? 0 : Math.min(LOGOS.length, Math.floor((p - 0.5) / 0.018) + 1);
      setShownCount((prev) => (count > prev ? count : prev));
    });
  }, [reduced, panels]);

  return (
    <section id="clients" className="bg-background">
      <div className="mx-auto max-w-6xl px-6 pt-28 sm:pt-40">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {t.clients.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.08] sm:text-5xl">
            {t.clients.title}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t.clients.sub}
          </p>
        </Reveal>
      </div>

      {reduced ? (
        <div className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-24">
          {CLIENTS.map((c) => (
            <ClientPanel key={c.handle} c={c} followersLabel={followersLabel} viewsLabel={viewsLabel} />
          ))}
          <LogoCloud />
          <p className="whitespace-pre-line text-center text-4xl font-bold">{t.clients.more}</p>
        </div>
      ) : (
        <div ref={trackRef} className="relative h-[300vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <div ref={slideRef} className="flex will-change-transform">
              {CLIENTS.map((c) => (
                <ClientPanel
                  key={c.handle}
                  c={c}
                  followersLabel={followersLabel}
                  viewsLabel={viewsLabel}
                />
              ))}
              <div className="flex w-screen shrink-0 flex-col items-center justify-center gap-12 px-6">
                <LogoCloud shownCount={shownCount} />
                <p className="whitespace-pre-line text-center text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                  {t.clients.more}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
