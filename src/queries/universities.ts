import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'

import {
  fetchUniversities,
  fetchUniversityBySlug,
  fetchFeaturedUniversities,
  fetchUniversityStats,
  UniversitiesQueryParams,
} from '@/actions/universities-actions'

// Query keys
export const universityKeys = {
  all: ['universities'] as const,
  lists: () => [...universityKeys.all, 'list'] as const,
  list: (params: UniversitiesQueryParams) => [...universityKeys.lists(), params] as const,
  infinite: (params: UniversitiesQueryParams) =>
    [...universityKeys.lists(), 'infinite', params] as const,
  details: () => [...universityKeys.all, 'detail'] as const,
  detail: (slug: string) => [...universityKeys.details(), slug] as const,
  featured: () => [...universityKeys.all, 'featured'] as const,
  stats: () => [...universityKeys.all, 'stats'] as const,
}

// Hooks
export const useUniversities = (params: UniversitiesQueryParams = {}) =>
  useQuery({
    queryKey: universityKeys.list(params),
    queryFn: () => fetchUniversities(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Only retry on network errors, not on data parsing errors
      if (failureCount < 2) {
        return true
      }
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

export const useInfiniteUniversities = (params: UniversitiesQueryParams = {}) =>
  useInfiniteQuery({
    queryKey: universityKeys.infinite(params),
    queryFn: ({ pageParam = 1 }) =>
      fetchUniversities({
        ...params,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.page + 1 : undefined
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (failureCount < 2) {
        return true
      }
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

export const useUniversity = (slug: string) =>
  useQuery({
    queryKey: universityKeys.detail(slug),
    queryFn: () => fetchUniversityBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    enabled: !!slug,
    retry: (failureCount, error) => {
      if (failureCount < 2) {
        return true
      }
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

export const useFeaturedUniversities = (limit: number = 3) =>
  useQuery({
    queryKey: [...universityKeys.featured(), limit],
    queryFn: () => fetchFeaturedUniversities(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (failureCount < 2) {
        return true
      }
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

export const useUniversityStats = () =>
  useQuery({
    queryKey: universityKeys.stats(),
    queryFn: fetchUniversityStats,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (failureCount < 2) {
        return true
      }
      return false
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

// Utility hooks for cache management
export const useUniversitiesCache = () => {
  const queryClient = useQueryClient()

  const invalidateUniversities = () => {
    queryClient.invalidateQueries({ queryKey: universityKeys.all })
  }

  const prefetchUniversity = (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: universityKeys.detail(slug),
      queryFn: () => fetchUniversityBySlug(slug),
      staleTime: 10 * 60 * 1000,
    })
  }

  const prefetchUniversities = (params: UniversitiesQueryParams) => {
    queryClient.prefetchQuery({
      queryKey: universityKeys.list(params),
      queryFn: () => fetchUniversities(params),
      staleTime: 5 * 60 * 1000,
    })
  }

  return {
    invalidateUniversities,
    prefetchUniversity,
    prefetchUniversities,
  }
}
