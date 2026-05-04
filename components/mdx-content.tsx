import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { cn } from "@/lib/utils";

const rehypePrettyCodeOptions = {
  theme: "rose-pine-dawn",
  keepBackground: false,
  defaultLang: "plaintext",
} as const;

export function MdxContent({
  source,
  dropCap = false,
  className,
}: {
  source: string;
  dropCap?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "editorial-prose",
        dropCap && "has-dropcap",
        className,
      )}
    >
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
          },
        }}
      />
    </div>
  );
}
