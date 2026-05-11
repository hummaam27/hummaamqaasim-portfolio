"use client";

/**
 * ProjectTOC — sticky right-rail table of contents for case study pages.
 * - Items come from H2s extracted in lib/toc.ts.
 * - Clicking an item smooth-scrolls to the matching #id (added by rehype-slug).
 * - IntersectionObserver tracks which section is currently visible and
 *   highlights it with a terracotta marker and emphasized text.
 * - Hidden on screens narrower than xl (1280px+); below that the article
 *   reads as a single column with no sidebar at all.
 */

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

export function ProjectTOC({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || items.length === 0) return;
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => n !== null);

    // Track the topmost heading whose top has passed the activation line.
    const ACTIVATION_OFFSET = 140; // px from top of viewport

    const update = () => {
      let current: string | null = null;
      for (const node of targets) {
        const top = node.getBoundingClientRect().top;
        if (top - ACTIVATION_OFFSET <= 0) {
          current = node.id;
        } else {
          break;
        }
      }
      setActiveId(current ?? targets[0]?.id ?? null);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Article contents"
      className="relative rounded-lg bg-(--color-paper-2) px-5 py-5 text-sm shadow-[0_1px_0_rgba(45,38,32,0.03),0_10px_28px_-16px_rgba(45,38,32,0.16)]"
    >
      <div className="mb-4 flex items-center gap-2">
        <span
          aria-hidden
          className="block h-1 w-1 rounded-full"
          style={{ backgroundColor: "var(--color-terracotta)" }}
        />
        <span className="mono text-[10px] tracking-[0.22em] uppercase text-(--color-terracotta)">
          Contents
        </span>
      </div>

      <ol className="space-y-2.5">
        {items.map((item, i) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className="relative pl-3">
              {isActive ? (
                <span
                  aria-hidden
                  className="absolute left-0 top-[7px] block h-[6px] w-[6px] rounded-full"
                  style={{ backgroundColor: "var(--color-terracotta)" }}
                />
              ) : null}
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  const target = document.getElementById(item.id);
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.replaceState(null, "", `#${item.id}`);
                  }
                }}
                className={
                  "block transition-colors leading-snug text-(--color-ink) " +
                  (isActive ? "font-medium" : "hover:text-(--color-terracotta-deep)")
                }
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <span className="mono mr-2 text-[10px] font-semibold tabular-nums text-(--color-terracotta)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
