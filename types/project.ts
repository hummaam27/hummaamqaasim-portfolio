export type ProjectStatus = "active" | "shipped" | "archived";

export interface Project {
  title: string;
  slug: string;
  description: string;
  date: string;
  status: ProjectStatus;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  order?: number;
  content: string;
}
