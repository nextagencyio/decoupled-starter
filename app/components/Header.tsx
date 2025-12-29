'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { Coffee } from 'lucide-react'

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'About', href: '/about' }
]

export default function Header() {
  const pathname = usePathname()

  const getActiveTab = () => {
    if (pathname === '/') return 'Home'
    if (pathname === '/menu') return 'Menu'
    if (pathname === '/about') return 'About'
    return null
  }

  const activeTab = getActiveTab()

  return (
    <header className="bg-amber-950 border-b border-amber-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
              <div className="flex-shrink-0 bg-amber-100 p-1.5 rounded-full">
                <Coffee className="w-6 h-6 text-amber-900" />
              </div>
              <span className="text-lg font-semibold text-amber-100">
                Brew & Bean
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
                      ? 'border-amber-400 text-amber-100'
                      : 'border-transparent text-amber-300 hover:text-amber-100 hover:border-amber-600'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side - Order button */}
          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-amber-950 transition-all duration-200 font-medium text-sm"
            >
              Order Now
            </Link>
          </div>
        </div>

        {/* Mobile Navigation - shown below on smaller screens */}
        <div className="md:hidden border-t border-amber-900">
          <div className="flex justify-between items-center py-2">
            <div className="flex space-x-4 overflow-x-auto">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'whitespace-nowrap py-2 px-3 rounded-md text-sm font-medium transition-colors',
                    activeTab === item.name
                      ? 'bg-amber-800 text-amber-100'
                      : 'text-amber-300 hover:text-amber-100 hover:bg-amber-900'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="bg-amber-600 text-white px-3 py-2 rounded-md hover:bg-amber-500 transition-all duration-200 font-medium text-sm ml-4 flex-shrink-0"
            >
              Order
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
