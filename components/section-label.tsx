export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-16 mb-8 flex items-center gap-4">
      <span className="eyebrow whitespace-nowrap">{children}</span>
      <span
        aria-hidden="true"
        className="block h-px flex-1"
        style={{ backgroundColor: "var(--color-rule-strong)" }}
      />
      <span
        aria-hidden="true"
        className="block h-1 w-1 rounded-full"
        style={{ backgroundColor: "var(--color-terracotta)" }}
      />
    </div>
  );
}
