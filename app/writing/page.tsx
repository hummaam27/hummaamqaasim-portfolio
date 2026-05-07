import { Container } from "@/components/layout/container";
import { PostRow } from "@/components/post-row";
import { getAllPosts } from "@/lib/content";

export const metadata = {
  title: "Writing",
  description:
    "Senior Analytics Engineer architecting production Microsoft Fabric Medallion lakehouses and governed Power BI semantic models. Founding data hire at a healthcare workforce MSP.",
};

export default async function WritingPage() {
  const posts = await getAllPosts();

  return (
    <section className="pt-20 pb-12 sm:pt-28">
      <Container width="standard">
        <p className="eyebrow">Writing</p>
        <h1 className="mt-5 font-serif text-[36px] leading-[1.02] tracking-tight text-(--color-ink) sm:text-[44px]">
          Notes from the build.
        </h1>
        <p className="mt-5 max-w-2xl font-serif text-[17px] leading-[1.55] text-(--color-ink-muted)">
          Notes on data engineering, Microsoft Fabric, and what it means to
          build production systems in the age of AI-augmented development.
        </p>

        <div className="mt-12">
          {posts.length === 0 ? (
            <p className="font-serif text-[17px] italic text-(--color-ink-muted)">
              First writeups landing May 2026. Sign up for{" "}
              <a
                href="/contact"
                className="text-(--color-terracotta) underline underline-offset-2"
              >
                a heads-up
              </a>{" "}
              if you want to know when they go live.
            </p>
          ) : (
            <ul
              className="divide-y"
              style={{ borderColor: "var(--color-rule)" }}
            >
              {posts.map((post) => (
                <li key={post.slug}>
                  <PostRow post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
