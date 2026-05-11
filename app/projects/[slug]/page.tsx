import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { ProjectTOC } from "@/components/project-toc";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { extractToc } from "@/lib/toc";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const tocItems = extractToc(project.content);

  return (
    <article className="pt-16 pb-16 sm:pt-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_252px] xl:gap-14">
          {/* Main column — prose constrained to max-w-2xl, centered within its grid cell */}
          <div className="mx-auto w-full max-w-2xl">
            <Link
              href="/"
              className="text-[12.5px] text-(--color-ink-muted) transition-colors hover:text-(--color-terracotta)"
            >
              ← Back to home
            </Link>

            {/* Title — Fraunces display, big */}
            <h1 className="mt-12 font-display text-[40px] leading-[1.04] tracking-[-0.018em] text-(--color-ink) sm:text-[52px]">
              {project.title}
            </h1>

            {/* Lead — italic Fraunces, ink-color, large. Carries the "what is this and why does it matter" */}
            <p
              className="mt-6 font-display-italic text-[22px] leading-[1.35] tracking-[-0.005em] text-(--color-ink) sm:text-[26px]"
              style={{ fontVariationSettings: '"SOFT" 100, "opsz" 144' }}
            >
              {project.description}
            </p>

            {/* Tech ledger — small mono row, ink-faint. Reads like a footer to the header. */}
            <div className="mt-7 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px]">
              {project.tech.map((t, i) => (
                <span key={t} className="mono uppercase tracking-[0.16em] text-(--color-ink-muted)">
                  {t}
                  {i < project.tech.length - 1 ? (
                    <span className="ml-3 text-(--color-ink-faint)">·</span>
                  ) : null}
                </span>
              ))}
            </div>

            <hr
              className="mt-12 mb-2 border-0 h-px"
              style={{ backgroundColor: "var(--color-rule-strong)" }}
            />

            <MdxContent source={project.content} dropCap />

            {project.github || project.demo ? (
              <div
                className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t pt-6 text-[13px]"
                style={{ borderColor: "var(--color-rule)" }}
              >
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--color-ink) underline decoration-1 underline-offset-3 hover:text-(--color-terracotta)"
                  >
                    Source on GitHub →
                  </a>
                ) : null}
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-(--color-ink) underline decoration-1 underline-offset-3 hover:text-(--color-terracotta)"
                  >
                    Live demo →
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* TOC sidebar — visible on xl+ only */}
          <aside className="hidden xl:block">
            <div className="sticky top-28">
              <ProjectTOC items={tocItems} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
