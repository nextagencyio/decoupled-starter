// Bypass SSL verification for development Drupal instances
if (process.env.NODE_ENV === 'development') {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Set explicit workspace root to silence Turbopack warning
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'template.localhost',
        port: '8888',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.decoupled.website',
        port: '',
        pathname: '/**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    // Redirect special front page alias to the actual homepage.
    return [
      {
        source: '/homepage',
        destination: '/',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      // Proxy Drupal file assets through API route to handle SSL
      {
        source: '/sites/:path*',
        destination: '/api/proxy/sites/:path*',
      },
    ]
  },
}

module.exports = nextConfig
