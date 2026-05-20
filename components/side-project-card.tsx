import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/brand-icons";
import type { Project } from "@/types";

/** Compact side-project card — sits on the dark espresso section.
 *  Cream text, olive accents, screenshot banner, filled olive tags. */
export function SideProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-lg border transition-colors duration-200 hover:border-(--color-olive)"
      style={{ borderColor: "rgba(245, 239, 227, 0.16)" }}
    >
      {project.image ? (
        <div
          className="relative aspect-[16/9] w-full border-b"
          style={{ borderColor: "rgba(245, 239, 227, 0.16)" }}
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
            className="absolute top-5 right-5 z-10 text-(--color-olive) transition-colors hover:text-(--color-paper)"
          >
            <GithubIcon className="h-[15px] w-[15px]" />
          </a>
        ) : null}

        <h3 className="pr-7 font-display-mid text-[18px] leading-tight tracking-[-0.01em] text-(--color-paper)">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors after:absolute after:inset-0 group-hover:text-(--color-olive)"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 text-[12.5px] leading-[1.55] text-(--color-paper)/60">
          {project.description}
        </p>

        {project.tech.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="mono rounded px-2 py-0.5 text-[9.5px] tracking-wider text-(--color-espresso)"
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
