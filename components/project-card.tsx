import Link from "next/link";
import type { Project } from "@/types";

/** Featured case-study card — full terracotta block, cream text.
 *  Flex column so tags pin to the card bottom across an equal-height grid. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-(--color-terracotta) p-7 transition-all duration-200 hover:-translate-y-1 hover:bg-(--color-terracotta-deep) hover:shadow-[0_18px_44px_-14px_rgba(159,69,40,0.55)]"
    >
      {/* Hover arrow */}
      <span
        aria-hidden="true"
        className="absolute top-6 right-6 text-[16px] text-(--color-paper) opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
      >
        ↗
      </span>

      <h3 className="pr-9 font-display text-[30px] leading-[1.04] tracking-[-0.03em] text-(--color-paper)">
        {project.title}
      </h3>

      <p className="mt-4 text-[14px] leading-[1.6] text-(--color-paper)/85">
        {project.description}
      </p>

      {project.tech.length > 0 ? (
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
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
    </Link>
  );
}
