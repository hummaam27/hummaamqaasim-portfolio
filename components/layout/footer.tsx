export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-24 border-t"
      style={{ borderColor: "var(--color-rule)" }}
    >
      <div className="mx-auto flex max-w-5xl justify-center px-6 py-6 sm:px-8">
        <p className="mono text-[11px] text-(--color-ink-faint)">© {year}</p>
      </div>
    </footer>
  );
}
