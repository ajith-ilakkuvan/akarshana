export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface RelatedLink {
  label: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO date
  category: string;
  sections: BlogSection[];
  relatedLinks: RelatedLink[];
}
