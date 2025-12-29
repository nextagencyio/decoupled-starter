import HomepageRenderer from './components/HomepageRenderer'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '../lib/apollo-client'
import { GET_HOMEPAGE_DATA } from '../lib/queries'
import { HomepageData } from '../lib/types'
import { checkConfiguration } from '../lib/config-check'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600


async function getHomepageData(apolloClient: ReturnType<typeof getServerApolloClient>): Promise<HomepageData | null> {
  try {
    const { data } = await apolloClient.query<HomepageData>({
      query: GET_HOMEPAGE_DATA,
      fetchPolicy: 'cache-first', // Use cache for ISR
    })
    return data
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Brew & Bean Coffee Shop - Craft Coffee Made with Love'
  const description = 'Experience the perfect cup of artisan coffee at Brew & Bean. Freshly roasted beans, expert baristas, cozy atmosphere, and fresh pastries in the heart of downtown.'

  return {
    title,
    description,
    keywords: ['Coffee Shop', 'Artisan Coffee', 'Espresso', 'Cafe', 'Fresh Roasted', 'Pastries', 'Downtown Coffee'],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Home() {
  // Check if the app is properly configured with Drupal backend
  const configStatus = checkConfiguration()

  // If configured, try to fetch content from Drupal
  let homepageContent = null
  if (configStatus.isConfigured) {
    try {
      const requestHeaders = await headers()
      const apolloClient = getServerApolloClient(requestHeaders)
      const data = await getHomepageData(apolloClient)
      homepageContent = data?.nodeHomepages?.nodes?.[0]
    } catch (error) {
      console.error('Failed to fetch from Drupal, using default content:', error)
    }
  }

  // Always render the homepage (with Drupal content if available, default content otherwise)
  return <HomepageRenderer homepageContent={homepageContent} />
}
