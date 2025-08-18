import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

interface NewsItem {
  id: number
  title: string
  date: string
  image: string
  featured?: boolean
}

const defaultContent: NewsItem[] = [
  {
    id: 1,
    title: 'demo-pdsfsdf',
    date: 'June 23, 2025',
    image: 'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606750/ubeqgxdmmaatptx1nikd.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'demo-pdsfsdf',
    date: 'June 23, 2025',
    image: 'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606823/b5cnge3uepaoeoic1dnf.jpg',
  },
  {
    id: 3,
    title: 'demo-pdsfsdf',
    date: 'June 23, 2025',
    image: 'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606842/tueh2vcgbdsvnd0tzm98.jpg',
  },
  {
    id: 4,
    title: 'Infrastructure Development Summit in Kathmandu',
    date: 'March 8, 2024 - 3:15 PM',
    image: 'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606750/ubeqgxdmmaatptx1nikd.jpg',
  },
  {
    id: 5,
    title: 'Healthcare Policy Implementation Review',
    date: 'March 6, 2024 - 11:45 AM',
    image: 'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606823/b5cnge3uepaoeoic1dnf.jpg',
  },
]

const fetchNewsData = async (): Promise<NewsItem[]> => {
  if (typeof window === 'undefined') {
    return defaultContent
  }

  try {
    const savedContent = localStorage.getItem('websiteContent')
    if (!savedContent) {
      return defaultContent
    }

    const allContent = JSON.parse(savedContent)
    const newsContent = allContent.filter(
      (item: any) => item.status === 'published' && item.category === 'news',
    )

    if (newsContent.length > 0) {
      return newsContent.slice(0, 5).map((item: any, index: number) => ({
        id: item.id || index + 1,
        title: item.title,
        date: item.date || defaultContent[index]?.date,
        image: item.image || defaultContent[index]?.image,
        featured: index === 0,
      }))
    }

    return defaultContent
  } catch (error) {
    console.error('Error loading news content:', error)
    return defaultContent
  }
}

export const useNewsData = () => {
  const queryClient = useQueryClient()

  useEffect(() => {
    const handleStorageChange = () => {
      queryClient.invalidateQueries({ queryKey: ['newsData'] })
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange)
      window.addEventListener('contentUpdated', handleStorageChange)

      return () => {
        window.removeEventListener('storage', handleStorageChange)
        window.removeEventListener('contentUpdated', handleStorageChange)
      }
    }
  }, [queryClient])

  return useQuery({
    queryKey: ['newsData'],
    queryFn: fetchNewsData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: (failureCount, error) => {
      // Only retry on network errors, not on data parsing errors
      if (failureCount < 2) {
        return true
      }
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
