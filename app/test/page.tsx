import { getServerApolloClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'
import { headers } from 'next/headers'
import Link from 'next/link'

const GET_TEST_ARTICLES = gql`
  query GetTestArticles {
    nodeArticles(first: 10) {
      nodes {
        id
        title
        path
        body {
          summary
        }
        created {
          timestamp
        }
      }
    }
  }
`

export default async function TestPage() {
  const headersList = await headers()
  const apolloClient = getServerApolloClient(headersList)
  
  const { data, error } = await apolloClient.query({
    query: GET_TEST_ARTICLES,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Hello World! 👋
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Your Decoupled Drupal App is Live!
            </p>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 inline-block">
              <p className="text-green-400 font-mono text-sm">
                ✓ Connected to: g1j4fq2.decoupled.website
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Connection Status
            </h2>
            {error ? (
              <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
                <p className="text-red-400">
                  ❌ Error connecting to Drupal: {error.message}
                </p>
              </div>
            ) : (
              <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
                <p className="text-green-400">
                  ✓ Successfully connected to Drupal GraphQL endpoint
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Found {data?.nodeArticles?.nodes?.length || 0} articles
                </p>
              </div>
            )}
          </div>

          {/* Articles List */}
          {data?.nodeArticles?.nodes && data.nodeArticles.nodes.length > 0 && (
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Sample Content from Drupal
              </h2>
              <div className="space-y-4">
                {data.nodeArticles.nodes.map((article: any) => (
                  <div
                    key={article.id}
                    className="bg-gray-900/50 border border-gray-600 rounded-lg p-5 hover:border-blue-500/50 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {article.title}
                    </h3>
                    {article.body?.summary && (
                      <div
                        className="text-gray-400 text-sm mb-3"
                        dangerouslySetInnerHTML={{ __html: article.body.summary }}
                      />
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-xs">
                        ID: {article.id}
                      </span>
                      {article.path && (
                        <Link
                          href={article.path}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                          View Article →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              🎉 Next Steps
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Visit{' '}
                  <Link href="/" className="text-blue-400 hover:underline">
                    the homepage
                  </Link>{' '}
                  to see the full app
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Check out{' '}
                  <Link href="/articles" className="text-blue-400 hover:underline">
                    /articles
                  </Link>{' '}
                  for a list of all articles
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Create new content in your Drupal backend at{' '}
                  <a
                    href="https://g1j4fq2.decoupled.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    g1j4fq2.decoupled.website
                  </a>
                </span>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-white font-semibold">Next.js 15</div>
              <div className="text-gray-400 text-sm">App Router</div>
            </div>
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🍃</div>
              <div className="text-white font-semibold">Drupal</div>
              <div className="text-gray-400 text-sm">Headless CMS</div>
            </div>
            <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🎨</div>
              <div className="text-white font-semibold">Tailwind CSS</div>
              <div className="text-gray-400 text-sm">Styling</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
