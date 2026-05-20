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
    bio: "Every company, past a certain size, discovers its data has quietly developed opinions — four systems, four answers, nobody entirely sure which to trust. I'm the founding data hire at a healthcare workforce MSP, which mostly meant being handed exactly that. I build production Microsoft Fabric Medallion lakehouses — bronze-to-gold plumbing that gets four vendor systems to agree on a single number, the kind an executive can take into a board meeting without a disclaimer.",
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
