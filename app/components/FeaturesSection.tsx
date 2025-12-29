import { DrupalHomepage } from '@/lib/types'
import { FEATURE_COLORS, DEFAULT_COFFEE_FEATURES } from '@/lib/constants'
import FeatureIcon from './FeatureIcon'

interface FeaturesSectionProps {
  homepageContent?: DrupalHomepage | null
}

export default function FeaturesSection({ homepageContent }: FeaturesSectionProps) {
  const hasHomepageContent = homepageContent && homepageContent.title

  // Normalize features array from possible GraphQL shapes (direct array or edges -> node).
  const rawFeatures: any = hasHomepageContent ? (homepageContent as any).featuresItems : null
  const drupalFeatures = Array.isArray(rawFeatures)
    ? rawFeatures
    : Array.isArray(rawFeatures?.edges)
      ? rawFeatures.edges.map((e: any) => e?.node).filter(Boolean)
      : []

  // Use Drupal features if available, otherwise use default coffee shop features
  const features = drupalFeatures.length > 0 ? drupalFeatures : DEFAULT_COFFEE_FEATURES

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-950 mb-4">
            {hasHomepageContent && homepageContent.featuresTitle
              ? homepageContent.featuresTitle
              : 'Why Choose Brew & Bean?'
            }
          </h2>
          <div className="text-base md:text-lg lg:text-xl text-amber-800 max-w-3xl mx-auto">
            {hasHomepageContent && homepageContent.featuresSubtitle?.processed ? (
              <div dangerouslySetInnerHTML={{ __html: homepageContent.featuresSubtitle.processed }} />
            ) : (
              <p>We&apos;re passionate about bringing you the finest coffee experience, from bean to cup.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature: any, index: number) => {
            // Cycle through colors based on index
            const iconColor = FEATURE_COLORS[index % FEATURE_COLORS.length]
            const title = feature.featureTitle
            const description = feature.featureDescription?.processed
            const iconName = feature.icon || 'coffee'

            return (
              <div key={feature.id} className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-amber-100 hover:border-amber-200">
                <FeatureIcon
                  iconName={iconName}
                  iconColor={iconColor}
                />
                <h3 className="text-lg md:text-xl font-semibold text-amber-950 mb-3">{title}</h3>
                <div className="text-sm md:text-base text-amber-700">
                  <div dangerouslySetInnerHTML={{ __html: description || '' }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
