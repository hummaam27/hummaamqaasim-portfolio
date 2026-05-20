import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/brand-icons";
import type { Project } from "@/types";

/** Compact side-project card — cream card on the warm sage section.
 *  Dark ink text, olive accents, screenshot banner, filled olive tags. */
export function SideProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-lg border bg-(--color-paper-2) transition-colors duration-200 hover:border-(--color-olive)"
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

      <div className="relative p-5">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source on GitHub`}
            className="absolute top-5 right-5 z-10 text-(--color-olive) transition-colors hover:text-(--color-olive-deep)"
          >
            <GithubIcon className="h-[15px] w-[15px]" />
          </a>
        ) : null}

        <h3 className="pr-7 font-display-mid text-[18px] leading-tight tracking-[-0.01em] text-(--color-olive-deep)">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-(--color-ink)"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 text-[14px] leading-[1.55] text-(--color-ink)">
          {project.description}
        </p>

        {project.tech.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="mono rounded px-2.5 py-1 text-[10px] tracking-wider text-(--color-ink)"
                style={{ backgroundColor: "var(--color-olive)" }}
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
