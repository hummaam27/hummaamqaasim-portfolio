import type { ComponentType } from "react";
import Link from "next/link";
import { MedallionMini } from "@/components/diagrams/medallion-mini";
import { AILoopMini } from "@/components/diagrams/ai-loop-mini";
import type { Project } from "@/types";

/** Mini diagram banners keyed by project slug — echoes the in-article
 *  diagrams at card scale so the featured cards carry a visual. */
const BANNERS: Record<string, ComponentType> = {
  "medallion-lakehouse": MedallionMini,
  imanic: AILoopMini,
};

/** Featured case-study card — terracotta block, cream text, with a cream
 *  diagram banner on top. Mirrors the side-project card's banner-then-body
 *  layout so the two card types read as one family. */
export function ProjectCard({ project }: { project: Project }) {
  const Banner = BANNERS[project.slug];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-(--color-terracotta) transition-all duration-200 hover:-translate-y-1 hover:bg-(--color-terracotta-deep) hover:shadow-[0_18px_44px_-14px_rgba(159,69,40,0.55)]"
    >
      {/* Diagram banner — cream panel inset inside the terracotta so the
          card reads as one framed unit, not a diagram floating on the page */}
      {Banner ? (
        <div className="p-3 pb-0">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-(--color-paper-2)">
            <Banner />
          </div>
        </div>
      ) : null}

      <div className="relative flex flex-1 flex-col px-7 pt-5 pb-7">
        {/* Hover arrow */}
        <span
          aria-hidden="true"
          className="absolute top-7 right-7 text-[16px] text-(--color-paper) opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
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
      </div>
    </Link>
  );
}
