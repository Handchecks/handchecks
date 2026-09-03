import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";
import moroccanBrothers from "@/assets/client-moroccan-brothers.jpg.asset.json";
import sofian from "@/assets/client-sofian.jpg.asset.json";

const CLIENTS = [
  { handle: "@moroccan_brothers", followers: "+15k", image: moroccanBrothers.url },
  { handle: "@sofian.immobilier", followers: "+5k", image: sofian.url },
];

export function Clients() {
  const { t, lang } = useLang();
  const followersLabel = lang === "fr" ? "abonnés" : "followers";

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

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {CLIENTS.map((c, i) => (
            <Reveal key={c.handle} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-card px-8 py-12 text-center transition-colors duration-500 hover:border-foreground/25">
                <img
                  src={c.image}
                  alt={`${c.handle} profile`}
                  loading="lazy"
                  className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
                />
                <div>
                  <p className="text-lg font-semibold sm:text-xl">{c.handle}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {c.followers} {followersLabel}
                  </p>
                </div>
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
