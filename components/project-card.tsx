import Link from "next/link";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  feature = false,
}: {
  project: Project;
  feature?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block rounded-lg border bg-(--color-paper-2) p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-rule-strong) hover:shadow-[0_6px_24px_-8px_rgba(45,38,32,0.12)]"
      style={{ borderColor: "var(--color-rule)" }}
    >
      {/* Hover-revealed arrow */}
      <span
        aria-hidden="true"
        className="absolute top-5 right-5 text-[14px] text-(--color-terracotta) opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      >
        ↗
      </span>

      <div className="pr-8">
        <h3
          className={
            feature
              ? "font-serif text-[21px] leading-tight tracking-tight text-(--color-ink) transition-colors group-hover:text-(--color-terracotta-deep)"
              : "font-serif text-[18px] leading-tight tracking-tight text-(--color-ink) transition-colors group-hover:text-(--color-terracotta-deep)"
          }
        >
          {project.title}
        </h3>
      </div>

      <p className="mt-3 text-[13px] leading-[1.6] text-(--color-ink-muted)">
        {project.description}
      </p>

      {project.tech.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="mono rounded px-2 py-0.5 text-[10px] tracking-wider text-(--color-ink-muted) transition-colors group-hover:text-(--color-ink)"
              style={{ backgroundColor: "var(--color-tint)" }}
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}
    </Link>
  );
}
