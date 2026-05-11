import Link from "next/link";
import { siteConfig } from "@/site-config";
import { GithubIcon, LinkedInIcon } from "@/components/brand-icons";

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b shadow-[0_1px_0_rgba(45,38,32,0.06),0_8px_24px_-18px_rgba(159,69,40,0.45)]"
      style={{
        backgroundColor: "var(--color-terracotta)",
        borderColor: "var(--color-terracotta-deep)",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
        {/* Brand mark — dark ink seal + Fraunces wordmark */}
        <Link
          href="/"
          aria-label="Home"
          className="group inline-flex items-center gap-3"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full font-serif text-[11px] font-semibold tracking-tight shadow-[0_1px_2px_rgba(0,0,0,0.18)] ring-1 ring-white/15 transition-transform duration-300 group-hover:rotate-[-6deg]"
            style={{
              backgroundColor: "var(--color-ink)",
              color: "var(--color-paper)",
            }}
          >
            HQ
          </span>
          <span
            className="font-display text-[19px] leading-none tracking-[-0.015em] text-(--color-paper)"
            style={{
              textShadow: "0 1px 0 rgba(45, 38, 32, 0.22)",
            }}
          >
            Hummaam Qaasim
          </span>
          <span
            aria-hidden
            className="ml-1 hidden h-px w-6 origin-left scale-x-0 bg-(--color-paper) transition-transform duration-300 group-hover:scale-x-100 sm:block"
          />
        </Link>

        {/* Right side: external links */}
        <div className="flex items-center gap-5">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-(--color-paper)/85 transition-all hover:text-(--color-paper) hover:-translate-y-px"
          >
            <GithubIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-(--color-paper)/85 transition-all hover:text-(--color-paper) hover:-translate-y-px"
          >
            <LinkedInIcon className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </header>
  );
}
