import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/layout/container";
import { GithubIcon, LinkedInIcon } from "@/components/brand-icons";
import { siteConfig } from "@/site-config";

export const metadata = {
  title: "Contact",
  description: `Reach ${siteConfig.author.name} via LinkedIn, GitHub, or email.`,
};

const channels = [
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    detail: "/in/hummaam-qaasim/",
    href: siteConfig.links.linkedin,
    external: true,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    detail: "@hummaam27",
    href: siteConfig.links.github,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    detail: siteConfig.author.email,
    href: `mailto:${siteConfig.author.email}`,
    external: false,
  },
];

export default function ContactPage() {
  return (
    <section className="pt-20 pb-16 sm:pt-28">
      <Container width="prose">
        <p className="eyebrow">Contact</p>
        <h1 className="mt-5 font-serif text-[36px] leading-[1.02] tracking-tight text-(--color-ink) sm:text-[44px]">
          Get in touch.
        </h1>
        <p className="mt-6 font-serif text-[17px] leading-[1.55] text-(--color-ink)">
          Best for: senior data engineering roles, Microsoft Fabric work, or a
          conversation about analytics engineering and AI-augmented BI.
        </p>

        <ul
          className="mt-12 divide-y"
          style={{ borderColor: "var(--color-rule)" }}
        >
          {channels.map(({ icon: Icon, label, detail, href, external }) => {
            const linkProps = external
              ? { target: "_blank", rel: "noopener noreferrer" as const }
              : {};
            const inner = (
              <span className="grid grid-cols-[28px_1fr_auto] items-baseline gap-4 py-5">
                <Icon
                  className="h-[18px] w-[18px] self-center text-(--color-ink-muted) transition-colors group-hover:text-(--color-terracotta)"
                  aria-hidden="true"
                />
                <span>
                  <span className="font-serif text-[18px] tracking-tight text-(--color-ink) transition-colors group-hover:text-(--color-terracotta)">
                    {label}
                  </span>
                </span>
                <span className="mono text-[12px] text-(--color-ink-muted)">
                  {detail}
                </span>
              </span>
            );
            return (
              <li key={label}>
                {external ? (
                  <a href={href} {...linkProps} className="group block">
                    {inner}
                  </a>
                ) : (
                  <Link href={href} className="group block">
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
