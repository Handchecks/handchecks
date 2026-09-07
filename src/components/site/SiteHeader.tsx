import { useEffect, useState } from "react";
import logoWhite from "@/assets/logo-white.png.asset.json";
import logoBlack from "@/assets/logo-black.png.asset.json";
import { useLang } from "@/lib/i18n";

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
            src={scrolled ? logoBlack.url : logoWhite.url}
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
            {([
              ["en", "🇬🇧"],
              ["fr", "🇫🇷"],
            ] as const).map(([l, flag]) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-label={l === "en" ? "English" : "Français"}
                className={`rounded-full px-2 py-1 text-base leading-none transition-all ${
                  lang === l
                    ? "opacity-100 scale-105"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                {flag}
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
