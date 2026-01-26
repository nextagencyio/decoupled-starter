import { DrupalCampusEvent } from '@/lib/types'
import { Calendar, Clock, MapPin, ExternalLink, Star } from 'lucide-react'

interface EventCardProps {
  event: DrupalCampusEvent
}

const eventTypeColors: Record<string, { bg: string, text: string, icon: string }> = {
  lecture: { bg: 'bg-blue-100', text: 'text-blue-700', icon: 'text-blue-500' },
  workshop: { bg: 'bg-purple-100', text: 'text-purple-700', icon: 'text-purple-500' },
  concert: { bg: 'bg-pink-100', text: 'text-pink-700', icon: 'text-pink-500' },
  sports: { bg: 'bg-green-100', text: 'text-green-700', icon: 'text-green-500' },
  ceremony: { bg: 'bg-amber-100', text: 'text-amber-700', icon: 'text-amber-500' },
  'open-house': { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: 'text-indigo-500' },
}

export default function EventCard({ event }: EventCardProps) {
  const typeStyle = eventTypeColors[event.eventType || 'lecture'] || eventTypeColors.lecture

  // Parse date for display
  const formatDate = (dateStr: string) => {
    // Handle various date formats
    const date = new Date(dateStr)
    if (!isNaN(date.getTime())) {
      return {
        month: date.toLocaleString('en-US', { month: 'short' }),
        day: date.getDate().toString(),
      }
    }
    // Fallback for custom formats like "May 15, 2026"
    const parts = dateStr.split(' ')
    if (parts.length >= 2) {
      return {
        month: parts[0].substring(0, 3),
        day: parts[1].replace(',', ''),
      }
    }
    return { month: 'TBD', day: '--' }
  }

  const dateDisplay = formatDate(event.eventDate || '')

  return (
    <a
      href={event.path}
      className="group block bg-white rounded-3xl shadow-xl shadow-blue-100/50 overflow-hidden border border-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image with Date Overlay */}
      <div className="relative h-48 overflow-hidden">
        {event.eventImage?.url ? (
          <img
            src={event.eventImage.url}
            alt={event.eventImage.alt || event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-white/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white rounded-xl p-3 text-center shadow-lg min-w-[70px]">
          <div className="text-xs font-bold text-blue-600 uppercase">{dateDisplay.month}</div>
          <div className="text-2xl font-black text-gray-900">{dateDisplay.day}</div>
        </div>

        {/* Event Type Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${typeStyle.bg} ${typeStyle.text}`}>
            {event.eventType || 'Event'}
          </span>
        </div>

        {/* Featured Star */}
        {event.featured && (
          <div className="absolute bottom-4 right-4">
            <Star className="w-5 h-5 text-amber-400 fill-current drop-shadow-lg" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {event.title}
        </h3>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {event.eventTime && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className={`w-4 h-4 ${typeStyle.icon}`} />
              <span>{event.eventTime}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className={`w-4 h-4 ${typeStyle.icon}`} />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          )}
        </div>

        {/* Description Preview */}
        {event.body?.processed && (
          <div
            className="text-sm text-gray-500 line-clamp-2 mb-4"
            dangerouslySetInnerHTML={{
              __html: event.body.processed.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
            }}
          />
        )}

        {/* Register CTA */}
        {event.registrationUrl && (
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
            Register Now
            <ExternalLink className="w-4 h-4" />
          </div>
        )}
      </div>
    </a>
  )
}
