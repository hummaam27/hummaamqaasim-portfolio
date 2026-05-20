import Link from "next/link";
import { GithubIcon } from "@/components/brand-icons";
import type { Project } from "@/types";

/** Compact, secondary-tier card for side projects / open-source experiments.
 *  Outline-only (no fill), less padding, smaller type, no hover lift —
 *  visually subordinate to the featured ProjectCard. */
export function SideProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="group relative rounded-lg border p-4 transition-colors duration-200 hover:border-(--color-rule-strong)"
      style={{ borderColor: "var(--color-rule)" }}
    >
      {project.github ? (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} source on GitHub`}
          className="absolute top-4 right-4 z-10 text-(--color-ink-faint) transition-colors hover:text-(--color-terracotta)"
        >
          <GithubIcon className="h-[15px] w-[15px]" />
        </a>
      ) : null}

      <h3 className="pr-7 font-serif text-[15px] leading-tight tracking-tight text-(--color-ink)">
        <Link
          href={`/projects/${project.slug}`}
          className="transition-colors after:absolute after:inset-0 group-hover:text-(--color-terracotta-deep)"
        >
          {project.title}
        </Link>
      </h3>

      <p className="mt-1.5 text-[12px] leading-[1.55] text-(--color-ink-muted)">
        {project.description}
      </p>

      {project.tech.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-1">
          {project.tech.map((t) => (
            <li
              key={t}
              className="mono rounded px-1.5 py-0.5 text-[9.5px] tracking-wider text-(--color-ink-faint)"
              style={{ backgroundColor: "var(--color-tint)" }}
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
