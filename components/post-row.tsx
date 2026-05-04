import Link from "next/link";
import type { Post } from "@/types";

function formatDate(date: string) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d
    .toLocaleDateString("en-US", { month: "short", day: "2-digit" })
    .toUpperCase();
}

export function PostRow({ post }: { post: Post }) {
  return (
    <Link
      href={`/writing/${post.slug}`}
      className="group grid grid-cols-[60px_1fr_auto] items-baseline gap-4 py-3"
    >
      <span className="mono text-[11px] text-(--color-ink-faint)">
        {formatDate(post.date)}
      </span>
      <div>
        <h3 className="font-serif text-[17px] leading-tight tracking-tight text-(--color-ink) transition-colors group-hover:text-(--color-terracotta)">
          {post.title}
        </h3>
        {post.description ? (
          <p className="mt-1 text-[13px] leading-snug text-(--color-ink-muted)">
            {post.description}
          </p>
        ) : null}
      </div>
      <span className="text-(--color-terracotta) opacity-0 transition-opacity group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}
