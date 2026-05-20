import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/brand-icons";
import type { Project } from "@/types";

/** Compact, secondary-tier card for side projects / open-source experiments.
 *  Outline-only (no fill), screenshot banner, smaller type, no hover lift —
 *  visually subordinate to the featured ProjectCard. */
export function SideProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-lg border transition-colors duration-200 hover:border-(--color-rule-strong)"
      style={{ borderColor: "var(--color-rule)" }}
    >
      {project.image ? (
        <div
          className="relative aspect-[16/9] w-full border-b"
          style={{ borderColor: "var(--color-rule)" }}
        >
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(min-width: 768px) 360px, 90vw"
            className="object-cover object-top"
          />
        </div>
      ) : null}

      <div className="relative p-4">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source on GitHub`}
            className="absolute top-4 right-4 z-10 text-(--color-olive) transition-colors hover:text-(--color-olive-deep)"
          >
            <GithubIcon className="h-[15px] w-[15px]" />
          </a>
        ) : null}

        <h3 className="pr-7 font-serif text-[15px] leading-tight tracking-tight text-(--color-ink)">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-(--color-olive-deep)"
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
                className="mono rounded px-1.5 py-0.5 text-[9.5px] tracking-wider text-(--color-olive-deep)"
                style={{ backgroundColor: "var(--color-tint)" }}
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
