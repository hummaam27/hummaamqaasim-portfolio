import Link from "next/link";
import type { Project } from "@/types";

const STATUS_LABEL: Record<Project["status"], string> = {
  active: "Active",
  shipped: "Shipped",
  archived: "Archived",
};

/** Featured case-study card — large, filled, anchored by a terracotta
 *  index numeral. The premier tier on the home page. */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index?: number;
}) {
  const year = new Date(project.date).getFullYear();
  const status = STATUS_LABEL[project.status] ?? project.status;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col rounded-lg border bg-(--color-paper-2) p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--color-rule-strong) hover:shadow-[0_8px_28px_-10px_rgba(45,38,32,0.16)]"
      style={{ borderColor: "var(--color-rule)" }}
    >
      {/* Index numeral + hover arrow */}
      <div className="flex items-start justify-between">
        {index != null ? (
          <span className="font-display text-[28px] leading-none tracking-[-0.03em] text-(--color-terracotta)">
            {String(index).padStart(2, "0")}
          </span>
        ) : (
          <span aria-hidden />
        )}
        <span
          aria-hidden="true"
          className="text-[15px] text-(--color-terracotta) opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
        >
          ↗
        </span>
      </div>

      <h3 className="font-display-mid mt-5 text-[24px] leading-[1.08] tracking-[-0.02em] text-(--color-espresso) transition-colors group-hover:text-(--color-terracotta-deep)">
        {project.title}
      </h3>

      <p className="mono mt-2.5 text-[10px] tracking-[0.14em] text-(--color-ink-faint)">
        {year} · {status.toUpperCase()}
      </p>

      <p className="mt-3.5 text-[13.5px] leading-[1.6] text-(--color-ink-muted)">
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
