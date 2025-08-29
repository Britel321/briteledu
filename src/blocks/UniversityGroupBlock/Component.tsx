'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, GraduationCap, MapPin, Users } from 'lucide-react'

interface University {
  id: number
  name: string
  location: string
  description: string
  imageUrl: string
  website: string
  students: string
  founded: number
}

interface Props {
  className?: string
  content?: unknown
  variant?: 'info' | 'warning' | 'error' | 'success'
  style?: React.CSSProperties
}

const generateUniversities = (startId: number, count: number): University[] => {
  const universities = [
    {
      name: 'Harvard University',
      location: 'Cambridge, MA',
      description:
        "America's oldest institution of higher education, renowned for academic excellence and influential alumni.",
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop',
      website: 'https://harvard.edu',
      students: '23,000+',
      founded: 1636,
    },
    {
      name: 'Stanford University',
      location: 'Stanford, CA',
      description:
        'Leading research university in Silicon Valley, known for innovation and entrepreneurship.',
      imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=250&fit=crop',
      website: 'https://stanford.edu',
      students: '17,000+',
      founded: 1885,
    },
    {
      name: 'MIT',
      location: 'Cambridge, MA',
      description:
        'World-renowned institute focusing on science, technology, engineering, and mathematics.',
      imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&h=250&fit=crop',
      website: 'https://mit.edu',
      students: '11,000+',
      founded: 1861,
    },
    {
      name: 'Oxford University',
      location: 'Oxford, UK',
      description:
        "One of the world's oldest universities, known for its tutorial-based teaching method.",
      imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=400&h=250&fit=crop',
      website: 'https://ox.ac.uk',
      students: '24,000+',
      founded: 1096,
    },
    {
      name: 'University of Tokyo',
      location: 'Tokyo, Japan',
      description:
        "Japan's premier university, leading in research and academic excellence in Asia.",
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop',
      website: 'https://u-tokyo.ac.jp',
      students: '28,000+',
      founded: 1877,
    },
    {
      name: 'ETH Zurich',
      location: 'Zurich, Switzerland',
      description:
        'Leading European university for science, technology, engineering and mathematics.',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      website: 'https://ethz.ch',
      students: '22,000+',
      founded: 1855,
    },
    {
      name: 'University of Melbourne',
      location: 'Melbourne, Australia',
      description:
        "Australia's premier research university with a strong international reputation.",
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=250&fit=crop',
      website: 'https://unimelb.edu.au',
      students: '48,000+',
      founded: 1853,
    },
    {
      name: 'Sorbonne University',
      location: 'Paris, France',
      description:
        'Historic French university known for humanities, sciences, and research excellence.',
      imageUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=250&fit=crop',
      website: 'https://sorbonne-universite.fr',
      students: '55,000+',
      founded: 1253,
    },
  ]

  const result = []
  for (let i = 0; i < count; i++) {
    const template = universities[i % universities.length]
    result.push({
      ...template,
      id: startId + i,
      name:
        i >= universities.length
          ? `${template.name} (${Math.floor(i / universities.length) + 1})`
          : template.name,
    })
  }
  return result
}

export const UniversityGroupBlock: React.FC<Props> = ({ className, variant: _variant, style }) => {
  const [universities, setUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)

  const itemsPerPage = 6

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const startId = page * itemsPerPage
    const newUniversities = generateUniversities(startId, itemsPerPage)

    setUniversities((prev) => [...prev, ...newUniversities])
    setPage((prev) => prev + 1)

    // Stop loading after 50 items for demo purposes
    if (universities.length + newUniversities.length >= 50) {
      setHasMore(false)
    }

    setLoading(false)
  }, [loading, hasMore, page, universities.length])

  useEffect(() => {
    loadMore()
  }, [loadMore])

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      ) {
        return
      }
      loadMore()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadMore, loading])

  return (
    <section
      id="university-group"
      className={`py-12 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen ${className || ''}`}
      style={style}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">University Partners</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our network of world-class universities and educational institutions from around
            the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universities.map((university) => (
            <Card
              key={university.id}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={university.imageUrl}
                  alt={university.name}
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
                  {university.name}
                </CardTitle>
                <CardDescription className="flex items-center text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {university.location}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {university.description}
                </p>

                <div className="flex justify-between items-center mb-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{university.students}</span>
                  </div>
                  <span>Founded {university.founded}</span>
                </div>

                <Button
                  variant="outline"
                  className="w-full group/btn hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                  onClick={() => window.open(university.website, '_blank')}
                >
                  <span className="mr-2">Visit University</span>
                  <ExternalLink className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-gray-700 font-medium">Loading more universities...</span>
            </div>
          </div>
        )}

        {!hasMore && universities.length > 0 && (
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
