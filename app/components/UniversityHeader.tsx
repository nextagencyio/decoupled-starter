'use client'

import { useState, useEffect } from 'react'
import {
  GraduationCap,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Users,
  Calendar,
  Newspaper,
  Building2,
  Phone
} from 'lucide-react'

interface UniversityHeaderProps {
  universityName: string
}

export default function UniversityHeader({ universityName }: UniversityHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Programs', href: '#programs', icon: BookOpen },
    { label: 'Faculty', href: '#faculty', icon: Users },
    { label: 'Events', href: '#events', icon: Calendar },
    { label: 'News', href: '#news', icon: Newspaper },
    { label: 'About', href: '#about', icon: Building2 },
    { label: 'Contact', href: '#contact', icon: Phone },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-blue-900/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isScrolled
                ? 'bg-gradient-to-br from-blue-600 to-indigo-600'
                : 'bg-white/10 backdrop-blur-md border border-white/20'
            }`}>
              <GraduationCap className={`w-7 h-7 ${isScrolled ? 'text-white' : 'text-amber-400'}`} />
            </div>
            <div>
              <span className={`font-bold text-lg transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>
                {universityName}
              </span>
              <span className={`block text-xs ${
                isScrolled ? 'text-blue-600' : 'text-amber-400'
              }`}>
                Est. 1892
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/admissions/apply"
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/30'
                  : 'bg-amber-400 text-blue-900 hover:bg-amber-300'
              }`}
            >
              Apply Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t">
          <nav className="max-w-7xl mx-auto px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </a>
            ))}
            <div className="pt-4 mt-4 border-t">
              <a
                href="/admissions/apply"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold"
              >
                Apply Now
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
