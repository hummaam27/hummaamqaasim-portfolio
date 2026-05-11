import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { cn } from "@/lib/utils";
import { MedallionArchitecture } from "@/components/diagrams/medallion-architecture";
import { GoldStarSchema } from "@/components/diagrams/gold-star-schema";
import { ReconciliationMatrix } from "@/components/diagrams/reconciliation-matrix";
import { AIDirectedLoop } from "@/components/diagrams/ai-directed-loop";
import { IdempotencyStack } from "@/components/diagrams/idempotency-stack";
import { DedupFlow } from "@/components/diagrams/dedup-flow";
import { AtAGlance, Headline, Row } from "@/components/at-a-glance";

const rehypePrettyCodeOptions = {
  theme: "rose-pine-dawn",
  keepBackground: false,
  defaultLang: "plaintext",
} as const;

// MDX components injected into project + writing detail pages.
const mdxComponents = {
  MedallionArchitecture,
  GoldStarSchema,
  ReconciliationMatrix,
  AIDirectedLoop,
  IdempotencyStack,
  DedupFlow,
  AtAGlance,
  Headline,
  Row,
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
            rehypePlugins: [
              rehypeSlug,
              [rehypePrettyCode, rehypePrettyCodeOptions],
            ],
          },
        }}
      />
    </div>
  );
}
