import Header from './components/Header'
import SetupGuide from './components/SetupGuide'
import Link from 'next/link'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerApolloClient } from '../lib/apollo-client'
import { GET_HELLO_WORLD_CONTENT } from '../lib/queries'
import { HelloWorldData, DrupalHelloWorld } from '../lib/types'
import { checkConfiguration } from '../lib/config-check'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600


async function getHelloWorldContent(apolloClient: ReturnType<typeof getServerApolloClient>): Promise<HelloWorldData | null> {
  try {
    const { data } = await apolloClient.query<HelloWorldData>({
      query: GET_HELLO_WORLD_CONTENT,
      fetchPolicy: 'cache-first',
    })
    return data
  } catch (error) {
    console.error('Error fetching hello world content:', error)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Hello World - Decoupled Drupal'
  const description = 'Welcome to the Hello World space powered by Decoupled Drupal and Next.js.'

  return {
    title,
    description,
    keywords: ['Decoupled Drupal', 'Headless CMS', 'Next.js', 'GraphQL', 'Hello World'],
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

function HelloWorldCard({ item }: { item: DrupalHelloWorld }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-sm text-purple-600 font-medium mb-3">
            {item.subtitle}
          </p>
        )}
        {item.body?.processed && (
          <div
            className="text-gray-600 mb-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: item.body.processed }}
          />
        )}
        {item.path && (
          <Link
            href={item.path}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm"
          >
            Read more
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}

export default async function Home() {
  // Check if the app is properly configured
  const configStatus = checkConfiguration()

  if (!configStatus.isConfigured) {
    return <SetupGuide missingVars={configStatus.missingVars} />
  }

  const requestHeaders = await headers()
  const apolloClient = getServerApolloClient(requestHeaders)
  const data = await getHelloWorldContent(apolloClient)
  const helloWorldItems = data?.nodeHelloWorlds?.nodes || []

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Hello World! 👋
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Welcome to your Decoupled Drupal space. This content is dynamically pulled from your Drupal backend via GraphQL.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hello World Content
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These are the content items from your hello_world content type, fetched in real-time from the Drupal GraphQL API.
          </p>
        </div>

        {helloWorldItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helloWorldItems.map((item) => (
              <HelloWorldCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Hello World content found
            </h3>
            <p className="text-gray-600">
              Create some content in your Drupal backend to see it displayed here.
            </p>
          </div>
        )}

        {/* Tech Stack Info */}
        <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Powered By
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">⚡</span>
              <span className="font-medium text-gray-700">Next.js 15</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">💧</span>
              <span className="font-medium text-gray-700">Drupal 11</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">📊</span>
              <span className="font-medium text-gray-700">GraphQL</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🎨</span>
              <span className="font-medium text-gray-700">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Built with Decoupled Drupal Starter
          </p>
        </div>
      </footer>
    </div>
  )
}
