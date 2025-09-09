'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ExternalLink, GraduationCap, MapPin, Users, Search, AlertCircle } from 'lucide-react'
import { useInfiniteUniversities } from '@/queries/universities'
import { UniversitiesQueryParams } from '@/actions/universities-actions'
import { getMediaUrl } from '@/utils/getMediaUrl'

const UniversitiesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [queryParams, setQueryParams] = useState<UniversitiesQueryParams>({
    limit: 6,
    sortBy: 'name',
    sortOrder: 'asc',
  })

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteUniversities(queryParams)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setQueryParams((prev) => ({
      ...prev,
      search: searchQuery.trim() || undefined,
    }))
  }

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }

  // Flatten all pages into a single array
  const universities = data?.pages.flatMap((page) => page.universities) ?? []
  const totalCount = data?.pages[0]?.total ?? 0

  if (isError) {
    return (
      <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Universities</h2>
            <p className="text-gray-600 mb-4">
              {error instanceof Error
                ? error.message
                : 'Something went wrong while loading universities.'}
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="university-group"
      className="py-12 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">University Partners</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Explore our network of world-class universities and educational institutions from around
            the globe.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full"
              >
                Search
              </Button>
            </div>
          </form>

          {totalCount > 0 && (
            <p className="text-sm text-gray-500 mb-8">
              {searchQuery
                ? `Found ${totalCount} universities matching "${searchQuery}"`
                : `Showing ${totalCount} universities`}
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 shadow-lg bg-white/80 backdrop-blur-sm"
              >
                <div className="w-full h-48 bg-gray-200 animate-pulse" />
                <CardHeader className="pb-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                  </div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : universities.length === 0 ? (
          <div className="text-center py-12">
            <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Universities Found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery
                ? `No universities match your search for "${searchQuery}"`
                : 'No universities available at the moment.'}
            </p>
            {searchQuery && (
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setQueryParams((prev) => ({ ...prev, search: undefined }))
                }}
                variant="outline"
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.map((university) => (
              <Card
                key={university.id}
                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={
                      university.heroImage &&
                      typeof university.heroImage === 'object' &&
                      university.heroImage.url
                        ? getMediaUrl(university.heroImage.url)
                        : 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop'
                    }
                    alt={university.name || 'University'}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {university.name || 'University'}
                  </CardTitle>
                  <CardDescription className="flex items-center text-gray-500 text-sm">
                    <MapPin className="h-4 w-4 mr-1" />
                    {university.location || 'Location not specified'}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {typeof university.description === 'string'
                      ? university.description
                      : 'A prestigious educational institution committed to academic excellence.'}
                  </div>

                  <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{university.students || 'N/A'}</span>
                    </div>
                    <span>Founded {university.founded || 'N/A'}</span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group/btn hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                    onClick={() => university.website && window.open(university.website, '_blank')}
                    disabled={!university.website}
                  >
                    <span className="mr-2">Visit University</span>
                    <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {hasNextPage && (
          <div className="flex justify-center mt-12">
            <Button
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {isFetchingNextPage ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Loading...
                </>
              ) : (
                <>
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Load More Universities
                </>
              )}
            </Button>
          </div>
        )}

        {!hasNextPage && universities.length > 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-green-50 text-green-700 px-6 py-3 rounded-full border border-green-200">
              <GraduationCap className="h-5 w-5 mr-2" />
              <span className="font-medium">You&apos;ve explored all our university partners!</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default UniversitiesPage
