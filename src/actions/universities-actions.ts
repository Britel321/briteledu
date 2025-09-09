'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })
import { University } from '@/payload-types'

export interface UniversitiesQueryParams {
  page?: number
  limit?: number
  search?: string
  country?: string
  universityType?: string
  status?: string
  featured?: boolean
  sortBy?: 'name' | 'founded' | 'students' | 'ranking'
  sortOrder?: 'asc' | 'desc'
}

export interface UniversitiesResponse {
  universities: University[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export const fetchUniversities = async (
  params: UniversitiesQueryParams = {},
): Promise<UniversitiesResponse> => {
  const {
    page = 1,
    limit = 6,
    search,
    country,
    universityType,
    status = 'active',
    featured,
    sortBy = 'name',
    sortOrder = 'asc',
  } = params

  try {
    const where: any = {
      status: {
        equals: status,
      },
    }

    if (search) {
      where.or = [
        {
          name: {
            contains: search,
          },
        },
        {
          location: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ]
    }

    if (country) {
      where.country = {
        equals: country,
      }
    }

    if (universityType) {
      where.universityType = {
        equals: universityType,
      }
    }

    if (featured !== undefined) {
      where.featured = {
        equals: featured,
      }
    }

    // Build sort clause
    let sort: string = sortBy
    if (sortOrder === 'desc') {
      sort = `-${sortBy}`
    }

    const result = await payload.find({
      collection: 'universities',
      where,
      sort,
      page,
      limit,
      depth: 2,
    })

    return {
      universities: result.docs as University[],
      total: result.totalDocs,
      page: result.page || 1,
      limit: result.limit,
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage || false,
      hasPrevPage: result.hasPrevPage || false,
    }
  } catch (error) {
    console.error('Error fetching universities:', error)
    throw new Error('Failed to fetch universities')
  }
}

export const fetchUniversityBySlug = async (slug: string): Promise<University | null> => {
  try {
    const result = await payload.find({
      collection: 'universities',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 2,
    })

    return (result.docs[0] as University) || null
  } catch (error) {
    console.error('Error fetching university by slug:', error)
    return null
  }
}

export const fetchFeaturedUniversities = async (limit: number = 3): Promise<University[]> => {
  try {
    const result = await payload.find({
      collection: 'universities',
      where: {
        featured: {
          equals: true,
        },
        status: {
          equals: 'active',
        },
      },
      sort: '-ranking',
      limit,
      depth: 2,
    })

    return result.docs as University[]
  } catch (error) {
    console.error('Error fetching featured universities:', error)
    return []
  }
}

export const fetchUniversityStats = async () => {
  try {
    const [total, featured, countries] = await Promise.all([
      payload.count({
        collection: 'universities',
        where: {
          status: {
            equals: 'active',
          },
        },
      }),
      payload.count({
        collection: 'universities',
        where: {
          featured: {
            equals: true,
          },
          status: {
            equals: 'active',
          },
        },
      }),
      payload.find({
        collection: 'countries',
        limit: 1000,
      }),
    ])

    return {
      totalUniversities: total.totalDocs,
      featuredUniversities: featured.totalDocs,
      totalCountries: countries.totalDocs,
    }
  } catch (error) {
    console.error('Error fetching university stats:', error)
    return {
      totalUniversities: 0,
      featuredUniversities: 0,
      totalCountries: 0,
    }
  }
}
