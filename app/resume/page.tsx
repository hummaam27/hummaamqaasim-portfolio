import { Container } from "@/components/layout/container";
import { siteConfig } from "@/site-config";

const RESUME_FILE = "/resume/hummaam-qaasim-resume.pdf";

export const metadata = {
  title: "Resume",
  description: `Resume — ${siteConfig.author.name}, ${siteConfig.author.role}.`,
};

export default function ResumePage() {
  return (
    <section className="pt-20 pb-16 sm:pt-28">
      <Container width="prose">
        <p className="eyebrow">Resume</p>
        <h1 className="mt-5 font-serif text-[36px] leading-[1.02] tracking-tight text-(--color-ink) sm:text-[44px]">
          Resume.
        </h1>
        <p className="mt-6 font-serif text-[17px] leading-[1.55] text-(--color-ink)">
          Latest version, kept in sync with the canonical{" "}
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--color-terracotta) underline underline-offset-2 hover:text-(--color-terracotta-deep)"
          >
            LinkedIn profile
          </a>
          . If you need a tailored version for a specific role, just{" "}
          <a
            href={`mailto:${siteConfig.author.email}`}
            className="text-(--color-terracotta) underline underline-offset-2 hover:text-(--color-terracotta-deep)"
          >
            ask
          </a>
          .
        </p>

        <div className="mt-10">
          <a
            href={RESUME_FILE}
            download
            className="inline-flex h-10 items-center rounded-md bg-(--color-ink) px-5 text-[13px] font-medium text-(--color-paper) transition-colors hover:bg-[#1f1a16]"
          >
            Download PDF →
          </a>
        </div>

        <p className="mt-6 font-serif text-[14px] italic text-(--color-ink-muted)">
          PDF placeholder — current resume PDF will replace this file shortly.
          Embed view skipped intentionally; download stays cleanest across
          browsers.
        </p>

        <div
          className="mt-16 border-t pt-8"
          style={{ borderColor: "var(--color-rule)" }}
        >
          <p className="eyebrow">Highlights</p>
          <ul className="mt-5 space-y-2.5 font-serif text-[16px] leading-[1.55] text-(--color-ink)">
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.7em] block h-[6px] w-[6px] shrink-0"
                style={{ backgroundColor: "var(--color-terracotta)" }}
              />
              <span>
                Founding data hire at a healthcare workforce MSP — architected
                a four-source Medallion lakehouse in Microsoft Fabric.
              </span>
            </li>
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.7em] block h-[6px] w-[6px] shrink-0"
                style={{ backgroundColor: "var(--color-terracotta)" }}
              />
              <span>
                Stack: Microsoft Fabric, Spark SQL, PySpark, Delta Lake, Power
                BI, DAX, Python, T-SQL, Azure DevOps.
              </span>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
