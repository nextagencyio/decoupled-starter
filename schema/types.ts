// Auto-generated TypeScript types from Drupal GraphQL schema.
// Run `decoupled-cli schema sync` to regenerate.

export interface NodeArticle {
  id: string;
  body: { value: string; summary?: string };
  image: { url: string; alt: string; width: number; height: number };
  path: string;
  tags: any[];
  title: string;
}

export interface NodeHomepage {
  id: string;
  ctaDescription: { value: string };
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTitle: string;
  featuresItems: any[];
  featuresSubtitle: string;
  featuresTitle: string;
  heroDescription: { value: string };
  heroSubtitle: string;
  heroTitle: string;
  path: string;
  title: string;
}

export interface ParagraphFeatureItem {
  id: string;
  description: { value: string };
  icon: string;
  title: string;
}

export interface NodePage {
  id: string;
  body: { value: string; summary?: string };
  path: string;
  title: string;
}
