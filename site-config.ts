export const siteConfig = {
  name: "Hummaam Qaasim",
  title: "Hummaam Qaasim — Analytics Engineer",
  description:
    "Analytics Engineer architecting production Microsoft Fabric Medallion lakehouses and governed Power BI semantic models. Founding data hire at a healthcare workforce MSP.",
  url: "https://hummaamqaasim.com",
  ogImage: "https://hummaamqaasim.com/opengraph-image",

  author: {
    name: "Hummaam Qaasim",
    location: "Annapolis, Maryland",
    role: "Analytics Engineer",
    company: "Healthcare workforce MSP (stealth)",
    bio: "I reconcile four vendor systems into one source of truth — currently at a healthcare workforce MSP, where the board-deck number used to depend on who made the spreadsheet.",
    email: "hummaam@hummaamqaasim.com",
  },

  links: {
    github: "https://github.com/hummaam27",
    linkedin: "https://www.linkedin.com/in/hummaam-qaasim/",
    twitter: null as string | null,
  },

  nav: [] as Array<{ href: string; label: string }>,
} as const;

export type SiteConfig = typeof siteConfig;
