import logoWhite from "@/assets/logo-white.png.asset.json";
import { useLang } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLang();

  return (
    <footer className="dark border-t border-white/10 bg-background py-14 text-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 sm:flex-row sm:items-center sm:justify-between">
        <img src={logoWhite.url} alt="Handchecks" className="h-6 w-auto" />

        <div className="flex flex-col gap-2 text-sm text-white/55 sm:items-end">
          <a href="mailto:support@handchecks.com" className="transition-colors hover:text-white">
            support@handchecks.com
          </a>
          <a
            href="https://instagram.com/handchecks"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl px-6 text-xs text-white/30">
        © {new Date().getFullYear()} Handchecks. {t.footer.rights}
      </div>
    </footer>
  );
}
