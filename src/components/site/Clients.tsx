import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import moroccanBrothers from "@/assets/client-moroccan-brothers.jpg.asset.json";
import sofian from "@/assets/client-sofian.jpg.asset.json";
import logo8 from "@/assets/logo-8-2-v2.png.asset.json";
import logo9 from "@/assets/logo-9-2-v2.png.asset.json";
import logo10 from "@/assets/logo-10-2-v2.png.asset.json";
import logo11 from "@/assets/logo-11-2-v2.png.asset.json";
import logo7 from "@/assets/logo-7-2-v2.png.asset.json";
import logo42 from "@/assets/logo-4-3-v2.png.asset.json";
import logo52 from "@/assets/logo-5-3-v2.png.asset.json";
import logo62 from "@/assets/logo-6-3-v2.png.asset.json";
import logo32 from "@/assets/logo-3-3-v2.png.asset.json";

const CLIENTS = [
  { handle: "@moroccan_brothers", followers: 15, views: 3, image: moroccanBrothers.url },
  { handle: "@sofian.immobilier", followers: 5, views: 1, image: sofian.url },
];

// Scattered "cloud" placement: x/y in % of the cloud box, size in % of its width.
const LOGOS = [
  { src: logo8.url, name: "Jet 7 Auto", x: 8, y: 22, size: 15, order: 0 },
  { src: logo9.url, name: "Hello Pilates", x: 26, y: 4, size: 12, order: 4 },
  { src: logo11.url, name: "Casanova", x: 42, y: 26, size: 17, order: 1 },
  { src: logo10.url, name: "AFM", x: 65, y: 6, size: 13, order: 6 },
  { src: logo7.url, name: "Jumeirah Premium Auto", x: 80, y: 28, size: 16, order: 2 },
  { src: logo42.url, name: "Padel Plaza", x: 16, y: 62, size: 14, order: 5 },
  { src: logo52.url, name: "Hillal Bnb", x: 38, y: 72, size: 13, order: 8 },
  { src: logo62.url, name: "Kleaning", x: 58, y: 60, size: 15, order: 3 },
  { src: logo32.url, name: "Society Club Monte-Carlo", x: 82, y: 74, size: 14, order: 7 },
];

function Counter({ value, prefix = "+", suffix }: { value: number; prefix?: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

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
  return <img src={l.src} alt={l.name} loading="lazy" className="h-full w-full object-contain" />;
}

function boxStyle(l: Logo) {
  return {
    left: `${l.x}%`,
    top: `${l.y}%`,
    width: `${l.size}%`,
  } as const;
}

function ScrollLogo({ l, progress }: { l: Logo; progress: MotionValue<number> }) {
  const start = 0.6 + l.order * 0.038;
  const opacity = useTransform(progress, [start, start + 0.05], [0, 1]);
  const scale = useTransform(progress, [start, start + 0.035, start + 0.06], [0.4, 1.12, 1]);
  return (
    <motion.div
      style={{ ...boxStyle(l), opacity, scale }}
      className="absolute aspect-square -translate-x-1/2 -translate-y-1/2"
    >
      <LogoImg l={l} />
    </motion.div>
  );
}

function ViewLogo({ l }: { l: Logo }) {
  return (
    <motion.div
      style={boxStyle(l)}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: l.order * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
      className="absolute aspect-square -translate-x-1/2 -translate-y-1/2"
    >
      <LogoImg l={l} />
    </motion.div>
  );
}

function LogoCloud({ progress }: { progress?: MotionValue<number> }) {
  return (
    <div className="relative mx-auto aspect-[16/9] w-full max-w-3xl">
      {LOGOS.map((l) =>
        progress ? (
          <ScrollLogo key={l.name} l={l} progress={progress} />
        ) : (
          <ViewLogo key={l.name} l={l} />
        ),
      )}
    </div>
  );
}

export function Clients() {
  const { t, lang } = useLang();
  const followersLabel = lang === "fr" ? "abonnés" : "followers";
  const viewsLabel = lang === "fr" ? "vues" : "views";
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const panels = CLIENTS.length + 1;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(100 * (panels - 1)) / panels}%`]);

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
            <motion.div style={{ x }} className="flex">
              {CLIENTS.map((c) => (
                <ClientPanel
                  key={c.handle}
                  c={c}
                  followersLabel={followersLabel}
                  viewsLabel={viewsLabel}
                />
              ))}
              <div className="flex w-screen shrink-0 flex-col items-center justify-center gap-12 px-6">
                <LogoCloud progress={scrollYProgress} />
                <p className="whitespace-pre-line text-center text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                  {t.clients.more}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
