export const siteConfig = {
  name: "Hummaam Qaasim",
  title: "Hummaam Qaasim — Analytics Engineer",
  description:
    "Analytics Engineer architecting a production Medallion architecture on Microsoft Fabric and a governed semantic model. Founding data hire at a healthcare workforce MSP.",
  url: "https://hummaamqaasim.com",
  ogImage: "https://hummaamqaasim.com/opengraph-image",

  author: {
    name: "Hummaam Qaasim",
    location: "Annapolis, Maryland",
    role: "Analytics Engineer",
    company: "Healthcare workforce MSP (stealth)",
    bio: "Founding data hire at a healthcare staffing MSP. Microsoft Fabric. Medallion architecture. Power BI. Reads xmla.json files for fun.",
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
