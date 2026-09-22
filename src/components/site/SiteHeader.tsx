import { useEffect, useState } from "react";
import logoWhite from "@/assets/opt/logo-white.webp";
import logoBlack from "@/assets/opt/logo-black.webp";
import { useLang } from "@/lib/i18n";

function FlagUK() {
  return (
    <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 60,40 M60,0 0,40" stroke="#fff" strokeWidth="8" />
      <path d="M0,0 60,40 M60,0 0,40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13" />
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
}

function FlagFR() {
  return (
    <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden="true">
      <rect width="20" height="40" fill="#002395" />
      <rect x="20" width="20" height="40" fill="#fff" />
      <rect x="40" width="20" height="40" fill="#ED2939" />
    </svg>
  );
}


export function SiteHeader() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center">
          <img
            src={scrolled ? logoBlack : logoWhite}
            alt="Handchecks"
            className="h-6 w-auto transition-opacity duration-500"
          />
        </a>

        <nav
          className={`hidden items-center gap-8 text-sm md:flex ${
            scrolled ? "text-foreground" : "text-white"
          }`}
        >
          <a href="#services" className="opacity-70 transition-opacity hover:opacity-100">
            {t.nav.services}
          </a>
          <a href="#process" className="opacity-70 transition-opacity hover:opacity-100">
            {t.nav.process}
          </a>
          <a href="#clients" className="opacity-70 transition-opacity hover:opacity-100">
            {t.nav.clients}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div
            className={`flex items-center rounded-full border p-0.5 text-xs ${
              scrolled ? "border-border" : "border-white/25"
            }`}
          >
            {(["en", "fr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-label={l === "en" ? "English" : "Français"}
                className={`rounded-full p-1 transition-all ${
                  lang === l ? "opacity-100 scale-105" : "opacity-40 hover:opacity-70"
                }`}
              >
                <span className="block h-4 w-6 overflow-hidden rounded-[3px] ring-1 ring-black/10">
                  {l === "en" ? <FlagUK /> : <FlagFR />}
                </span>
              </button>
            ))}


          </div>

          <a
            href="#booking"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-transform hover:scale-[1.03] ${
              scrolled ? "bg-foreground text-background" : "bg-white text-black"
            }`}
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
