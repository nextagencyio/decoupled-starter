import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hello World - Decoupled Drupal',
  description: 'Welcome to the Hello World page - Your first step into Decoupled Drupal',
}

export default function HelloWorldPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Decoupled Drupal
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <Link href="/hello-world" className="text-emerald-600 font-medium">
                Hello World
              </Link>
              <Link href="/test" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Test
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Animated Wave Emoji */}
          <div className="text-6xl md:text-8xl mb-8 animate-bounce">
            👋
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Hello, World!
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Welcome to your new Decoupled Drupal space. This is the beginning of something amazing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/articles"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Explore Articles
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/test"
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-gray-700 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all border border-gray-200"
            >
              View Test Page
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What&apos;s Included in Your Space
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hello World Space</h3>
              <p className="text-gray-600">
                Your starter space is ready. Created using decoupled-cli with all the essentials to get you started.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Test Page</h3>
              <p className="text-gray-600">
                A dedicated test page for validating your Decoupled Drupal setup and content import functionality.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Next.js Frontend</h3>
              <p className="text-gray-600">
                Modern Next.js 15+ app with App Router, TypeScript, and Tailwind CSS for a great developer experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-10 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Start Commands</h2>
            <div className="space-y-4 font-mono text-sm">
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <p className="text-gray-400 mb-2"># Create a new space</p>
                <code className="text-emerald-400">npx decoupled-cli spaces create hello-world --type starter</code>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <p className="text-gray-400 mb-2"># Import content</p>
                <code className="text-emerald-400">npx decoupled-cli content import --file ./content/hello-world-content.json</code>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <p className="text-gray-400 mb-2"># Run development server</p>
                <code className="text-emerald-400">npm run dev</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Space Info */}
      <section className="py-16 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-8 md:p-10 text-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">Space Created Successfully!</h3>
                <p className="text-emerald-100">Your hello-world space is active</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-emerald-100">Space ID</p>
                <p className="font-semibold text-lg">344</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-emerald-100">Machine Name</p>
                <p className="font-semibold text-lg">g7cgvns</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-emerald-100">Environment</p>
                <p className="font-semibold text-lg">nyc1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              Created with Decoupled Drupal and Next.js
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/" className="text-gray-500 hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <Link href="/hello-world" className="text-gray-500 hover:text-emerald-600 transition-colors">
                Hello World
              </Link>
              <Link href="/test" className="text-gray-500 hover:text-emerald-600 transition-colors">
                Test
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
