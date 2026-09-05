import { motion } from "motion/react";
import { Inbox } from "lucide-react";
import { Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

function EyesIcon() {
  return (
    <svg viewBox="0 0 48 32" className="h-12 w-12" aria-hidden>
      <ellipse cx="14" cy="16" rx="13" ry="15" fill="currentColor" />
      <ellipse cx="34" cy="16" rx="13" ry="15" fill="currentColor" />
      <ellipse cx="14" cy="16" rx="8.5" ry="10.5" fill="var(--background)" />
      <ellipse cx="34" cy="16" rx="8.5" ry="10.5" fill="var(--background)" />
      <circle cx="16.5" cy="17" r="5.5" fill="currentColor" />
      <circle cx="36.5" cy="17" r="5.5" fill="currentColor" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden>
      <circle cx="24" cy="24" r="22" fill="currentColor" />
      <path
        d="M14 24.5 21 31.5 34 17"
        fill="none"
        stroke="var(--background)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InboxIcon() {
  return <Inbox className="h-12 w-12" strokeWidth={1.75} aria-hidden />;
}


const icons = [EyesIcon, CheckIcon, InboxIcon];


export function Process() {
  const { t } = useLang();

  return (
    <section id="process" className="bg-secondary py-28 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                {t.process.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.08] sm:text-5xl">
                {t.process.title}
              </h2>
            </Reveal>
          </div>

          <div className="space-y-4">
            {t.process.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <div className="rounded-3xl bg-background p-8 sm:p-10">
                  <div className="flex items-baseline gap-5">
                    <span className="text-sm tabular-nums text-muted-foreground">{s.n}</span>
                    <h3 className="text-2xl font-semibold sm:text-3xl">{s.t}</h3>
                  </div>
                  <p className="mt-4 pl-10 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
