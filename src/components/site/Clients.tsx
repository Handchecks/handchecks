import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

const CLIENTS = [
  "Moroccan Brothers",
  "Mr Humble",
  "Sofian Immobilier",
  "Society Club — Monaco",
  "Hillal Bnb",
  "Padel Plaza",
];

export function Clients() {
  const { t } = useLang();

  return (
    <section id="clients" className="bg-background py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
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

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {CLIENTS.map((name, i) => (
            <Reveal key={name} delay={i * 0.06}>
              <div className="flex h-32 items-center justify-center bg-background px-6 text-center text-sm font-medium text-muted-foreground transition-colors duration-500 hover:text-foreground sm:h-40 sm:text-base">
                {name}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-8 text-sm text-muted-foreground">{t.clients.more}</p>
        </Reveal>
      </div>
    </section>
  );
}
