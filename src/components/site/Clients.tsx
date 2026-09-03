import { useEffect, useRef, useState } from "react";
import { animate, useInView, useScroll, useTransform, motion, useReducedMotion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import moroccanBrothers from "@/assets/client-moroccan-brothers.jpg.asset.json";
import sofian from "@/assets/client-sofian.jpg.asset.json";

const CLIENTS = [
  { handle: "@moroccan_brothers", followers: 15, image: moroccanBrothers.url },
  { handle: "@sofian.immobilier", followers: 5, image: sofian.url },
];

function FollowerCount({ value }: { value: number }) {
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
      +{display}k
    </span>
  );
}

function ClientPanel({ c, followersLabel }: { c: (typeof CLIENTS)[number]; followersLabel: string }) {
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
          <div className="text-7xl font-bold leading-none tracking-tight sm:text-8xl lg:text-9xl">
            <FollowerCount value={c.followers} />
          </div>
          <p className="mt-4 text-sm uppercase tracking-[0.24em] text-muted-foreground">
            {followersLabel}
          </p>
          <p className="mt-6 text-xl font-medium sm:text-2xl">{c.handle}</p>
        </div>
      </div>
    </div>
  );
}

export function Clients() {
  const { t, lang } = useLang();
  const followersLabel = lang === "fr" ? "abonnés" : "followers";
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
            <ClientPanel key={c.handle} c={c} followersLabel={followersLabel} />
          ))}
          <p className="text-center text-5xl font-bold">{t.clients.more}</p>
        </div>
      ) : (
        <div ref={trackRef} className="relative h-[300vh]">
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div style={{ x }} className="flex" >
              {CLIENTS.map((c) => (
                <ClientPanel key={c.handle} c={c} followersLabel={followersLabel} />
              ))}
              <div className="flex w-screen shrink-0 items-center justify-center px-6">
                <p className="text-center text-6xl font-bold tracking-tight sm:text-8xl">
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
