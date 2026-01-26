'use client'

import {
  GraduationCap,
  Users,
  BookOpen,
  Trophy,
  Calendar,
  Newspaper,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ChevronDown,
  Building2,
  Sparkles,
  Award,
  Globe,
  Heart,
  Clock,
  ExternalLink
} from 'lucide-react'
import {
  DrupalUniversityPage,
  DrupalAcademicProgram,
  DrupalFacultyMember,
  DrupalCampusEvent,
  DrupalUniversityNews
} from '@/lib/types'
import ProgramCard from './ProgramCard'
import FacultyCard from './FacultyCard'
import EventCard from './EventCard'
import NewsCard from './NewsCard'
import UniversityHeader from './UniversityHeader'

interface UniversityRendererProps {
  universityPage: DrupalUniversityPage | null
  programs: DrupalAcademicProgram[]
  faculty: DrupalFacultyMember[]
  events: DrupalCampusEvent[]
  news: DrupalUniversityNews[]
}

// Animated gradient orb background
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl animate-pulse delay-500" />
    </div>
  )
}

// Stats counter component
function StatCard({ icon: Icon, value, label, delay }: { icon: any, value: string, label: string, delay: number }) {
  return (
    <div
      className="relative group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-amber-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
        <Icon className="w-8 h-8 mx-auto mb-3 text-amber-400" />
        <div className="text-4xl font-black text-white mb-1">{value}</div>
        <div className="text-blue-200 text-sm">{label}</div>
      </div>
    </div>
  )
}

// Section header component
function SectionHeader({
  icon: Icon,
  label,
  title,
  highlight,
  description
}: {
  icon: any
  label: string
  title: string
  highlight: string
  description?: string
}) {
  return (
    <div className="text-center mb-16">
      <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4 bg-blue-50 px-4 py-2 rounded-full">
        <Icon className="w-4 h-4" />
        {label}
      </span>
      <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
        {title} <span className="text-blue-600">{highlight}</span>
      </h2>
      {description && (
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          {description}
        </p>
      )}
      <div className="flex items-center justify-center gap-4 mt-6">
        <div className="h-px w-16 bg-blue-200" />
        <GraduationCap className="w-5 h-5 text-blue-400" />
        <div className="h-px w-16 bg-blue-200" />
      </div>
    </div>
  )
}

export default function UniversityRenderer({
  universityPage,
  programs,
  faculty,
  events,
  news
}: UniversityRendererProps) {
  const featuredPrograms = programs.filter(p => p.featured)
  const featuredFaculty = faculty.filter(f => f.featured)
  const featuredEvents = events.filter(e => e.featured)
  const featuredNews = news.filter(n => n.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50">
      <UniversityHeader universityName={universityPage?.title || 'University'} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {universityPage?.heroImage?.url ? (
            <img
              src={universityPage.heroImage.url}
              alt={universityPage.heroImage.alt || 'Campus'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-900/70 to-blue-950/90" />
        </div>

        <GradientOrbs />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-32 pb-24">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-8">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-white/90 font-medium">Ranked #{universityPage?.statsRanking?.replace('#', '') || '28'} National University</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              {universityPage?.heroTitle || 'Shape Tomorrow'}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            {universityPage?.heroSubtitle || 'Transform your future at a world-class research university'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <a
              href={universityPage?.ctaApplyUrl || '/admissions/apply'}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-blue-900 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-400/50 hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Apply Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={universityPage?.ctaVisitUrl || '/admissions/visit'}
              className="group inline-flex items-center justify-center gap-3 border-2 border-white/30 hover:border-white/50 hover:bg-white/10 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 backdrop-blur-sm"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Visit
            </a>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <StatCard icon={Users} value={universityPage?.statsStudents || '25,000+'} label="Students" delay={0} />
            <StatCard icon={GraduationCap} value={universityPage?.statsFaculty || '1,800'} label="Faculty" delay={100} />
            <StatCard icon={BookOpen} value={universityPage?.statsPrograms || '200+'} label="Programs" delay={200} />
            <StatCard icon={Trophy} value={universityPage?.statsRanking || '#28'} label="National Ranking" delay={300} />
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/60" />
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      {featuredPrograms.length > 0 && (
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <SectionHeader
              icon={BookOpen}
              label="Academics"
              title="Featured"
              highlight="Programs"
              description="Discover world-class programs designed to prepare you for success"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPrograms.slice(0, 3).map((program, index) => (
                <div
                  key={program.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProgramCard program={program} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/programs"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group"
              >
                Explore All Programs
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
        <GradientOrbs />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4">
                <Heart className="w-4 h-4 fill-current" />
                Our Legacy
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8">
                {universityPage?.aboutTitle || 'Excellence in Education'}
              </h2>
              {universityPage?.aboutContent?.processed ? (
                <div
                  className="text-blue-100/90 text-lg leading-relaxed prose prose-invert prose-blue max-w-none"
                  dangerouslySetInnerHTML={{ __html: universityPage.aboutContent.processed }}
                />
              ) : (
                <p className="text-blue-100/90 text-lg leading-relaxed">
                  Our university has been at the forefront of education and discovery for over a century,
                  bringing together scholars, researchers, and students from around the world.
                </p>
              )}

              {/* Mission Statement */}
              {universityPage?.missionStatement?.processed && (
                <div className="mt-8 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                  <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Our Mission
                  </h3>
                  <div
                    className="text-blue-100/80 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: universityPage.missionStatement.processed }}
                  />
                </div>
              )}
            </div>

            {/* Quick Facts Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-3xl transform rotate-3" />
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <Building2 className="w-7 h-7 text-amber-400" />
                  Quick Facts
                </h3>
                <div className="space-y-6">
                  {[
                    { label: 'Founded', value: '1892', icon: Clock },
                    { label: 'Campus Size', value: '850 Acres', icon: MapPin },
                    { label: 'Student-Faculty Ratio', value: '14:1', icon: Users },
                    { label: 'Research Centers', value: '75+', icon: BookOpen },
                  ].map((fact) => (
                    <div key={fact.label} className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <fact.icon className="w-5 h-5 text-amber-400" />
                        <span className="text-blue-100">{fact.label}</span>
                      </div>
                      <span className="font-bold text-white">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      {featuredFaculty.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={Users}
              label="Faculty"
              title="Meet Our"
              highlight="Scholars"
              description="Learn from world-renowned experts and researchers"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredFaculty.slice(0, 3).map((member, index) => (
                <div
                  key={member.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <FacultyCard member={member} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      {featuredEvents.length > 0 && (
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={Calendar}
              label="Events"
              title="Upcoming"
              highlight="Events"
              description="Join us for lectures, performances, and campus activities"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.slice(0, 3).map((event, index) => (
                <div
                  key={event.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News Section */}
      {featuredNews.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-blue-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              icon={Newspaper}
              label="News"
              title="Latest"
              highlight="Headlines"
              description="Stay informed about campus news and achievements"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredNews.slice(0, 3).map((item, index) => (
                <div
                  key={item.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <NewsCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            icon={MapPin}
            label="Contact"
            title="Visit Our"
            highlight="Campus"
            description="We'd love to welcome you to our beautiful campus"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Address */}
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-b from-blue-50 to-white shadow-xl shadow-blue-100/50 border border-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/50 hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Campus Address</h3>
              <p className="text-gray-600 leading-relaxed">{universityPage?.address || 'University Campus'}</p>
            </div>

            {/* Phone */}
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-b from-blue-50 to-white shadow-xl shadow-blue-100/50 border border-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/50 hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Admissions</h3>
              <a
                href={`tel:${universityPage?.phone?.replace(/[^0-9]/g, '')}`}
                className="text-blue-600 hover:text-blue-700 transition-colors font-medium text-lg"
              >
                {universityPage?.phone || '(555) 123-4500'}
              </a>
            </div>

            {/* Email */}
            <div className="group text-center p-8 rounded-3xl bg-gradient-to-b from-blue-50 to-white shadow-xl shadow-blue-100/50 border border-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/50 hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/30">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Email Us</h3>
              <a
                href={`mailto:${universityPage?.email}`}
                className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
              >
                {universityPage?.email || 'admissions@university.edu'}
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <a
              href={universityPage?.ctaApplyUrl || '/admissions/apply'}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-12 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-blue-400/50 hover:scale-105"
            >
              <GraduationCap className="w-6 h-6" />
              Start Your Application
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-10 h-10 text-amber-400" />
              <span className="text-2xl font-bold">{universityPage?.title || 'University'}</span>
            </div>
            <p className="text-blue-300/80 text-center max-w-md mb-8">
              Shaping minds, transforming futures, and advancing knowledge since 1892.
            </p>
            <div className="border-t border-blue-800 pt-8 w-full text-center">
              <p className="text-blue-400/60 text-sm">
                &copy; {new Date().getFullYear()} {universityPage?.title || 'University'}. All rights reserved.
              </p>
              <p className="text-blue-500/40 text-xs mt-2 flex items-center justify-center gap-2">
                <Sparkles className="w-3 h-3" />
                Built with Decoupled Drupal
                <Sparkles className="w-3 h-3" />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
