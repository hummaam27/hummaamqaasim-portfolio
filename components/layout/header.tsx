"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/site-config";

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-sm"
      style={{
        backgroundColor: "color-mix(in oklab, var(--color-paper-3) 92%, transparent)",
        borderColor: "var(--color-rule)",
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5 sm:px-8">
        <Link
          href="/"
          className="font-serif italic text-[16px] tracking-tight text-(--color-ink) transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          {siteConfig.name}
        </Link>

        <nav>
          <ul className="flex items-center gap-5 sm:gap-7">
            {siteConfig.nav.map((item) => {
              const isCurrent =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "relative pb-0.5 text-[12px] tracking-wide transition-colors",
                      isCurrent
                        ? "text-(--color-ink)"
                        : "text-(--color-ink-muted) hover:text-(--color-ink)",
                    )}
                  >
                    {item.label}
                    {isCurrent ? (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-[3px] left-0 right-0 h-[1.5px]"
                        style={{ backgroundColor: "var(--color-terracotta)" }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
