import Header from '../components/Header'

function ArticleCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-6 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="flex items-center gap-2 mt-4">
          <div className="h-3 bg-gray-200 rounded w-24" />
        </div>
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header Skeleton */}
        <div className="mb-8 md:mb-12">
          <div className="h-10 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-96 max-w-full animate-pulse" />
        </div>

        {/* Articles Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <ArticleCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </div>
  )
}
