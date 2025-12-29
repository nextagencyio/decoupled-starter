import './globals.css'
import ApolloProvider from './components/providers/ApolloProvider'
import { Viewport, type Metadata } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

function getSiteUrl(): string {
  // Prefer an explicit site URL when provided.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')

  // Vercel environment provides VERCEL_URL without protocol.
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  // Fallback to localhost using detected PORT or default 3000.
  const port = process.env.PORT || '3000'
  const host = process.env.HOST || 'localhost'
  return `http://${host}:${port}`
}

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: 'Brew & Bean Coffee Shop',
    template: '%s | Brew & Bean'
  },
  description: 'Experience the perfect cup of artisan coffee at Brew & Bean. Freshly roasted beans, expert baristas, and a cozy atmosphere in the heart of downtown.',
  keywords: ['Coffee Shop', 'Artisan Coffee', 'Fresh Roasted', 'Cafe', 'Espresso', 'Pastries', 'Downtown'],
  authors: [{ name: 'Brew & Bean Coffee Shop' }],
  creator: 'Brew & Bean',
  publisher: 'Brew & Bean',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' }
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-amber-50">
        <ApolloProvider>
          {children}
        </ApolloProvider>
      </body>
    </html>
  )
}
