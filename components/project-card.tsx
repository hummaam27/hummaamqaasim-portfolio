import Link from "next/link";
import type { Project } from "@/types";

const STATUS_LABEL: Record<Project["status"], string> = {
  active: "Active",
  shipped: "Shipped",
  archived: "Archived",
};

/** Featured case-study card — full terracotta block, cream text, anchored
 *  by a massive ghosted index numeral. The premier tier on the home page. */
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
      className="group relative flex flex-col overflow-hidden rounded-lg bg-(--color-terracotta) p-7 transition-all duration-200 hover:-translate-y-1 hover:bg-(--color-terracotta-deep) hover:shadow-[0_18px_44px_-14px_rgba(159,69,40,0.55)]"
    >
      {/* Massive ghosted index numeral */}
      {index != null ? (
        <span
          aria-hidden="true"
          className="font-display pointer-events-none absolute -top-4 left-4 text-[104px] leading-none tracking-[-0.04em] text-(--color-paper)/20 select-none"
        >
          {String(index).padStart(2, "0")}
        </span>
      ) : null}

      {/* Hover arrow */}
      <span
        aria-hidden="true"
        className="absolute top-6 right-6 text-[16px] text-(--color-paper) opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
      >
        ↗
      </span>

      <div className="relative mt-16">
        <h3 className="font-display text-[30px] leading-[1.04] tracking-[-0.03em] text-(--color-paper)">
          {project.title}
        </h3>

        <p className="mono mt-3 text-[10px] tracking-[0.16em] text-(--color-paper)/70">
          {year} · {status.toUpperCase()}
        </p>

        <p className="mt-4 text-[14px] leading-[1.6] text-(--color-paper)/85">
          {project.description}
        </p>

        {project.tech.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="mono rounded px-2 py-1 text-[10px] tracking-wider text-(--color-paper)/95"
                style={{ backgroundColor: "var(--color-terracotta-deep)" }}
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  );
}
