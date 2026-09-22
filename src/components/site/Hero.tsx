import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import logoHand from "@/assets/opt/logo-hand-white.webp";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const glow = useTransform(scrollYProgress, [0, 1], [1, 1.6]);

  return (
    <section
      id="top"
      ref={ref}
      className="dark relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background text-foreground"
    >
      <motion.div
        style={{ scale: glow }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.07] blur-[120px]"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-4xl px-6 pb-20 pt-28 text-center"
      >
        <motion.img
          src={logoHand}
          alt="Handchecks"
          width={600}
          height={155}
          fetchPriority="high"
          decoding="async"
          className="mx-auto h-12 w-auto sm:h-16"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.p
          className="mt-10 text-xs uppercase tracking-[0.28em] text-white/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          className="mt-6 text-4xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.hero.title}
          <span className="block text-white/45">{t.hero.titleAccent}</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <a
            href="#booking"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.04]"
          >
            {t.hero.cta}
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/35"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {t.hero.scroll}
      </motion.div>
    </section>
  );
}
