import Link from 'next/link'
import { DrupalHomepage } from '@/lib/types'
import { Coffee } from 'lucide-react'

interface HeroSectionProps {
  homepageContent?: DrupalHomepage | null
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const hasHomepageContent = homepageContent && homepageContent.title

  return (
    <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-950 text-white relative overflow-hidden">
      {/* Decorative coffee beans pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <Coffee className="w-24 h-24" />
        </div>
        <div className="absolute top-1/4 right-20">
          <Coffee className="w-16 h-16" />
        </div>
        <div className="absolute bottom-20 left-1/4">
          <Coffee className="w-20 h-20" />
        </div>
        <div className="absolute bottom-10 right-1/3">
          <Coffee className="w-12 h-12" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 relative">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-amber-100 p-4 rounded-full">
              <Coffee className="w-12 h-12 text-amber-900" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            {hasHomepageContent && homepageContent.heroTitle ? homepageContent.heroTitle : 'Craft Coffee'}
            {hasHomepageContent && homepageContent.heroSubtitle && (
              <span className="block text-amber-300 mt-2">{homepageContent.heroSubtitle}</span>
            )}
            {!hasHomepageContent && (
              <span className="block text-amber-300 mt-2">Made with Love</span>
            )}
          </h1>
          <div className="text-base md:text-xl lg:text-2xl text-amber-100 mb-8 md:mb-10 max-w-3xl mx-auto">
            {hasHomepageContent && homepageContent.heroDescription?.processed ? (
              <div dangerouslySetInnerHTML={{ __html: homepageContent.heroDescription.processed }} />
            ) : (
              <p>Experience the perfect cup of artisan coffee, freshly roasted beans, and a cozy atmosphere that feels like home. Every sip tells a story.</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-amber-950 rounded-lg hover:bg-amber-400 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              View Our Menu
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-amber-400 text-amber-100 rounded-lg hover:bg-amber-400 hover:text-amber-950 transition-colors duration-200 font-semibold text-lg"
            >
              Our Story
            </Link>
          </div>

          {/* Opening hours badge */}
          <div className="mt-12 inline-flex items-center gap-2 bg-amber-950/50 px-6 py-3 rounded-full border border-amber-700">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-amber-200 text-sm">Open Today: 7:00 AM - 8:00 PM</span>
          </div>
        </div>
      </div>
    </section>
  )
}
