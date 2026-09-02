import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

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

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {t.services.items.map((item, i) => (
            <Reveal key={item.tag} delay={0.1 + i * 0.1}>
              <article className="group h-full rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] sm:p-10">
                <span className="text-xs tracking-[0.2em] text-muted-foreground">{item.tag}</span>
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
          ))}
        </div>
      </div>
    </section>
  );
}
