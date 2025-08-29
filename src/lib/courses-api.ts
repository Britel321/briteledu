import { Course, CoursesResponse, CoursesQueryParams, CourseCategory } from '@/types/course'

// Dummy course data (this would typically come from an API or database)
const dummyCourses: Course[] = [
  {
    id: 1,
    slug: 'ielts-preparation',
    title: 'IELTS Preparation Course',
    description:
      'Comprehensive IELTS preparation course covering all four skills: Listening, Reading, Writing, and Speaking. Get ready to achieve your target band score.',
    image: '/website-template-OG.webp',
    duration: '12 weeks',
    level: 'Intermediate to Advanced',
    price: 'NPR 25,000',
    category: 'Language Proficiency',
    instructor: 'Dr. Sarah Johnson',
    instructorBio:
      'Dr. Sarah Johnson has over 15 years of experience in English language teaching and IELTS preparation. She holds a PhD in Applied Linguistics from Cambridge University.',
    rating: 4.8,
    studentsEnrolled: 245,
    features: [
      'Live Interactive Classes',
      'Practice Tests',
      'Personal Feedback',
      'Study Materials',
    ],
    curriculum: [
      {
        week: 1,
        topic: 'Introduction to IELTS & Listening Skills',
        description: 'Overview of IELTS format and intensive listening practice',
      },
      {
        week: 2,
        topic: 'Reading Strategies & Techniques',
        description: 'Academic reading skills and time management',
      },
      {
        week: 3,
        topic: 'Writing Task 1 - Data Description',
        description: 'Charts, graphs, and diagram description techniques',
      },
      {
        week: 4,
        topic: 'Writing Task 2 - Essay Writing',
        description: 'Opinion, discussion, and problem-solution essays',
      },
      {
        week: 5,
        topic: 'Speaking Skills Development',
        description: 'Fluency, pronunciation, and confidence building',
      },
      {
        week: 6,
        topic: 'Mock Tests & Assessment',
        description: 'Full-length practice tests and personalized feedback',
      },
    ],
    requirements: [
      'Intermediate level English proficiency',
      'Commitment to attend all classes',
      'Access to computer/smartphone for online resources',
      'Willingness to practice daily',
    ],
    whatYouWillLearn: [
      'Master all four IELTS skills: Listening, Reading, Writing, Speaking',
      'Effective test-taking strategies and time management',
      'Academic vocabulary and grammar structures',
      'Confidence to achieve your target band score',
      'Understanding of IELTS assessment criteria',
    ],
  },
  {
    id: 2,
    slug: 'toefl-mastery',
    title: 'TOEFL Mastery Program',
    description:
      'Master the TOEFL exam with our intensive program focusing on academic English skills and test-taking strategies.',
    image: '/website-template-OG.webp',
    duration: '10 weeks',
    level: 'Intermediate to Advanced',
    price: 'NPR 30,000',
    category: 'Language Proficiency',
    instructor: 'Prof. Michael Chen',
    instructorBio:
      'Prof. Michael Chen is a certified TOEFL instructor with 12 years of experience. He has helped over 1000 students achieve their target scores.',
    rating: 4.9,
    studentsEnrolled: 189,
    features: ['Adaptive Learning', 'Mock Tests', 'Score Guarantee', 'Flexible Schedule'],
    curriculum: [
      {
        week: 1,
        topic: 'TOEFL iBT Overview & Reading Section',
        description: 'Understanding the test format and reading strategies',
      },
      {
        week: 2,
        topic: 'Listening Section Mastery',
        description: 'Academic listening skills and note-taking techniques',
      },
      {
        week: 3,
        topic: 'Speaking Section - Tasks 1 & 2',
        description: 'Independent speaking tasks and strategies',
      },
      {
        week: 4,
        topic: 'Speaking Section - Tasks 3 & 4',
        description: 'Integrated speaking tasks with reading and listening',
      },
      {
        week: 5,
        topic: 'Writing Section - Integrated Task',
        description: 'Combining reading, listening, and writing skills',
      },
      {
        week: 6,
        topic: 'Writing Section - Independent Task',
        description: 'Essay writing and argumentation skills',
      },
    ],
    requirements: [
      'Upper-intermediate English level',
      'Basic computer skills for iBT format',
      'Dedicated study time of 10-15 hours per week',
      'Target university or program in mind',
    ],
    whatYouWillLearn: [
      'Complete mastery of all TOEFL iBT sections',
      'Advanced academic English skills',
      'Computer-based test navigation',
      'Time management for each section',
      'Score improvement guarantee of 15+ points',
    ],
  },
  {
    id: 3,
    slug: 'sat-preparation',
    title: 'SAT Preparation Course',
    description:
      'Complete SAT preparation covering Math, Evidence-Based Reading, and Writing sections with proven strategies.',
    image: '/website-template-OG.webp',
    duration: '16 weeks',
    level: 'High School',
    price: 'NPR 35,000',
    category: 'Test Preparation',
    instructor: 'Ms. Emily Rodriguez',
    instructorBio:
      'Ms. Emily Rodriguez is a Harvard graduate with 10 years of SAT tutoring experience. Her students have achieved an average score increase of 200+ points.',
    rating: 4.7,
    studentsEnrolled: 156,
    features: [
      'Diagnostic Tests',
      'Personalized Study Plan',
      'College Counseling',
      'Practice Workbooks',
    ],
    curriculum: [
      {
        week: 1,
        topic: 'SAT Overview & Diagnostic Test',
        description: 'Understanding the new SAT format and initial assessment',
      },
      {
        week: 2,
        topic: 'Evidence-Based Reading Strategies',
        description: 'Reading comprehension and analysis techniques',
      },
      {
        week: 3,
        topic: 'Writing & Language Section',
        description: 'Grammar, usage, and rhetoric skills',
      },
      {
        week: 4,
        topic: 'Math Fundamentals Review',
        description: 'Algebra, geometry, and basic trigonometry',
      },
      {
        week: 5,
        topic: 'Advanced Math Concepts',
        description: 'Complex equations and data analysis',
      },
      {
        week: 6,
        topic: 'Essay Writing (Optional)',
        description: 'Analytical writing and argumentation',
      },
    ],
    requirements: [
      'High school level mathematics and English',
      'Commitment to weekly practice tests',
      'College application timeline awareness',
      'Basic calculator skills',
    ],
    whatYouWillLearn: [
      'Comprehensive SAT test strategies',
      'Time management techniques',
      'Advanced problem-solving skills',
      'College application guidance',
      'Score improvement of 150-300 points',
    ],
  },
  {
    id: 4,
    slug: 'gre-advanced',
    title: 'GRE Advanced Preparation',
    description:
      'Advanced GRE preparation for graduate school admissions with focus on Verbal Reasoning, Quantitative Reasoning, and Analytical Writing.',
    image: '/website-template-OG.webp',
    duration: '14 weeks',
    level: 'Graduate Level',
    price: 'NPR 40,000',
    category: 'Graduate Tests',
    instructor: 'Dr. Robert Kim',
    instructorBio:
      'Dr. Robert Kim holds a PhD in Mathematics and has been preparing students for the GRE for over 8 years with a 95% success rate.',
    rating: 4.6,
    studentsEnrolled: 98,
    features: [
      'Advanced Strategies',
      'Computer-Based Practice',
      'Essay Feedback',
      'Score Improvement Guarantee',
    ],
    curriculum: [
      {
        week: 1,
        topic: 'GRE Overview & Quantitative Reasoning',
        description: 'Test format and advanced math concepts',
      },
      {
        week: 2,
        topic: 'Verbal Reasoning - Vocabulary',
        description: 'Advanced vocabulary building and context clues',
      },
      {
        week: 3,
        topic: 'Reading Comprehension Strategies',
        description: 'Complex passage analysis and inference skills',
      },
      {
        week: 4,
        topic: 'Analytical Writing Assessment',
        description: 'Issue and argument essay techniques',
      },
      {
        week: 5,
        topic: 'Data Interpretation & Analysis',
        description: 'Charts, graphs, and statistical reasoning',
      },
      {
        week: 6,
        topic: 'Practice Tests & Review',
        description: 'Full-length tests and performance analysis',
      },
    ],
    requirements: [
      "Bachelor's degree or equivalent",
      'Strong foundation in mathematics and English',
      'Graduate school application plans',
      'Commitment to intensive study schedule',
    ],
    whatYouWillLearn: [
      'Advanced quantitative reasoning skills',
      'Complex verbal reasoning strategies',
      'Analytical writing mastery',
      'Graduate school application guidance',
      'Score improvement guarantee',
    ],
  },
  {
    id: 5,
    slug: 'japanese-language',
    title: 'Japanese Language Course',
    description:
      'Learn Japanese from basics to intermediate level with focus on practical communication skills and cultural understanding.',
    image: '/website-template-OG.webp',
    duration: '20 weeks',
    level: 'Beginner to Intermediate',
    price: 'NPR 28,000',
    category: 'Language Learning',
    instructor: 'Tanaka Sensei',
    instructorBio:
      'Tanaka Sensei is a native Japanese speaker with JLPT N1 teaching certification and 7 years of experience teaching Japanese to international students.',
    rating: 4.8,
    studentsEnrolled: 134,
    features: [
      'Native Speaker Instruction',
      'Cultural Immersion',
      'JLPT Preparation',
      'Interactive Materials',
    ],
    curriculum: [
      {
        week: 1,
        topic: 'Hiragana & Basic Greetings',
        description: 'Japanese writing system and essential phrases',
      },
      {
        week: 2,
        topic: 'Katakana & Numbers',
        description: 'Second writing system and counting in Japanese',
      },
      {
        week: 3,
        topic: 'Basic Kanji & Grammar',
        description: 'Essential characters and sentence structure',
      },
      {
        week: 4,
        topic: 'Daily Conversations',
        description: 'Practical speaking skills for everyday situations',
      },
      {
        week: 5,
        topic: 'Cultural Context & Etiquette',
        description: 'Japanese culture and social norms',
      },
      {
        week: 6,
        topic: 'JLPT N5 Preparation',
        description: 'Test strategies and practice exercises',
      },
    ],
    requirements: [
      'No prior Japanese knowledge required',
      'Commitment to daily practice',
      'Interest in Japanese culture',
      'Participation in speaking activities',
    ],
    whatYouWillLearn: [
      'Reading and writing Hiragana, Katakana, and basic Kanji',
      'Conversational Japanese for daily situations',
      'Japanese cultural understanding',
      'JLPT N5 level proficiency',
      'Foundation for advanced Japanese study',
    ],
  },
  {
    id: 6,
    slug: 'study-abroad-counseling',
    title: 'Study Abroad Counseling',
    description:
      'Complete guidance for studying abroad including university selection, application process, and visa assistance.',
    image: '/website-template-OG.webp',
    duration: '6 months',
    level: 'All Levels',
    price: 'NPR 15,000',
    category: 'Counseling',
    instructor: 'Ms. Priya Sharma',
    instructorBio:
      'Ms. Priya Sharma is a certified education counselor with 12 years of experience helping students get admitted to top universities worldwide.',
    rating: 4.9,
    studentsEnrolled: 312,
    features: [
      'One-on-One Counseling',
      'Document Preparation',
      'Interview Preparation',
      'Post-Arrival Support',
    ],
    curriculum: [
      {
        week: 1,
        topic: 'Goal Setting & Country Selection',
        description: 'Identifying your academic and career goals',
      },
      {
        week: 2,
        topic: 'University Research & Selection',
        description: 'Finding the right programs and institutions',
      },
      {
        week: 3,
        topic: 'Application Strategy',
        description: 'Creating a compelling application portfolio',
      },
      {
        week: 4,
        topic: 'Personal Statement Writing',
        description: 'Crafting effective essays and statements',
      },
      {
        week: 5,
        topic: 'Scholarship & Financial Aid',
        description: 'Finding and applying for funding opportunities',
      },
      {
        week: 6,
        topic: 'Visa Process & Interview Prep',
        description: 'Navigating visa requirements and interviews',
      },
    ],
    requirements: [
      'Clear academic and career goals',
      'Academic transcripts and certificates',
      'Passport and identification documents',
      'Financial planning awareness',
    ],
    whatYouWillLearn: [
      'Strategic university selection process',
      'Application best practices',
      'Scholarship application skills',
      'Visa application procedures',
      'Pre-departure preparation',
    ],
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Parse price string to number for comparison
const parsePrice = (priceStr: string): number => {
  const match = priceStr.match(/[\d,]+/)
  if (!match) return 0
  return parseInt(match[0].replace(/,/g, ''), 10)
}

// API Functions
export const fetchCourses = async (params: CoursesQueryParams = {}): Promise<CoursesResponse> => {
  await delay(800) // Simulate network delay

  let filteredCourses = [...dummyCourses]

  // Apply filters
  if (params.category && params.category !== 'All Courses') {
    filteredCourses = filteredCourses.filter((course) => course.category === params.category)
  }

  if (params.level) {
    filteredCourses = filteredCourses.filter((course) => course.level === params.level)
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase()
    filteredCourses = filteredCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower) ||
        course.category.toLowerCase().includes(searchLower),
    )
  }

  if (params.priceRange) {
    filteredCourses = filteredCourses.filter((course) => {
      const price = parsePrice(course.price)
      return price >= params.priceRange!.min && price <= params.priceRange!.max
    })
  }

  // Apply sorting
  if (params.sortBy) {
    filteredCourses.sort((a, b) => {
      let aValue: string | number = a[params.sortBy!]
      let bValue: string | number = b[params.sortBy!]

      // Handle price sorting
      if (params.sortBy === 'price') {
        aValue = parsePrice(a.price)
        bValue = parsePrice(b.price)
      }

      // Handle duration sorting (convert to weeks for comparison)
      if (params.sortBy === 'duration') {
        aValue = parseInt(a.duration.match(/\d+/)?.[0] || '0', 10)
        bValue = parseInt(b.duration.match(/\d+/)?.[0] || '0', 10)
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (params.sortOrder === 'desc') {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0
      }
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
    })
  }

  // Apply pagination
  const page = params.page || 1
  const limit = params.limit || 12
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  const paginatedCourses = filteredCourses.slice(startIndex, endIndex)

  return {
    courses: paginatedCourses,
    total: filteredCourses.length,
    page,
    limit,
  }
}

export const fetchCourseBySlug = async (slug: string): Promise<Course | null> => {
  await delay(500) // Simulate network delay

  const course = dummyCourses.find((c) => c.slug === slug)
  return course || null
}

export const fetchCourseCategories = async (): Promise<CourseCategory[]> => {
  await delay(300) // Simulate network delay

  const categoryCounts: Record<string, number> = {}

  dummyCourses.forEach((course) => {
    categoryCounts[course.category] = (categoryCounts[course.category] || 0) + 1
  })

  const categories: CourseCategory[] = [
    { id: 'all', name: 'All Courses', count: dummyCourses.length },
  ]

  Object.entries(categoryCounts).forEach(([category, count]) => {
    categories.push({
      id: category.toLowerCase().replace(/\s+/g, '-'),
      name: category,
      count,
    })
  })

  return categories
}

export const fetchFeaturedCourses = async (limit: number = 3): Promise<Course[]> => {
  await delay(400) // Simulate network delay

  // Return top-rated courses as featured
  const featured = [...dummyCourses].sort((a, b) => b.rating - a.rating).slice(0, limit)

  return featured
}

export const fetchRelatedCourses = async (
  courseId: number,
  limit: number = 3,
): Promise<Course[]> => {
  await delay(400) // Simulate network delay

  const currentCourse = dummyCourses.find((c) => c.id === courseId)
  if (!currentCourse) return []

  // Find courses in the same category, excluding the current course
  const related = dummyCourses
    .filter((course) => course.id !== courseId && course.category === currentCourse.category)
    .slice(0, limit)

  // If not enough related courses in same category, fill with other courses
  if (related.length < limit) {
    const additional = dummyCourses
      .filter((course) => course.id !== courseId && !related.some((r) => r.id === course.id))
      .slice(0, limit - related.length)

    related.push(...additional)
  }

  return related
}
