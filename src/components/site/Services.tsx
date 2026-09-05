import { motion } from "motion/react";
import { Video, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

function CameraIcon() {
  return <Video className="h-8 w-8" strokeWidth={1.5} aria-hidden />;
}

function MetaIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-8 w-8" fill="none" aria-hidden>
      <path
        d="M6 22c0-8 4-14 8.5-14 3.5 0 5.7 2.7 8.6 7.5 1.2 2 2.6 4.6 4.3 7.2 2.4 3.7 4.1 5.3 6.4 5.3 2.9 0 4.6-2.5 4.6-6.7 0-4.7-2.2-9.8-5.2-9.8-2 0-3.9 1.7-5.8 4.8m-8.6-2.3C16.9 10.7 14.6 8 11.6 8 7.7 8 4 13 4 20.3 4 25 6.3 28 9.9 28c2.6 0 4.5-1.5 7.1-5.6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChatIcon() {
  return <MessageCircle className="h-8 w-8" strokeWidth={1.5} aria-hidden />;
}

const icons = [CameraIcon, MetaIcon, ChatIcon];


export function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="relative bg-background py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            {t.services.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.08] sm:text-6xl">
            {t.services.title}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t.services.sub}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = icons[i] ?? icons[0]!;
            return (
            <Reveal key={item.tag} delay={0.1 + i * 0.1}>
              <article className="group h-full rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="text-xs tracking-[0.2em] text-muted-foreground">{item.tag}</span>
                  <motion.span
                    className="text-foreground"
                    initial={{ opacity: 0, y: -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Icon />
                  </motion.span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold sm:text-3xl">{item.name}</h3>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.desc}
                </p>
                <ul className="mt-8 space-y-3 border-t border-border pt-6">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] text-background">
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
            );
          })}

        </div>
      </div>
    </section>
  );
}
