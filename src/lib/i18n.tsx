import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "fr";

export const content = {
  en: {
    nav: { services: "What we do", process: "How it works", clients: "Clients", cta: "Book a call" },
    hero: {
      eyebrow: "Content-driven lead generation",
      title: "Your content brings attention.",
      titleAccent: "We turn it into booked leads.",
      sub: "Handchecks creates your content — shooting, editing and publishing — puts paid budget behind it, and automates your Instagram DMs so every conversation is qualified, answered and organised.",
      cta: "Book a discovery call",
      scroll: "Scroll",
    },
    services: {
      eyebrow: "What we do",
      title: "Two levers. Nothing else.",
      sub: "We keep the offer narrow on purpose. Everything we build feeds the same outcome: qualified conversations in your inbox.",
      items: [
        {
          tag: "01",
          name: "Ads Management",
          desc: "Creative testing, targeting and daily optimisation on Meta. We put budget behind the content that already performs, and cut what doesn't.",
          points: ["Creative strategy & testing", "Daily budget optimisation", "Ad-to-DM funnels", "Transparent reporting"],
        },
        {
          tag: "02",
          name: "ManyChat Automations",
          desc: "Automated DM flows qualify every lead the moment they reply, then sort your entire Instagram inbox so your team only speaks to buyers.",
          points: ["Keyword & story-reply triggers", "Automatic lead qualification", "Full inbox organisation", "Follow-up sequences"],
        },
      ],
    },
    process: {
      eyebrow: "How it works",
      title: "From a scroll to a sales call.",
      steps: [
        { n: "01", t: "Attention", d: "Your content and our ads put the right people in front of your offer, every single day." },
        { n: "02", t: "Qualification", d: "The moment they reply, automated DM flows ask the right questions and score the lead for you." },
        { n: "03", t: "Organisation", d: "Qualified leads land in a clean, tagged inbox. Your team opens Instagram and closes — nothing else." },
      ],
    },
    stats: {
      eyebrow: "The numbers",
      title: "Results, measured.",
      note: "Placeholder figures — real numbers coming soon.",
      items: [
        { value: 0, suffix: "+", label: "Qualified leads generated" },
        { value: 0, suffix: "+", label: "Brands managed" },
        { value: 0, suffix: "%", label: "DMs answered automatically" },
        { value: 0, suffix: "x", label: "Average return on ad spend" },
      ],
    },
    clients: {
      eyebrow: "Clients",
      title: "They trusted us.",
      sub: "From real estate to hospitality and sport — brands that grew their inbox with Handchecks.",
      more: "and more",
    },
    booking: {
      eyebrow: "Next step",
      title: "Let's talk for 20 minutes.",
      sub: "A short discovery call to look at your content, your inbox and what we'd change first. No pitch deck, no pricing games.",
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
      sub: "Handchecks crée votre contenu — tournage, montage et publication — met du budget publicitaire derrière, et automatise vos DM Instagram pour que chaque conversation soit qualifiée, répondue et organisée.",
      cta: "Réserver un appel découverte",
      scroll: "Défiler",
    },
    services: {
      eyebrow: "Nos services",
      title: "Deux leviers. Rien d'autre.",
      sub: "Nous restons volontairement focalisés. Tout ce que nous construisons sert le même objectif : des conversations qualifiées dans votre messagerie.",
      items: [
        {
          tag: "01",
          name: "Gestion publicitaire",
          desc: "Tests créatifs, ciblage et optimisation quotidienne sur Meta. Nous mettons du budget derrière le contenu qui performe déjà, et coupons le reste.",
          points: ["Stratégie et tests créatifs", "Optimisation quotidienne", "Tunnels pub vers DM", "Reporting transparent"],
        },
        {
          tag: "02",
          name: "Automatisations ManyChat",
          desc: "Des scénarios de DM qualifient chaque lead dès sa réponse, puis organisent toute votre boîte Instagram pour que votre équipe ne parle qu'aux acheteurs.",
          points: ["Déclencheurs mots-clés et stories", "Qualification automatique", "Boîte de réception organisée", "Séquences de relance"],
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
      note: "Chiffres provisoires — vrais résultats bientôt.",
      items: [
        { value: 0, suffix: "+", label: "Leads qualifiés générés" },
        { value: 0, suffix: "+", label: "Marques accompagnées" },
        { value: 0, suffix: "%", label: "DM traités automatiquement" },
        { value: 0, suffix: "x", label: "Retour sur dépense publicitaire" },
      ],
    },
    clients: {
      eyebrow: "Clients",
      title: "Ils nous ont fait confiance.",
      sub: "De l'immobilier à l'hôtellerie et au sport — des marques qui ont fait grandir leur messagerie avec Handchecks.",
      more: "et plus encore",
    },
    booking: {
      eyebrow: "Prochaine étape",
      title: "Parlons-en 20 minutes.",
      sub: "Un court appel découverte pour regarder votre contenu, votre messagerie et ce que nous changerions en premier. Sans pitch deck, sans jeux de prix.",
      placeholder: "Calendrier de réservation bientôt disponible.",
      cta: "Réserver un appel découverte",
    },
    footer: { rights: "Tous droits réservés.", contact: "Contact" },
  },
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof content)["en"] };

const LangContext = createContext<Ctx | null>(null);

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
