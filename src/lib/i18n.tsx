import { createContext, useContext, useMemo, useState, type Context, type ReactNode } from "react";

export type Lang = "en" | "fr";

export const content = {
  en: {
    nav: { services: "What we do", process: "How it works", clients: "Clients", cta: "Book a call" },
    hero: {
      eyebrow: "Content-driven lead generation",
      title: "Your content brings attention.",
      titleAccent: "We turn it into leads.",
      sub: "We create your content, run ads behind it, and automate your Instagram DMs so every conversation is qualified, answered and organised.",
      cta: "Book a discovery call",
      scroll: "Scroll",
    },
    services: {
      eyebrow: "What we do",
      title: "Three levels. One outcome.",
      sub: "\n",
      items: [
        {
          tag: "01",
          name: "Content Creation",
          desc: "We shoot, edit, and publish content your audience actually stops for. We upload across every major platform (Instagram, TikTok, LinkedIn, YouTube...)",
          points: ["On-location shooting*", "Editing & post-production", "Publishing & content calendar"],
          note: "*Depending on where you're based. We have teams in France, Spain and Morocco. Other countries are possible, but travel costs apply.",
        },
        {
          tag: "02",
          name: "Ads Management",
          desc: "Creative testing, targeting and daily optimisation. We put budget behind the content that already performs.",
          points: ["Creative strategy & testing", "Daily budget optimisation", "Ad-to-DM funnels", "Transparent reporting"],
          note: "",
        },
        {
          tag: "03",
          name: "DM Automations",
          desc: "Automated DM flows qualify every lead the moment they reply, then sort your entire Instagram inbox so your team only speaks to buyers.",
          points: ["✓\nKeyword & reply triggers", "Automatic lead qualification", "Full inbox organisation", "Follow-up sequences"],
          note: "",
        },
      ],
    },

    process: {
      eyebrow: "How it works",
      title: "From a scroll to a sales call.",
      steps: [
        { n: "01", t: "Attention", d: "Your content and our ads put the right people in front of your offer, every single day." },
        { n: "02", t: "Qualification", d: "The moment they reply, automated DM flows ask the right questions and score the lead for you." },
        { n: "03", t: "Organisation", d: "Qualified leads land in a clean, tagged inbox. Your team opens Instagram and closes. Nothing else." },
      ],
    },
    stats: {
      eyebrow: "The numbers",
      title: "Results, measured.",
      note: "",
      items: [
        { value: 500, suffix: "+", label: "Videos created" },
        { value: 20, suffix: "+", label: "Brands managed" },
        { value: 400, suffix: "+", label: "Leads generated" },
      ],
    },
    clients: {
      eyebrow: "Clients",
      title: "A few of the accounts we grew.",
      sub: "From real estate to pilates studios, padel clubs, and car dealerships, we’ve worked with a diverse range of clients across different industries.",
      more: "And many more!",
    },

    booking: {
      eyebrow: "Next step",
      title: "Let's talk for 30 minutes.",
      sub: "Get a free audit and a strategy for your brand. We’ll show you exactly what we’d change and give you a clear plan you can implement yourself or hire us to execute for you.",
      placeholder: "Booking calendar coming soon.",
      cta: "Book a discovery call",
    },
    footer: { rights: "All rights reserved.", contact: "Contact" },
  },
  fr: {
    nav: { services: "Nos services", process: "Notre méthode", clients: "Clients", cta: "Réserver un appel" },
    hero: {
      eyebrow: "Génération de leads via votre contenu",
      title: "Votre contenu attire l'attention.",
      titleAccent: "Nous la transformons en leads.",
      sub: "Nous créons votre contenu, mettons de la publicité derrière, et automatisons vos DM Instagram pour que chaque conversation soit qualifiée, répondue et organisée.",
      cta: "Réserver un appel découverte",
      scroll: "Défiler",
    },
    services: {
      eyebrow: "Nos services",
      title: "Trois niveaux. Un seul objectif.",
      sub: "Nous restons volontairement focalisés. Tout ce que nous construisons sert le même objectif : des conversations qualifiées dans votre messagerie.",
      items: [
        {
          tag: "01",
          name: "Création de contenu",
          desc: "Nous tournons, montons et publions le contenu qui capte réellement votre audience — pensé pour attirer les bonnes personnes, pas juste des vues.",
          points: ["Tournage sur place*", "Montage et post-production", "Publication et calendrier éditorial", "Accroches pensées pour convertir"],
          note: "*Selon votre localisation. Nous avons des équipes en France, en Espagne et au Maroc — d'autres pays sont possibles, mais impliquent des frais de déplacement.",
        },
        {
          tag: "02",
          name: "Gestion publicitaire",
          desc: "Tests créatifs, ciblage et optimisation quotidienne sur Meta. Nous mettons du budget derrière le contenu qui performe déjà.",
          points: ["Stratégie et tests créatifs", "Optimisation quotidienne", "Tunnels pub vers DM", "Reporting transparent"],
          note: "",
        },
        {
          tag: "03",
          name: "Automatisations DM",
          desc: "Des scénarios de DM qualifient chaque lead dès sa réponse, puis organisent toute votre boîte Instagram pour que votre équipe ne parle qu'aux acheteurs.",
          points: ["Déclencheurs mots-clés et stories", "Qualification automatique", "Boîte de réception organisée", "Séquences de relance"],
          note: "",
        },
      ],
    },

    process: {
      eyebrow: "Notre méthode",
      title: "Du scroll à l'appel de vente.",
      steps: [
        { n: "01", t: "Attention", d: "Votre contenu et nos publicités placent les bonnes personnes devant votre offre, chaque jour." },
        { n: "02", t: "Qualification", d: "Dès la réponse, des scénarios de DM posent les bonnes questions et notent le lead pour vous." },
        { n: "03", t: "Organisation", d: "Les leads qualifiés arrivent dans une boîte propre et taguée. Votre équipe ouvre Instagram et closes — rien d'autre." },
      ],
    },
    stats: {
      eyebrow: "Les chiffres",
      title: "Des résultats mesurés.",
      note: "",
      items: [
        { value: 500, suffix: "+", label: "Vidéos créées" },
        { value: 20, suffix: "+", label: "Marques accompagnées" },
        { value: 400, suffix: "+", label: "Leads générés" },
      ],
    },
    clients: {
      eyebrow: "Clients",
      title: "Quelques comptes que nous avons fait grandir.",
      sub: "Immobilier, hôtellerie, sport, divertissement — de Moroccan Brothers à Sofian Immobilier, Mr Humble, Society Club Monaco, Hillal Bnb et Padel Plaza.",
      more: "Et bien d'autres !",
    },

    booking: {
      eyebrow: "Prochaine étape",
      title: "Parlons-en 30 minutes.",
      sub: "Un audit gratuit de votre page : nous regardons votre contenu, votre messagerie et ce que nous changerions en premier.",
      placeholder: "Calendrier de réservation bientôt disponible.",
      cta: "Réserver un appel découverte",
    },
    footer: { rights: "Tous droits réservés.", contact: "Contact" },
  },
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof content)["en"] };

// Keep a single context instance across hot reloads, otherwise providers and
// consumers can end up bound to different contexts after an HMR update.
const g = globalThis as unknown as { __langCtx?: Context<Ctx | null> };
const LangContext = (g.__langCtx ??= createContext<Ctx | null>(null));


export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const value = useMemo(
    () => ({ lang, setLang, t: content[lang] as (typeof content)["en"] }),
    [lang],
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
