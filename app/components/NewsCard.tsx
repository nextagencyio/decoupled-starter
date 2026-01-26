import { DrupalUniversityNews } from '@/lib/types'
import { ArrowRight, Star, User } from 'lucide-react'

interface NewsCardProps {
  item: DrupalUniversityNews
}

const categoryColors: Record<string, { bg: string, text: string }> = {
  research: { bg: 'bg-purple-100', text: 'text-purple-700' },
  campus: { bg: 'bg-blue-100', text: 'text-blue-700' },
  athletics: { bg: 'bg-green-100', text: 'text-green-700' },
  alumni: { bg: 'bg-amber-100', text: 'text-amber-700' },
  admissions: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
}

export default function NewsCard({ item }: NewsCardProps) {
  const categoryStyle = categoryColors[item.newsCategory || 'campus'] || categoryColors.campus

  // Format timestamp to readable date
  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'Recent'
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <a
      href={item.path}
      className="group block bg-white rounded-3xl shadow-xl shadow-blue-100/50 overflow-hidden border border-blue-100/50 hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {item.newsImage?.url ? (
          <img
            src={item.newsImage.url}
            alt={item.newsImage.alt || item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
            <div className="text-6xl font-black text-blue-200">NEWS</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${categoryStyle.bg} ${categoryStyle.text}`}>
            {item.newsCategory || 'News'}
          </span>
        </div>

        {/* Featured Star */}
        {item.featured && (
          <div className="absolute top-4 right-4">
            <Star className="w-5 h-5 text-amber-400 fill-current drop-shadow-lg" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="text-xs text-gray-400 mb-2">
          {formatDate(item.created?.timestamp)}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {item.title}
        </h3>

        {/* Description Preview */}
        {item.body?.processed && (
          <div
            className="text-sm text-gray-500 line-clamp-3 mb-4"
            dangerouslySetInnerHTML={{
              __html: item.body.processed.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
            }}
          />
        )}

        {/* Author & Read More */}
        <div className="flex items-center justify-between">
          {item.author && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <User className="w-4 h-4" />
              <span>{item.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all ml-auto">
            Read More
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </a>
  )
}
