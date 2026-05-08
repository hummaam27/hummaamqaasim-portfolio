import { Container } from "@/components/layout/container";
import { SectionLabel } from "@/components/section-label";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/content";
import { siteConfig } from "@/site-config";

const RESUME_FILE = "/resume/hummaam-qaasim-resume.pdf";

export default async function Home() {
  const projects = await getAllProjects();
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-12 sm:pt-32">
        {/* Decorative top mark — small terracotta rule centered above the eyebrow */}
        <Container width="standard">
          <div className="mb-10 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="block h-[2px] w-8"
              style={{ backgroundColor: "var(--color-terracotta)" }}
            />
            <span className="eyebrow">
              {siteConfig.author.role} ·{" "}
              {siteConfig.author.location.split(",")[0]}, MD
            </span>
          </div>

          <h1 className="font-serif text-[44px] leading-[0.98] tracking-[-0.02em] text-(--color-ink) sm:text-[64px] lg:text-[72px]">
            {siteConfig.author.name}
          </h1>

          <p className="mt-9 max-w-[44rem] font-serif text-[18px] leading-[1.65] text-(--color-ink) sm:text-[19px]">
            {siteConfig.author.bio}
          </p>

          {/* Action bar — primary CTA is the resume PDF, then external links */}
          <div className="mt-10 flex flex-wrap gap-2.5">
            <a
              href={RESUME_FILE}
              download
              className="inline-flex h-10 items-center rounded-md bg-(--color-ink) px-5 text-[13px] font-medium text-(--color-paper) transition-colors hover:bg-(--color-terracotta-deep)"
            >
              Download résumé →
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-md border bg-transparent px-5 text-[13px] font-medium text-(--color-ink) transition-colors hover:border-(--color-rule-strong) hover:text-(--color-terracotta-deep)"
              style={{ borderColor: "var(--color-rule)" }}
            >
              GitHub
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-md border bg-transparent px-5 text-[13px] font-medium text-(--color-ink) transition-colors hover:border-(--color-rule-strong) hover:text-(--color-terracotta-deep)"
              style={{ borderColor: "var(--color-rule)" }}
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="inline-flex h-10 items-center rounded-md border bg-transparent px-5 text-[13px] font-medium text-(--color-ink) transition-colors hover:border-(--color-rule-strong) hover:text-(--color-terracotta-deep)"
              style={{ borderColor: "var(--color-rule)" }}
            >
              Email
            </a>
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <section className="pb-16">
        <Container width="wide">
          <SectionLabel>Selected work</SectionLabel>

          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
