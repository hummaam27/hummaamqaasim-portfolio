export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-14 mb-6 flex items-baseline gap-4">
      <span className="eyebrow whitespace-nowrap">{children}</span>
      <span
        aria-hidden="true"
        className="block h-px flex-1"
        style={{ backgroundColor: "var(--color-rule-strong)" }}
      />
    </div>
  );
}
