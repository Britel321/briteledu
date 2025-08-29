'use client'

import { useEffect } from 'react'
import { useInvalidateCourses } from '@/hooks/useCourses'

export default function PageClient() {
  const { invalidateCoursesList } = useInvalidateCourses()

  useEffect(() => {
    // Any client-side logic for the courses page
    // For example, analytics tracking, scroll effects, etc.

    // Listen for custom events that might require data refresh
    const handleDataUpdate = () => {
      invalidateCoursesList()
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('coursesUpdated', handleDataUpdate)

      return () => {
        window.removeEventListener('coursesUpdated', handleDataUpdate)
      }
    }
  }, [invalidateCoursesList])

  return null
}
