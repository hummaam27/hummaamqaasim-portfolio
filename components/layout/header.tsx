import Link from "next/link";
import { siteConfig } from "@/site-config";
import { GithubIcon, LinkedInIcon } from "@/components/brand-icons";

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        backgroundColor: "color-mix(in oklab, var(--color-paper) 88%, transparent)",
        borderColor: "var(--color-rule)",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Brand mark — small terracotta seal + serif name */}
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-6 w-6 items-center justify-center rounded-full font-serif text-[11px] font-medium tracking-tight"
            style={{
              backgroundColor: "var(--color-terracotta)",
              color: "var(--color-paper)",
            }}
          >
            HQ
          </span>
          <span className="font-serif text-[16.5px] tracking-tight text-(--color-ink)">
            {siteConfig.name}
          </span>
        </Link>

        {/* Right side: small external links, no nav */}
        <div className="flex items-center gap-5">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-(--color-ink-muted) transition-colors hover:text-(--color-terracotta)"
          >
            <GithubIcon className="h-[17px] w-[17px]" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-(--color-ink-muted) transition-colors hover:text-(--color-terracotta)"
          >
            <LinkedInIcon className="h-[17px] w-[17px]" />
          </a>
        </div>
      </div>
    </header>
  );
}
