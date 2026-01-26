import { DrupalFacultyMember } from '@/lib/types'
import { Mail, Phone, MapPin, Award } from 'lucide-react'

interface FacultyCardProps {
  member: DrupalFacultyMember
}

export default function FacultyCard({ member }: FacultyCardProps) {
  return (
    <a
      href={member.path}
      className="group block bg-white rounded-3xl shadow-xl shadow-blue-100/50 overflow-hidden border border-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Photo */}
      <div className="relative">
        <div className="aspect-[4/5] overflow-hidden">
          {member.photo?.url ? (
            <img
              src={member.photo.url}
              alt={member.photo.alt || member.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                {member.title.charAt(0)}
              </div>
            </div>
          )}
        </div>

        {/* Featured Badge */}
        {member.featured && (
          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1 px-3 py-1 bg-amber-400 text-amber-900 rounded-full text-xs font-semibold shadow-lg">
              <Award className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Name & Position on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-1">{member.title}</h3>
          <p className="text-amber-300 font-medium text-sm">{member.position}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Department */}
        <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-4">
          {member.department || 'Academic Department'}
        </div>

        {/* Specializations */}
        {member.specializations && member.specializations.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {member.specializations.slice(0, 3).map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                >
                  {spec}
                </span>
              ))}
              {member.specializations.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  +{member.specializations.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="space-y-2 text-sm text-gray-600">
          {member.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-500" />
              <span className="line-clamp-1">{member.email}</span>
            </div>
          )}
          {member.office && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span className="line-clamp-1">{member.office}</span>
            </div>
          )}
        </div>
      </div>
    </a>
  )
}
