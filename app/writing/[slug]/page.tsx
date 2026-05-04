import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { MdxContent } from "@/components/mdx-content";
import { siteConfig } from "@/site-config";
import { getAllPosts, getPostBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="pt-16 pb-16 sm:pt-24">
      <Container width="prose">
        <Link
          href="/writing"
          className="text-[12.5px] text-(--color-ink-muted) transition-colors hover:text-(--color-terracotta)"
        >
          ← All writing
        </Link>

        <p className="eyebrow mt-10">
          Writing
          {post.tags && post.tags.length > 0 ? (
            <span className="text-(--color-ink-faint)">
              {" · "}
              {post.tags.join(" · ")}
            </span>
          ) : null}
        </p>
        <h1 className="mt-4 font-serif text-[36px] leading-[1.05] tracking-tight text-(--color-ink) sm:text-[40px]">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 text-[12px]">
          <span className="mono text-(--color-ink-faint)">
            {formatDate(post.date)}
          </span>
          {post.readTime ? (
            <>
              <span className="text-(--color-ink-faint)">·</span>
              <span className="text-(--color-ink-muted)">{post.readTime}</span>
            </>
          ) : null}
        </div>

        <hr
          className="mt-10 mb-10 border-0 h-px"
          style={{ backgroundColor: "var(--color-rule)" }}
        />

        <MdxContent source={post.content} dropCap />

        <div
          className="mt-16 border-t pt-6 font-serif text-[15px] italic text-(--color-ink-muted)"
          style={{ borderColor: "var(--color-rule)" }}
        >
          Have thoughts?{" "}
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="text-(--color-terracotta) underline underline-offset-2 hover:text-(--color-terracotta-deep)"
          >
            Email
          </a>{" "}
          or reach me on{" "}
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-terracotta) underline underline-offset-2 hover:text-(--color-terracotta-deep)"
          >
            LinkedIn
          </a>
          .
        </div>
      </Container>
    </article>
  );
}
