import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description:
    "Senior Analytics Engineer architecting production Microsoft Fabric Medallion lakehouses and governed Power BI semantic models. Founding data hire at a healthcare workforce MSP.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const grid = projects.slice(0, 2);
  const rest = projects.slice(2);

  return (
    <section className="pt-20 pb-12 sm:pt-28">
      <Container width="wide">
        <p className="eyebrow">Projects</p>
        <h1 className="mt-5 font-serif text-[36px] leading-[1.02] tracking-tight text-(--color-ink) sm:text-[44px]">
          Selected case studies.
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-[17px] leading-[1.55] text-(--color-ink-muted)">
          Production data platforms, AI-augmented BI, and the small custom
          tools that make engineering cheaper. Sanitized for client privacy
          where needed.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {grid.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        {rest.length > 0 ? (
          <div className="mt-4 grid gap-4">
            {rest.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                feature={i === 0}
              />
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
