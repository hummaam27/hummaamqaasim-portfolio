export const siteConfig = {
  name: "Hummaam Qaasim",
  title: "Hummaam Qaasim — Senior Analytics Engineer",
  description:
    "Senior Analytics Engineer architecting production Microsoft Fabric Medallion lakehouses and governed Power BI semantic models. Founding data hire at a healthcare workforce MSP.",
  url: "https://hummaamqaasim.com",
  ogImage: "https://hummaamqaasim.com/opengraph-image",

  author: {
    name: "Hummaam Qaasim",
    location: "Annapolis, Maryland",
    role: "Senior Analytics Engineer",
    company: "Healthcare workforce MSP (stealth)",
    bio: "I architect production Microsoft Fabric Medallion lakehouses — bronze ingestion across REST APIs, custom-report APIs, and SFTP feeds; silver canonicalization; gold Kimball star schemas; governed Power BI semantic models with Row-Level Security on top. Currently the founding data hire at a healthcare workforce MSP, where the platform unifies four Vendor Management Systems into one trusted source of truth for executive reporting.",
    email: "hummaam@hummaamqaasim.com",
  },

  links: {
    github: "https://github.com/hummaam27",
    linkedin: "https://www.linkedin.com/in/hummaam-qaasim/",
    twitter: null as string | null,
  },

  nav: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/writing", label: "Writing" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
