import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

/** Paste your Calendly / Cal.com link here to activate the embedded calendar. */
export const BOOKING_URL = "";

function CalendlyEmbed({ url }: { url: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <iframe
      title="Book a discovery call"
      src={url}
      loading="lazy"
      className="h-[680px] w-full rounded-3xl border border-white/10 bg-white"
    />
  );
}

export function Booking() {
  const { t } = useLang();

  return (
    <section id="booking" className="dark bg-background py-28 text-foreground sm:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-white/45">{t.booking.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-6xl">
            {t.booking.title}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60">
            {t.booking.sub}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12">
            {BOOKING_URL ? (
              <CalendlyEmbed url={BOOKING_URL} />
            ) : (
              <div className="flex h-[420px] flex-col items-center justify-center gap-6 rounded-3xl border border-dashed border-white/15 bg-white/[0.03]">
                <p className="text-sm text-white/45">{t.booking.placeholder}</p>
                <a
                  href="mailto:rayan.belabbes@handchecks.com"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.04]"
                >
                  {t.booking.cta}
                  <span aria-hidden>→</span>
                </a>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
