import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionLabel } from "@/components/section-label";
import { ProjectCard } from "@/components/project-card";
import { PostRow } from "@/components/post-row";
import { getAllProjects, getAllPosts } from "@/lib/content";
import { siteConfig } from "@/site-config";

export default async function Home() {
  const [projects, posts] = await Promise.all([
    getAllProjects(),
    getAllPosts(),
  ]);

  const featured = projects.filter((p) => p.featured);
  const grid = featured.slice(0, 2);
  const feature = featured[2];

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-4 sm:pt-28">
        <Container width="standard">
          <p className="eyebrow">
            Data Engineer · {siteConfig.author.location.split(",")[0]}, MD
          </p>
          <h1 className="mt-5 font-serif text-[36px] leading-[1.02] tracking-tight text-(--color-ink) sm:text-[46px]">
            {siteConfig.author.name}
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-[17px] leading-[1.55] text-(--color-ink)">
            {siteConfig.author.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center rounded-md bg-(--color-ink) px-4 text-[13px] font-medium text-(--color-paper) transition-colors hover:bg-[#1f1a16]"
            >
              GitHub →
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center rounded-md border bg-transparent px-4 text-[13px] font-medium text-(--color-ink) transition-colors hover:border-(--color-rule-strong)"
              style={{ borderColor: "var(--color-rule)" }}
            >
              LinkedIn
            </a>
            <Link
              href="/resume"
              className="inline-flex h-9 items-center rounded-md border bg-transparent px-4 text-[13px] font-medium text-(--color-ink) transition-colors hover:border-(--color-rule-strong)"
              style={{ borderColor: "var(--color-rule)" }}
            >
              Resume
            </Link>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="inline-flex h-9 items-center rounded-md border bg-transparent px-4 text-[13px] font-medium text-(--color-ink) transition-colors hover:border-(--color-rule-strong)"
              style={{ borderColor: "var(--color-rule)" }}
            >
              Email
            </a>
          </div>
        </Container>
      </section>

      {/* Selected work */}
      <section>
        <Container width="wide">
          <SectionLabel>Selected work</SectionLabel>

          <div className="grid gap-4 sm:grid-cols-2">
            {grid.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>

          {feature ? (
            <div className="mt-4">
              <ProjectCard project={feature} feature />
            </div>
          ) : null}
        </Container>
      </section>

      {/* Recent writing */}
      <section className="pb-12">
        <Container width="standard">
          <SectionLabel>Recent writing</SectionLabel>

          {posts.length === 0 ? (
            <p className="font-serif text-[15px] italic text-(--color-ink-muted)">
              First writeups landing May 2026.
            </p>
          ) : (
            <ul
              className="divide-y"
              style={{ borderColor: "var(--color-rule)" }}
            >
              {posts.slice(0, 5).map((post) => (
                <li key={post.slug}>
                  <PostRow post={post} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
