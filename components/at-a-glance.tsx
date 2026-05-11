/**
 * AtAGlance — editorial intro block, not a card.
 *
 * Two visual zones:
 *   1. Optional <Headline> on top — large terracotta serif italic, pulled
 *      from a number or one-line outcome statement. Functions like a
 *      magazine "deck" between the title and the article body.
 *   2. A clean metadata table below — small mono labels in a left rail,
 *      serif values in a right column, hairlines between rows.
 *
 * No card background, no border, no rounded corners. Just typography and
 * rules — flush with the surrounding prose width on most screens, but
 * given a slight breakout via negative margins on xl.
 */

import { ReactNode, Children, isValidElement } from "react";

export function AtAGlance({ children }: { children: ReactNode }) {
  // Separate the Headline (if any) from the Row children so we can render
  // them in distinct visual zones.
  const arr = Children.toArray(children);
  const headline = arr.find(
    (c) => isValidElement(c) && (c.type as { displayName?: string }).displayName === "Headline",
  );
  const rows = arr.filter(
    (c) => isValidElement(c) && (c.type as { displayName?: string }).displayName === "Row",
  );

  return (
    <section
      aria-label="At a glance"
      className="not-prose my-12"
    >
      <div className="mb-5 flex items-center gap-3">
        <span
          aria-hidden
          className="block h-[2px] w-10"
          style={{ backgroundColor: "var(--color-terracotta)" }}
        />
        <span className="mono text-[10.5px] tracking-[0.22em] uppercase text-(--color-terracotta)">
          At a glance
        </span>
      </div>

      {headline ? <div className="mb-8">{headline}</div> : null}

      <dl
        className="border-t"
        style={{ borderColor: "var(--color-rule-strong)" }}
      >
        {rows}
      </dl>
    </section>
  );
}

/**
 * Headline — the deck-style outcome statement that sits at the top of the
 * AtAGlance block. Renders as large terracotta italic serif. Use sparingly:
 * the most quotable single sentence from the case study.
 */
export function Headline({ children }: { children: ReactNode }) {
  return (
    <p
      className="font-display-italic text-[28px] leading-[1.15] tracking-[-0.005em] text-(--color-terracotta-deep) sm:text-[34px]"
      style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
    >
      {children}
    </p>
  );
}
Headline.displayName = "Headline";

export function Row({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      className="grid grid-cols-[100px_minmax(0,1fr)] gap-x-6 gap-y-1 border-b py-3 sm:grid-cols-[150px_minmax(0,1fr)]"
      style={{ borderColor: "var(--color-rule)" }}
    >
      <dt className="mono text-[10.5px] tracking-[0.22em] uppercase text-(--color-ink-muted) self-baseline pt-[5px]">
        {label}
      </dt>
      <dd className="font-serif text-[16px] leading-[1.5] text-(--color-ink)">
        {children}
      </dd>
    </div>
  );
}
Row.displayName = "Row";
