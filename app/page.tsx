import { getClient } from '@/lib/drupal-client'
import HomepageRenderer from './components/HomepageRenderer'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { checkConfiguration } from '../lib/config-check'
import { isDemoMode, handleMockQuery } from '../lib/demo-mode'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600
export const dynamic = 'force-dynamic'



export async function generateMetadata(): Promise<Metadata> {
  const title = 'Modern Headless CMS Powered by Drupal'
  const description = 'Build fast, scalable web applications with Decoupled Drupal. Combine the power of Drupal backend with Next.js frontend for the ultimate development experience.'

  return {
    title,
    description,
    keywords: ['Decoupled Drupal', 'Headless CMS', 'Next.js', 'GraphQL', 'Modern Web Development', 'React'],
    openGraph: {
      title: `${title} - Decoupled Drupal`,
      description,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - Decoupled Drupal`,
      description,
    },
  }
}

export default async function Home() {
  // Check if the app is properly configured
  const configStatus = checkConfiguration()

  if (!configStatus.isConfigured) {
    return <SetupGuide missingVars={configStatus.missingVars} />
  }

  const client = getClient()

  // Try the conventional `/` alias first (user-configured homepage).
  // Fall back to the first published Homepage node — dc_import ships
  // the Homepage node with alias `/homepage`, not `/`, so relying on
  // path resolution alone leaves a fully-imported site stuck on the
  // "Almost There" guide.
  let homepageContent = await client.getEntryByPath('/') as any
  if (!homepageContent) {
    const raw: any = await client.raw(`
      query FirstHomepage {
        nodeHomepages(first: 1) {
          nodes {
            __typename id title path
            heroTitle heroSubtitle
            heroDescription { processed }
            featuresTitle featuresSubtitle
            featuresItems { ... on ParagraphFeatureItem { id title icon description { processed } } }
            ctaTitle
            ctaDescription { processed }
            ctaPrimary ctaSecondary
          }
        }
      }
    `)
    homepageContent = raw?.nodeHomepages?.nodes?.[0] ?? raw?.data?.nodeHomepages?.nodes?.[0] ?? null
  }

  // Check if connected but no content exists - show content import guide
  if (!homepageContent) {
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }

  return <HomepageRenderer homepageContent={homepageContent} />
}
