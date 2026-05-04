import Link from "next/link";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  feature = false,
}: {
  project: Project;
  feature?: boolean;
}) {
  const year = new Date(project.date).getFullYear();
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-lg border bg-(--color-paper-2) p-5 transition-colors hover:border-(--color-rule-strong)"
      style={{ borderColor: "var(--color-rule)" }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3
          className={
            feature
              ? "font-serif text-[20px] leading-tight tracking-tight text-(--color-ink)"
              : "font-serif text-[17px] leading-tight tracking-tight text-(--color-ink)"
          }
        >
          {project.title}
        </h3>
        <span className="mono shrink-0 text-[10px] text-(--color-terracotta)">
          {year}
        </span>
      </div>

      <p className="mt-2 text-[12.5px] leading-[1.55] text-(--color-ink-muted)">
        {project.description}
      </p>

      {project.tech.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="mono rounded px-1.5 py-0.5 text-[10px] text-(--color-ink-muted)"
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
