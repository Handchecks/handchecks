import { useEffect, useRef, useState } from "react";
import { animate, useInView, useScroll, useTransform, motion, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import moroccanBrothers from "@/assets/client-moroccan-brothers.jpg.asset.json";
import sofian from "@/assets/client-sofian.jpg.asset.json";
import logo8 from "@/assets/logo-8.png.asset.json";
import logo9 from "@/assets/logo-9.png.asset.json";
import logo10 from "@/assets/logo-10.png.asset.json";
import logo11 from "@/assets/logo-11.png.asset.json";
import logo7 from "@/assets/logo-7.png.asset.json";
import logo42 from "@/assets/logo-4-2.png.asset.json";
import logo52 from "@/assets/logo-5-2.png.asset.json";
import logo62 from "@/assets/logo-6-2.png.asset.json";
import logo32 from "@/assets/logo-3-2.png.asset.json";

const CLIENTS = [
  { handle: "@moroccan_brothers", followers: 15, views: 3, image: moroccanBrothers.url },
  { handle: "@sofian.immobilier", followers: 5, views: 1, image: sofian.url },
];

const LOGOS = [
  { src: logo8.url, name: "Jet 7 Auto" },
  { src: logo9.url, name: "Hello Pilates" },
  { src: logo11.url, name: "Casanova" },
  { src: logo10.url, name: "AFM" },
  { src: logo7.url, name: "Jumeirah Premium Auto" },
  { src: logo42.url, name: "Padel Plaza" },
  { src: logo52.url, name: "Hillal Bnb" },
  { src: logo62.url, name: "Kleaning" },
  { src: logo32.url, name: "Society Club Monte-Carlo" },
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

function LogoCloud() {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-3 gap-6 sm:grid-cols-5 sm:gap-8">
      {LOGOS.map((l, i) => (
        <motion.div
          key={l.name}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex items-center justify-center"
        >
          <img
            src={l.src}
            alt={l.name}
            loading="lazy"
            className="h-16 w-16 rounded-full object-contain sm:h-20 sm:w-20"
          />
        </motion.div>
      ))}
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
                <LogoCloud />
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
