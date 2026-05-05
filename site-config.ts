export const siteConfig = {
  name: "Hummaam Qaasim",
  title: "Hummaam Qaasim — Data Engineer",
  description:
    "Data engineer building production Microsoft Fabric Medallion architectures, AI-augmented BI, and custom MCP servers.",
  url: "https://hummaamqaasim.com",
  ogImage: "https://hummaamqaasim.com/opengraph-image",

  author: {
    name: "Hummaam Qaasim",
    location: "Annapolis, Maryland",
    role: "Data Engineer",
    company: "Healthcare workforce MSP (stealth)",
    // TODO: Hummaam to revise — placeholder bio, refine voice and specifics before launch
    bio: "I build production data platforms and AI-augmented BI systems. Currently architecting a five-source Medallion lakehouse in Microsoft Fabric, building custom MCP servers for AI-augmented data engineering, and exploring the intersection of cloud, data, and AI.",
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
