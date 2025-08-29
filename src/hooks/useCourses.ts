import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchCourses,
  fetchCourseBySlug,
  fetchCourseCategories,
  fetchFeaturedCourses,
  fetchRelatedCourses,
} from '@/lib/courses-api'
import { CoursesQueryParams } from '@/types/course'

// Query keys
export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (params: CoursesQueryParams) => [...courseKeys.lists(), params] as const,
  details: () => [...courseKeys.all, 'detail'] as const,
  detail: (slug: string) => [...courseKeys.details(), slug] as const,
  categories: () => [...courseKeys.all, 'categories'] as const,
  featured: () => [...courseKeys.all, 'featured'] as const,
  related: (courseId: number) => [...courseKeys.all, 'related', courseId] as const,
}

// Hooks
export const useCourses = (params: CoursesQueryParams = {}) => {
  return useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () => fetchCourses(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    retry: (failureCount, _error) => {
      if (failureCount < 2) {
        return true
      }
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useCourse = (slug: string) => {
  return useQuery({
    queryKey: courseKeys.detail(slug),
    queryFn: () => fetchCourseBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    enabled: !!slug, // Only run query if slug is provided
    retry: (failureCount, _error) => {
      if (failureCount < 2) {
        return true
      }
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export const useCourseCategories = () => {
  return useQuery({
    queryKey: courseKeys.categories(),
    queryFn: fetchCourseCategories,
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
    retry: (failureCount, _error) => {
      if (failureCount < 2) {
        return true
      }
      return false
    },
  })
}

export const useFeaturedCourses = (limit: number = 3) => {
  return useQuery({
    queryKey: [...courseKeys.featured(), limit],
    queryFn: () => fetchFeaturedCourses(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, _error) => {
      if (failureCount < 2) {
        return true
      }
      return false
    },
  })
}

export const useRelatedCourses = (courseId: number, limit: number = 3) => {
  return useQuery({
    queryKey: [...courseKeys.related(courseId), limit],
    queryFn: () => fetchRelatedCourses(courseId, limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    enabled: !!courseId, // Only run query if courseId is provided
    retry: (failureCount, _error) => {
      if (failureCount < 2) {
        return true
      }
      return false
    },
  })
}

// Utility hook for prefetching
export const usePrefetchCourse = () => {
  const queryClient = useQueryClient()

  const prefetchCourse = (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: courseKeys.detail(slug),
      queryFn: () => fetchCourseBySlug(slug),
      staleTime: 10 * 60 * 1000,
    })
  }

  return { prefetchCourse }
}

// Utility hook for invalidating course queries
export const useInvalidateCourses = () => {
  const queryClient = useQueryClient()

  const invalidateAllCourses = () => {
    queryClient.invalidateQueries({ queryKey: courseKeys.all })
  }

  const invalidateCoursesList = () => {
    queryClient.invalidateQueries({ queryKey: courseKeys.lists() })
  }

  const invalidateCourse = (slug: string) => {
    queryClient.invalidateQueries({ queryKey: courseKeys.detail(slug) })
  }

  const invalidateCategories = () => {
    queryClient.invalidateQueries({ queryKey: courseKeys.categories() })
  }

  return {
    invalidateAllCourses,
    invalidateCoursesList,
    invalidateCourse,
    invalidateCategories,
  }
}
