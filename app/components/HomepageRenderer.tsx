'use client'

import Header from './Header'
import HeroSection from './HeroSection'
import FeaturesSection from './FeaturesSection'
import CTASection from './CTASection'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'

interface HomepageContent extends DrupalHomepage {}

interface HomepageRendererProps {
  homepageContent: HomepageContent | null | undefined
}

export default function HomepageRenderer({ homepageContent }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-amber-50">
      <Header />

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <FeaturesSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Brew & Bean Coffee Shop. All rights reserved.</p>
          <p className="text-xs mt-2 text-amber-400">Crafted with love and the finest beans.</p>
        </div>
      </footer>
    </div>
  )
}
