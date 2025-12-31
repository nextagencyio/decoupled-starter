import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hello World',
  description: 'A simple hello world page for testing the decoupled starter',
}

export default function HelloWorld() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Hello World!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Welcome to the Decoupled Drupal Starter. This is a simple test page to verify your Next.js frontend is working correctly.
        </p>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Quick Start Guide
          </h2>
          <ul className="text-left text-gray-600 space-y-3">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Next.js frontend is running
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Tailwind CSS is configured
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">→</span>
              Connect to your Decoupled Drupal backend
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">→</span>
              Start building amazing content!
            </li>
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Go to Homepage
          </a>
          <a
            href="/articles"
            className="inline-block px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            View Articles
          </a>
        </div>
      </div>
    </div>
  )
}
