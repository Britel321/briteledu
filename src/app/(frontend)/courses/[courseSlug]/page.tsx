import type { Metadata } from 'next'
import React from 'react'
import PageClient from './page.client'
import { CourseDetail } from './components/CourseDetail'
import { fetchCourseBySlug } from '@/lib/courses-api'

// This is for static generation - we'll fetch the course data at build time for metadata
async function getCourseData(slug: string) {
  try {
    const course = await fetchCourseBySlug(slug)
    return course
  } catch (_error) {
    return null
  }
}

interface Props {
  params: Promise<{
    courseSlug: string
  }>
}

export default async function CourseDetailPage({ params }: Props) {
  const { courseSlug } = await params

  return (
    <>
      <PageClient />
      <CourseDetail slug={courseSlug} />
    </>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params
  const course = await getCourseData(courseSlug)

  if (!course) {
    return {
      title: 'Course Not Found - BriteEdu',
      description: 'The course you are looking for could not be found.',
    }
  }

  return {
    title: `${course.title} - BriteEdu`,
    description: course.description,
  }
}

// Generate static params for all courses
export async function generateStaticParams() {
  // In a real application, you would fetch this from your API
  // For now, we'll return the dummy course slugs
  const courses = [
    { courseSlug: 'ielts-preparation' },
    { courseSlug: 'toefl-mastery' },
    { courseSlug: 'sat-preparation' },
    { courseSlug: 'gre-advanced' },
    { courseSlug: 'japanese-language' },
    { courseSlug: 'study-abroad-counseling' },
  ]

  return courses
}
