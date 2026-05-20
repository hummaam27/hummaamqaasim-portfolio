import Image from "next/image";
import { Container } from "@/components/layout/container";
import { SectionLabel } from "@/components/section-label";
import { ProjectCard } from "@/components/project-card";
import { SideProjectCard } from "@/components/side-project-card";
import { getAllProjects } from "@/lib/content";
import { siteConfig } from "@/site-config";

const RESUME_FILE = "/resume/hummaam-qaasim-resume.pdf";

export default async function Home() {
  const projects = await getAllProjects();
  const caseStudies = projects.filter(
    (p) => p.featured && p.type === "case-study",
  );
  const sideProjects = projects.filter(
    (p) => p.featured && p.type === "project",
  );

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 pb-8 sm:pt-28 lg:pt-32">
        <Container width="wide">
          {/* Masthead */}
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="block h-[3px] w-10"
              style={{ backgroundColor: "var(--color-terracotta)" }}
            />
            <span className="eyebrow">
              {siteConfig.author.role} · Annapolis, Maryland
            </span>
          </div>

          {/* Name — Fraunces display, oversized and tight */}
          <h1 className="mt-7 font-display text-[52px] leading-[0.9] tracking-[-0.04em] text-(--color-espresso) sm:text-[78px] lg:text-[94px]">
            {siteConfig.author.name}
          </h1>

          {/* Portrait + bio + actions — two-column on lg, stacked on mobile */}
          <div className="mt-14 grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-12">
            {/* Profile portrait — large round, terracotta ring, soft shadow */}
            <div className="relative mx-auto h-[180px] w-[180px] shrink-0 sm:h-[200px] sm:w-[200px] lg:mx-0">
              <span
                aria-hidden
                className="absolute -inset-2 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(185,90,58,0.18), transparent 70%)",
                }}
              />
              <div
                className="relative h-full w-full overflow-hidden rounded-full ring-[3px] ring-(--color-paper) shadow-[0_18px_40px_-18px_rgba(45,38,32,0.45),0_4px_10px_-6px_rgba(45,38,32,0.18)]"
                style={{
                  outline: "1px solid var(--color-rule-strong)",
                  outlineOffset: "3px",
                }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt={`${siteConfig.author.name} portrait`}
                  fill
                  sizes="(min-width: 1024px) 200px, 180px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-[17px] leading-[1.6] text-(--color-ink) sm:text-[18px]">
                {siteConfig.author.bio}
              </p>

              {/* Action bar — primary CTA is the resume PDF, then external links */}
              <div className="mt-8 flex flex-wrap gap-2.5">
            <a
              href={RESUME_FILE}
              download
              className="group inline-flex h-10 items-center gap-1.5 rounded-md bg-(--color-terracotta) px-5 text-[13px] font-medium text-(--color-paper) shadow-[0_2px_8px_-3px_rgba(185,90,58,0.45)] transition-all duration-200 hover:bg-(--color-terracotta-deep) hover:shadow-[0_4px_14px_-4px_rgba(159,69,40,0.55)]"
            >
              Download resume
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-md border bg-(--color-paper-2) px-5 text-[13px] font-medium text-(--color-ink) transition-colors hover:border-(--color-terracotta) hover:bg-(--color-paper-3) hover:text-(--color-terracotta-deep)"
              style={{ borderColor: "var(--color-rule-strong)" }}
            >
              GitHub
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-md border bg-(--color-paper-2) px-5 text-[13px] font-medium text-(--color-ink) transition-colors hover:border-(--color-terracotta) hover:bg-(--color-paper-3) hover:text-(--color-terracotta-deep)"
              style={{ borderColor: "var(--color-rule-strong)" }}
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="inline-flex h-10 items-center rounded-md border bg-(--color-paper-2) px-5 text-[13px] font-medium text-(--color-ink) transition-colors hover:border-(--color-terracotta) hover:bg-(--color-paper-3) hover:text-(--color-terracotta-deep)"
              style={{ borderColor: "var(--color-rule-strong)" }}
            >
              Email
            </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Full-bleed terracotta divider — hard break between hero and work */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-(--color-terracotta)"
      />

      {/* Selected work — featured case studies */}
      <section>
        <Container width="wide">
          <SectionLabel>Selected work</SectionLabel>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {caseStudies.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i + 1} />
            ))}
          </div>
        </Container>
      </section>

      {/* Side projects — full tonal flip: dark espresso zone, cream text,
          olive accents. Flows straight into the espresso footer. */}
      <section className="mt-24 bg-(--color-espresso) pt-20 pb-24">
        <Container width="standard">
          <div className="mb-8 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="block h-[3px] w-10"
              style={{ backgroundColor: "var(--color-olive)" }}
            />
            <p className="mono text-[11px] tracking-[0.18em] text-(--color-olive) uppercase">
              Side projects
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {sideProjects.map((p) => (
              <SideProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
