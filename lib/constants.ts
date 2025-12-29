// Feature colors that cycle through for dynamic Drupal features
export const FEATURE_COLORS = ['amber', 'orange', 'yellow', 'brown', 'red', 'green'] as const

export const COLOR_CLASSES = {
  amber: 'bg-amber-100 text-amber-700',
  orange: 'bg-orange-100 text-orange-600',
  yellow: 'bg-yellow-100 text-yellow-700',
  brown: 'bg-amber-200 text-amber-800',
  red: 'bg-red-100 text-red-600',
  green: 'bg-green-100 text-green-600',
  blue: 'bg-blue-100 text-blue-600',
  purple: 'bg-purple-100 text-purple-600',
  indigo: 'bg-indigo-100 text-indigo-600'
} as const

// Default coffee shop features
export const DEFAULT_COFFEE_FEATURES = [
  {
    id: '1',
    featureTitle: 'Freshly Roasted',
    featureDescription: { processed: '<p>Our beans are roasted in-house daily to ensure maximum freshness and flavor in every cup you enjoy.</p>' },
    icon: 'coffee'
  },
  {
    id: '2',
    featureTitle: 'Ethically Sourced',
    featureDescription: { processed: '<p>We partner directly with farmers around the world to bring you sustainable, fair-trade coffee.</p>' },
    icon: 'globe'
  },
  {
    id: '3',
    featureTitle: 'Expert Baristas',
    featureDescription: { processed: '<p>Our skilled baristas are trained in the art of coffee making, crafting each drink with precision and care.</p>' },
    icon: 'users'
  },
  {
    id: '4',
    featureTitle: 'Cozy Atmosphere',
    featureDescription: { processed: '<p>Whether you\'re working remote or catching up with friends, our space is designed for comfort.</p>' },
    icon: 'home'
  },
  {
    id: '5',
    featureTitle: 'Fresh Pastries',
    featureDescription: { processed: '<p>Pair your coffee with our selection of freshly baked pastries, made in-house every morning.</p>' },
    icon: 'cake'
  },
  {
    id: '6',
    featureTitle: 'Free WiFi',
    featureDescription: { processed: '<p>Stay connected with our complimentary high-speed WiFi - perfect for work or browsing.</p>' },
    icon: 'wifi'
  }
]
