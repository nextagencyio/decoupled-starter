import { DrupalAcademicProgram } from '@/lib/types'
import {
  BookOpen,
  Clock,
  GraduationCap,
  ArrowRight,
  Award,
  Briefcase
} from 'lucide-react'

interface ProgramCardProps {
  program: DrupalAcademicProgram
}

const programTypeColors: Record<string, string> = {
  undergraduate: 'bg-blue-100 text-blue-700',
  graduate: 'bg-purple-100 text-purple-700',
  doctoral: 'bg-amber-100 text-amber-700',
  certificate: 'bg-green-100 text-green-700',
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const typeColor = programTypeColors[program.programType || 'undergraduate'] || programTypeColors.undergraduate

  return (
    <a
      href={program.path}
      className="group block bg-white rounded-3xl shadow-xl shadow-blue-100/50 overflow-hidden border border-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {program.programImage?.url ? (
          <img
            src={program.programImage.url}
            alt={program.programImage.alt || program.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Program Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${typeColor}`}>
            {program.programType || 'Undergraduate'}
          </span>
        </div>

        {/* Featured Badge */}
        {program.featured && (
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1 px-3 py-1 bg-amber-400 text-amber-900 rounded-full text-xs font-semibold">
              <Award className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-2">
          {program.department || 'Academic Department'}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {program.title}
        </h3>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {program.duration || '4 years'}
          </span>
          <span className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            {program.credits || '120'} credits
          </span>
        </div>

        {/* Highlights */}
        {program.highlights && program.highlights.length > 0 && (
          <ul className="space-y-2 mb-4">
            {program.highlights.slice(0, 2).map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <span className="line-clamp-1">{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Career Outcomes Preview */}
        {program.careerOutcomes && program.careerOutcomes.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Briefcase className="w-4 h-4" />
            <span className="line-clamp-1">
              {program.careerOutcomes.slice(0, 3).join(', ')}
            </span>
          </div>
        )}

        {/* Learn More */}
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
          Learn More
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </a>
  )
}
