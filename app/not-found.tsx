import Link from "next/link";
import { Container } from "@/components/layout/container";

export const metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <section className="pt-32 pb-24">
      <Container width="prose">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 font-serif text-[40px] leading-[1.02] tracking-tight text-(--color-ink) sm:text-[48px]">
          Page not found.
        </h1>
        <p className="mt-6 font-serif text-[17px] leading-[1.55] text-(--color-ink-muted)">
          Whatever you were looking for moved, was renamed, or never quite
          existed in the first place.
        </p>
        <p className="mt-8">
          <Link
            href="/"
            className="text-[14px] text-(--color-terracotta) underline decoration-1 underline-offset-3 hover:text-(--color-terracotta-deep)"
          >
            ← Back home
          </Link>
        </p>
      </Container>
    </section>
  );
}
