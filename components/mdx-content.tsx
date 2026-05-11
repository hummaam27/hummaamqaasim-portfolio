import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { cn } from "@/lib/utils";
import { MedallionArchitecture } from "@/components/diagrams/medallion-architecture";
import { GoldStarSchema } from "@/components/diagrams/gold-star-schema";
import { AIDirectedLoop } from "@/components/diagrams/ai-directed-loop";
import { IdempotencyStack } from "@/components/diagrams/idempotency-stack";
import { DedupFlow } from "@/components/diagrams/dedup-flow";

const rehypePrettyCodeOptions = {
  theme: "rose-pine-dawn",
  keepBackground: false,
  defaultLang: "plaintext",
} as const;

// MDX components injected into project + writing detail pages.
const mdxComponents = {
  MedallionArchitecture,
  GoldStarSchema,
  AIDirectedLoop,
  IdempotencyStack,
  DedupFlow,
};

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
        components={mdxComponents}
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
