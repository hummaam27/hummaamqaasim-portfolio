import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Project } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function readMdxDir(subdir: string): Promise<Array<{ filename: string; data: Record<string, unknown>; content: string }>> {
  const dir = path.join(CONTENT_DIR, subdir);
  let files: string[] = [];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }
  const mdxFiles = files.filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  return Promise.all(
    mdxFiles.map(async (filename) => {
      const raw = await fs.readFile(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      return { filename, data, content };
    }),
  );
}

export async function getAllProjects(): Promise<Project[]> {
  const entries = await readMdxDir("projects");
  const projects: Project[] = entries.map(({ filename, data, content }) => ({
    title: data.title as string,
    slug: (data.slug as string) ?? filename.replace(/\.mdx?$/, ""),
    description: data.description as string,
    date: data.date as string,
    status: (data.status as Project["status"]) ?? "active",
    tech: (data.tech as string[]) ?? [],
    github: data.github as string | undefined,
    demo: data.demo as string | undefined,
    featured: (data.featured as boolean | undefined) ?? false,
    order: data.order as number | undefined,
    content,
  }));
  return projects.sort((a, b) => {
    if (a.order != null && b.order != null) return a.order - b.order;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getAllProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}
