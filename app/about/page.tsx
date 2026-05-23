import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionLabel } from "@/components/section-label";
import { siteConfig } from "@/site-config";

export const metadata = {
  title: "About",
  description: `About ${siteConfig.author.name} — ${siteConfig.author.role} at ${siteConfig.author.company}.`,
};

const currently = [
  "Architecting a six-source Medallion architecture on Microsoft Fabric",
  "Imanic — Islamic edtech platform launching mid-2026",
  "DP-700 certification (in progress)",
];

const stack: Array<[string, string]> = [
  [
    "DATA ENGINEERING",
    "Microsoft Fabric, Spark SQL, PySpark, Delta Lake, Power BI, Azure DevOps",
  ],
  ["LANGUAGES", "Python, SQL, TypeScript"],
  ["AI / ML", "Claude, semantic models"],
  ["FRONTEND", "Next.js, React, Tailwind, Directus"],
];

export default function AboutPage() {
  return (
    <section className="pt-20 pb-12 sm:pt-28">
      <Container width="prose">
        <p className="eyebrow">About</p>
        <h1 className="mt-5 font-serif text-[36px] leading-[1.05] tracking-tight text-(--color-ink) sm:text-[44px]">
          Hi, I&apos;m Hummaam.
        </h1>

        {/* TODO: Hummaam to revise — placeholder bio paragraphs */}
        <div className="mt-8 space-y-7 font-serif text-[17px] leading-[1.65] text-(--color-ink)">
          <p>
            I&apos;m the founding data hire at a healthcare workforce MSP,
            where I&apos;m architecting a Medallion architecture on
            Microsoft Fabric, unifying six workforce platforms into a single
            canonical model behind a governed semantic layer. The work that
            excites me sits at the intersection of cloud, data, and AI:
            building infrastructure that makes good decisions cheap.
          </p>
          <p>
            Outside of engineering, I serve as Imam at the Islamic Society of
            Annapolis. Ten years of teaching teenagers about Islamic theology
            taught me how to translate dense, abstract material into something
            a fifteen-year-old can actually use — that&apos;s the skill I bring
            to data modeling and to{" "}
            <a
              href="https://imanic.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-(--color-terracotta) underline underline-offset-2 hover:text-(--color-terracotta-deep)"
            >
              Imanic
            </a>
            , the Islamic edtech platform I&apos;m building for the next
            generation of Muslim families.
          </p>
        </div>

        <SectionLabel>Currently</SectionLabel>
        <ul className="space-y-2.5 font-serif text-[16px] leading-[1.55] text-(--color-ink)">
          {currently.map((line) => (
            <li key={line} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.7em] block h-[6px] w-[6px] shrink-0"
                style={{ backgroundColor: "var(--color-terracotta)" }}
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <SectionLabel>Stack</SectionLabel>
        <dl className="space-y-3.5">
          {stack.map(([label, items]) => (
            <div
              key={label}
              className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4"
            >
              <dt className="eyebrow shrink-0 sm:w-[170px]">{label}</dt>
              <dd className="font-serif text-[15.5px] leading-[1.5] text-(--color-ink)">
                {items}
              </dd>
            </div>
          ))}
        </dl>

        <SectionLabel>Reach out</SectionLabel>
        <p className="font-serif text-[16px] leading-[1.6] text-(--color-ink)">
          <Link
            href={siteConfig.links.linkedin}
            className="text-(--color-ink) underline decoration-1 underline-offset-3 hover:text-(--color-terracotta)"
          >
            LinkedIn
          </Link>
          <span className="mx-2 text-(--color-ink-faint)">·</span>
          <Link
            href={siteConfig.links.github}
            className="text-(--color-ink) underline decoration-1 underline-offset-3 hover:text-(--color-terracotta)"
          >
            GitHub
          </Link>
          <span className="mx-2 text-(--color-ink-faint)">·</span>
          <Link
            href={`mailto:${siteConfig.author.email}`}
            className="text-(--color-ink) underline decoration-1 underline-offset-3 hover:text-(--color-terracotta)"
          >
            Email
          </Link>
        </p>
      </Container>
    </section>
  );
}
