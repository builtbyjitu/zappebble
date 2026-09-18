export type ToolCategory =
  | 'image'
  | 'developer'
  | 'text'
  | 'pdf'
  | 'scanner-generator'
  | 'color';

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolSeo {
  title: string;
  description: string;
  canonicalPath: string;
  keywords: string[];
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ToolCategory;
  categoryLabel: string;
  iconName: string;
  path: string;
  popular?: boolean;
  extensionSupported: boolean;
  websiteSupported: boolean;
  seo: ToolSeo;
  howItWorks: ToolStep[];
  faq: ToolFaq[];
  relatedToolSlugs: string[];
  privacyNote: string;
}
