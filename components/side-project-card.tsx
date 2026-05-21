import Image from "next/image";
import Link from "next/link";
import { GithubIcon } from "@/components/brand-icons";
import type { Project } from "@/types";

/** Side-project card — solid teal block with a cream inset banner and light
 *  text. Mirrors the featured ProjectCard so both sections read as one family;
 *  the teal block sits a shade darker than its section band to lift off it. */
export function SideProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-(--color-teal) transition-all duration-200 hover:-translate-y-1 hover:bg-(--color-teal-deep) hover:shadow-[0_18px_44px_-14px_rgba(39,78,75,0.55)]">
      {/* Screenshot banner — cream panel inset inside the teal block so the
          card reads as one framed unit, matching the featured cards */}
      {project.image ? (
        <div className="p-3 pb-0">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md bg-(--color-paper-2)">
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(min-width: 768px) 360px, 90vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      ) : null}

      <div className="relative flex flex-1 flex-col px-7 pt-5 pb-7">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source on GitHub`}
            className="absolute top-5 right-7 z-10 text-(--color-paper)/80 transition-colors hover:text-(--color-paper)"
          >
            <GithubIcon className="h-[15px] w-[15px]" />
          </a>
        ) : null}

        <h3 className="pr-9 font-display text-[24px] leading-[1.08] tracking-[-0.025em] text-(--color-paper)">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0"
          >
            {project.title}
          </Link>
        </h3>

        <p className="mt-3 text-[14px] leading-[1.6] text-(--color-paper)/85">
          {project.description}
        </p>

        {project.tech.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
            {project.tech.map((t) => (
              <li
                key={t}
                className="mono rounded px-2 py-1 text-[10px] tracking-wider text-(--color-paper)/95"
                style={{ backgroundColor: "var(--color-teal-deep)" }}
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
