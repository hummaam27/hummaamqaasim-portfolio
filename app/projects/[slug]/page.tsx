import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { MdxContent } from "@/components/mdx-content";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

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

const statusLabel: Record<string, string> = {
  active: "Active",
  shipped: "Shipped",
  archived: "Archived",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const year = new Date(project.date).getFullYear();

  return (
    <article className="pt-16 pb-16 sm:pt-24">
      <Container width="prose">
        <Link
          href="/projects"
          className="text-[12.5px] text-(--color-ink-muted) transition-colors hover:text-(--color-terracotta)"
        >
          ← All projects
        </Link>

        <p className="eyebrow mt-10">Project</p>
        <h1 className="mt-4 font-serif text-[36px] leading-[1.05] tracking-tight text-(--color-ink) sm:text-[40px]">
          {project.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[12px]">
          <span className="mono text-(--color-terracotta)">{year}</span>
          <span className="text-(--color-ink-faint)">·</span>
          <span className="text-(--color-ink-muted)">
            {statusLabel[project.status] ?? project.status}
          </span>
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-(--color-ink-faint)"
              aria-hidden="true"
            >
              ·
              <span className="ml-3 text-(--color-ink-muted)">{t}</span>
            </span>
          ))}
        </div>

        <p className="mt-6 font-serif text-[19px] leading-[1.5] text-(--color-ink-muted)">
          {project.description}
        </p>

        <hr
          className="mt-10 mb-10 border-0 h-px"
          style={{ backgroundColor: "var(--color-rule)" }}
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
      </Container>
    </article>
  );
}
