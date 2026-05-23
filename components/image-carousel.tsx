"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";

interface Slide {
  src: string;
  alt: string;
}

export function ImageCarousel({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback(
    (i: number) => {
      scrollRef.current?.children[i]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    },
    [],
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Array.from(el.children).indexOf(entry.target as Element);
            if (idx >= 0) setActive(idx);
          }
        }
      },
      { root: el, threshold: 0.6 },
    );
    Array.from(el.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, [slides.length]);

  return (
    <figure className="not-prose my-8">
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-hide rounded-lg"
          style={{ scrollbarWidth: "none" }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="w-full flex-none snap-start"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1600}
                height={900}
                className="w-full rounded-lg border border-(--color-rule)"
              />
            </div>
          ))}
        </div>

        {active > 0 && (
          <button
            onClick={() => scrollTo(active - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        {active < slides.length - 1 && (
          <button
            onClick={() => scrollTo(active + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-(--color-ink)" : "w-2 bg-(--color-ink)/25"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <figcaption className="mt-2 text-center text-sm text-(--color-ink-muted)">
        {slides[active]?.alt}
      </figcaption>
    </figure>
  );
}

const LLM_COUNCIL_SLIDES: Slide[] = [
  { src: "/images/llm-council.png", alt: "Live debate with user interjection" },
  { src: "/images/llm-council-setup.png", alt: "Debate setup with adversarial role assignment" },
  { src: "/images/llm-council-council.png", alt: "Council mode: parallel answers and peer review" },
  { src: "/images/llm-council-summary.png", alt: "Moderator's synthesized summary" },
];

export function LLMCouncilGallery() {
  return <ImageCarousel slides={LLM_COUNCIL_SLIDES} />;
}
