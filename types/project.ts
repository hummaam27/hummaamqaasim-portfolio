export type ProjectStatus = "active" | "shipped" | "archived";

/** Tier of project — controls home-page treatment.
 *  "case-study" → featured large card; "project" → compact side-project card. */
export type ProjectType = "case-study" | "project";

export interface Project {
  title: string;
  slug: string;
  description: string;
  date: string;
  status: ProjectStatus;
  type: ProjectType;
  tech: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
  order?: number;
  content: string;
}
