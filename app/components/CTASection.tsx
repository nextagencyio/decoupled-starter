import Link from 'next/link'
import { ArrowRight, MapPin, Phone, Clock } from 'lucide-react'
import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent?: DrupalHomepage | null
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const hasHomepageContent = homepageContent && homepageContent.title

  return (
    <section className="bg-amber-950 text-white py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {hasHomepageContent && homepageContent.ctaTitle
              ? homepageContent.ctaTitle
              : 'Ready for Your Perfect Cup?'
            }
          </h2>
          <div className="text-base md:text-lg lg:text-xl text-amber-200 mb-6 md:mb-8 max-w-2xl mx-auto">
            {hasHomepageContent && homepageContent.ctaDescription?.processed ? (
              <div dangerouslySetInnerHTML={{ __html: homepageContent.ctaDescription.processed }} />
            ) : (
              <p>Visit us today or order online for pickup. Your morning ritual starts here.</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {hasHomepageContent && homepageContent.ctaPrimary ? (
              <Link
                href={homepageContent.ctaPrimary.url}
                className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-amber-950 rounded-lg hover:bg-amber-400 transition-colors duration-200 font-semibold text-lg"
              >
                {homepageContent.ctaPrimary.title}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            ) : (
              <Link
                href="/menu"
                className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-amber-950 rounded-lg hover:bg-amber-400 transition-colors duration-200 font-semibold text-lg"
              >
                Order Online
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            )}
            {hasHomepageContent && homepageContent.ctaSecondary ? (
              <Link
                href={homepageContent.ctaSecondary.url}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-amber-400 text-amber-100 rounded-lg hover:bg-amber-900 hover:border-amber-300 transition-colors duration-200 font-semibold text-lg"
              >
                {homepageContent.ctaSecondary.title}
              </Link>
            ) : (
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-amber-400 text-amber-100 rounded-lg hover:bg-amber-900 hover:border-amber-300 transition-colors duration-200 font-semibold text-lg"
              >
                Find Us
              </Link>
            )}
          </div>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-amber-800">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="bg-amber-800 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <p className="font-semibold text-amber-100">Visit Us</p>
              <p className="text-amber-300 text-sm">123 Coffee Lane, Downtown</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="bg-amber-800 p-3 rounded-full">
              <Phone className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <p className="font-semibold text-amber-100">Call Us</p>
              <p className="text-amber-300 text-sm">(555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-4">
            <div className="bg-amber-800 p-3 rounded-full">
              <Clock className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <p className="font-semibold text-amber-100">Hours</p>
              <p className="text-amber-300 text-sm">Mon-Sun: 7AM - 8PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
