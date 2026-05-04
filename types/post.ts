export interface Post {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags?: string[];
  readTime?: string;
  content: string;
}
