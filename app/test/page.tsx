import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Test Page - Decoupled Drupal',
  description: 'A test page for validating the Decoupled Drupal setup',
}

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-indigo-600">
              Decoupled Drupal
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Home
              </Link>
              <Link href="/articles" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Articles
              </Link>
              <Link href="/test" className="text-indigo-600 font-medium">
                Test
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-6">
            Test Environment
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Test Page
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8">
            Content Import Test - Validating Decoupled Drupal Setup
          </p>

          {/* Content Box */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              What This Page Tests
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Next.js App Router functionality
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Static page generation
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Tailwind CSS styling
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Component routing
              </li>
            </ul>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="font-semibold text-indigo-900 mb-2">Space Created</h3>
              <p className="text-indigo-700 text-sm">
                The hello-world space has been successfully created using decoupled-cli.
              </p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6">
              <h3 className="font-semibold text-purple-900 mb-2">Content Ready</h3>
              <p className="text-purple-700 text-sm">
                Content import file is ready at /content/hello-world-content.json
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
            >
              Go to Homepage
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              View Articles
            </Link>
          </div>
        </div>

        {/* CLI Commands Reference */}
        <div className="mt-8 bg-gray-900 rounded-xl p-6 text-gray-100">
          <h3 className="text-lg font-semibold mb-4">CLI Commands Used</h3>
          <div className="space-y-3 font-mono text-sm">
            <div className="bg-gray-800 rounded p-3">
              <span className="text-green-400">$</span> npx decoupled-cli spaces create hello-world --type starter
            </div>
            <div className="bg-gray-800 rounded p-3">
              <span className="text-green-400">$</span> npx decoupled-cli content import --file ./content/hello-world-content.json
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Created with Decoupled Drupal and Next.js
          </p>
        </div>
      </footer>
    </div>
  )
}
