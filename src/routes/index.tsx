import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/lib/i18n";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { Stats } from "@/components/site/Stats";
import { Clients } from "@/components/site/Clients";
import { Booking } from "@/components/site/Booking";
import { SiteFooter } from "@/components/site/SiteFooter";

const title = "Handchecks — Instagram Ads & DM Automation Agency";
const description =
  "Handchecks turns your content into booked leads: Meta ads management plus ManyChat DM automations that qualify leads and organise your Instagram inbox.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <div className="bg-background text-foreground">
        <SiteHeader />
        <main>
          <Hero />
          <Services />
          <Process />
          <Stats />
          <Clients />
          <Booking />
        </main>
        <SiteFooter />
      </div>
    </LangProvider>
  );
}
