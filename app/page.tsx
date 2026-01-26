import CoffeeShopRenderer from './components/CoffeeShopRenderer'
import UniversityRenderer from './components/UniversityRenderer'
import SetupGuide from './components/SetupGuide'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '../lib/apollo-client'
import {
  GET_COFFEE_SHOP_PAGE,
  GET_MENU_ITEMS,
  GET_UNIVERSITY_PAGE,
  GET_ACADEMIC_PROGRAMS,
  GET_FACULTY_MEMBERS,
  GET_CAMPUS_EVENTS,
  GET_UNIVERSITY_NEWS,
} from '../lib/queries'
import {
  CoffeeShopPageData,
  MenuItemsData,
  UniversityPageData,
  AcademicProgramsData,
  FacultyMembersData,
  CampusEventsData,
  UniversityNewsData,
} from '../lib/types'
import { checkConfiguration } from '../lib/config-check'

// Enable ISR with 5 minute revalidation
export const revalidate = 300

async function getCoffeeShopData(apolloClient: ReturnType<typeof getServerApolloClient>) {
  try {
    const [shopPageResult, menuItemsResult] = await Promise.all([
      apolloClient.query<CoffeeShopPageData>({
        query: GET_COFFEE_SHOP_PAGE,
        fetchPolicy: 'no-cache',
      }),
      apolloClient.query<MenuItemsData>({
        query: GET_MENU_ITEMS,
        fetchPolicy: 'no-cache',
      }),
    ])

    return {
      shopPage: shopPageResult.data?.nodeCoffeeShopPages?.nodes?.[0] || null,
      menuItems: menuItemsResult.data?.nodeMenuItems?.nodes || [],
    }
  } catch (error) {
    console.error('Error fetching coffee shop data:', error)
    return { shopPage: null, menuItems: [] }
  }
}

async function getUniversityData(apolloClient: ReturnType<typeof getServerApolloClient>) {
  try {
    const [
      universityPageResult,
      programsResult,
      facultyResult,
      eventsResult,
      newsResult,
    ] = await Promise.all([
      apolloClient.query<UniversityPageData>({
        query: GET_UNIVERSITY_PAGE,
        fetchPolicy: 'no-cache',
      }),
      apolloClient.query<AcademicProgramsData>({
        query: GET_ACADEMIC_PROGRAMS,
        fetchPolicy: 'no-cache',
      }),
      apolloClient.query<FacultyMembersData>({
        query: GET_FACULTY_MEMBERS,
        fetchPolicy: 'no-cache',
      }),
      apolloClient.query<CampusEventsData>({
        query: GET_CAMPUS_EVENTS,
        fetchPolicy: 'no-cache',
      }),
      apolloClient.query<UniversityNewsData>({
        query: GET_UNIVERSITY_NEWS,
        fetchPolicy: 'no-cache',
      }),
    ])

    return {
      universityPage: universityPageResult.data?.nodeUniversityPages?.nodes?.[0] || null,
      programs: programsResult.data?.nodeAcademicPrograms?.nodes || [],
      faculty: facultyResult.data?.nodeFacultyMembers?.nodes || [],
      events: eventsResult.data?.nodeCampusEvents?.nodes || [],
      news: newsResult.data?.nodeUniversityNews?.nodes || [],
    }
  } catch (error) {
    console.error('Error fetching university data:', error)
    return { universityPage: null, programs: [], faculty: [], events: [], news: [] }
  }
}

export async function generateMetadata(): Promise<Metadata> {
  // Default to university metadata for this branch
  const title = 'Westfield University - Shape Tomorrow'
  const description = 'At Westfield University, we transform curious minds into tomorrow\'s innovators, leaders, and changemakers. Discover world-class programs and join our vibrant academic community.'

  return {
    title,
    description,
    keywords: ['university', 'higher education', 'academics', 'research', 'campus life', 'admissions'],
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
  // Check if the app is properly configured
  const configStatus = checkConfiguration()

  if (!configStatus.isConfigured) {
    return <SetupGuide missingVars={configStatus.missingVars} />
  }

  const requestHeaders = await headers()
  const apolloClient = getServerApolloClient(requestHeaders)

  // Try to fetch university data first
  const universityData = await getUniversityData(apolloClient)

  // If we have university page data, render the university site
  if (universityData.universityPage) {
    return (
      <UniversityRenderer
        universityPage={universityData.universityPage}
        programs={universityData.programs}
        faculty={universityData.faculty}
        events={universityData.events}
        news={universityData.news}
      />
    )
  }

  // Otherwise, try coffee shop
  const { shopPage, menuItems } = await getCoffeeShopData(apolloClient)

  if (shopPage || menuItems.length > 0) {
    return <CoffeeShopRenderer shopPage={shopPage} menuItems={menuItems} />
  }

  // No content found - show setup guide with a message
  return <SetupGuide missingVars={['No content found. Import content using the dashboard or MCP tools.']} />
}
