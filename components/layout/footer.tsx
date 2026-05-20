import { siteConfig } from "@/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  const city = siteConfig.author.location.split(",")[0].toUpperCase();

  return (
    <footer
      className="mt-32 border-t"
      style={{ borderColor: "var(--color-rule)" }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-center gap-3 px-6 py-8 sm:px-8">
        <span
          aria-hidden="true"
          className="block h-1 w-1 rounded-full"
          style={{ backgroundColor: "var(--color-olive)" }}
        />
        <p className="mono text-[10.5px] tracking-[0.2em] text-(--color-ink-muted)">
          © {year} · {city} · HUMMAAM QAASIM
        </p>
        <span
          aria-hidden="true"
          className="block h-1 w-1 rounded-full"
          style={{ backgroundColor: "var(--color-olive)" }}
        />
      </div>
    </footer>
  );
}
