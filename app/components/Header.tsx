'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'About', href: '/about' }
]

export default function Header() {
  const pathname = usePathname()

  const getActiveTab = () => {
    if (pathname === '/') return 'Home'
    if (pathname === '/articles') return 'Articles'
    if (pathname === '/about') return 'About'
    return null
  }

  const activeTab = getActiveTab()

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <div className="flex-shrink-0">
                <Image src="/logo.svg" alt="Decoupled Starter" width={32} height={32} className="w-8 h-8" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Decoupled Starter
              </span>
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === item.name
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side - Contact button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile Navigation - shown below on smaller screens */}
        <div className="md:hidden border-t border-gray-200">
          <div className="flex justify-between items-center py-2">
            <div className="flex space-x-4 overflow-x-auto">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'whitespace-nowrap py-2 px-3 rounded-md text-sm font-medium transition-colors',
                    activeTab === item.name
                      ? 'bg-purple-100 text-purple-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-sm ml-4 flex-shrink-0"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}