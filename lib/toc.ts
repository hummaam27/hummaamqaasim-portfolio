/**
 * Lightweight TOC extractor — pulls H2 headings out of an MDX source string
 * and produces { id, text } pairs. The `id` matches what rehype-slug
 * generates so anchor scrolling works automatically.
 *
 * Skips H2s that appear inside fenced code blocks.
 */

export interface TocItem {
  id: string;
  text: string;
}

function slugify(text: string): string {
  // Match rehype-slug/github-slugger semantics: strip non-word non-space
  // non-hyphen chars, then convert each whitespace to a hyphen (do NOT
  // collapse — adjacent spaces produce adjacent hyphens, e.g. "A & B"
  // becomes "a--b").
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractToc(source: string): TocItem[] {
  const lines = source.split("\n");
  const items: TocItem[] = [];
  let inCodeFence = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const match = line.match(/^##\s+(.+)$/);
    if (match) {
      const text = match[1].trim();
      items.push({ id: slugify(text), text });
    }
  }
  return items;
}
