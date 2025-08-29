# Courses Implementation with TanStack Query

This directory contains the courses functionality implemented with TanStack Query for efficient data fetching, caching, and state management.

## Structure

```
courses/
├── components/
│   ├── CourseCard.tsx          # Individual course card component
│   ├── CourseFilters.tsx       # Filtering and search functionality
│   ├── CoursesList.tsx         # Main courses list with pagination
│   ├── ErrorMessage.tsx        # Error handling components
│   └── LoadingSpinner.tsx      # Loading states and skeletons
├── [courseSlug]/
│   ├── components/
│   │   └── CourseDetail.tsx    # Individual course detail page
│   ├── page.client.tsx         # Client-side logic for course detail
│   └── page.tsx                # Course detail page
├── page.client.tsx             # Client-side logic for courses list
├── page.tsx                    # Main courses page
└── README.md                   # This file
```

## Key Features

### 1. Data Fetching with TanStack Query
- **Caching**: Automatic caching with configurable stale times
- **Background Updates**: Data refreshes in the background
- **Error Handling**: Built-in error states and retry logic
- **Loading States**: Proper loading indicators and skeletons

### 2. Course Management Hooks

#### `useCourses(params)`
Fetch courses with filtering, sorting, and pagination:
```tsx
const { data, isLoading, error } = useCourses({
  category: 'Language Proficiency',
  search: 'IELTS',
  page: 1,
  limit: 12,
  sortBy: 'rating',
  sortOrder: 'desc'
})
```

#### `useCourse(slug)`
Fetch individual course details:
```tsx
const { data: course, isLoading, error } = useCourse('ielts-preparation')
```

#### `useCourseCategories()`
Fetch available course categories:
```tsx
const { data: categories } = useCourseCategories()
```

#### `useFeaturedCourses(limit)`
Fetch featured courses:
```tsx
const { data: featured } = useFeaturedCourses(3)
```

#### `useRelatedCourses(courseId, limit)`
Fetch related courses:
```tsx
const { data: related } = useRelatedCourses(1, 3)
```

### 3. Advanced Features

#### Prefetching
Courses are prefetched on hover for better UX:
```tsx
const { prefetchCourse } = usePrefetchCourse()

<Link 
  href={`/courses/${course.slug}`}
  onMouseEnter={() => prefetchCourse(course.slug)}
>
  Learn More
</Link>
```

#### Cache Invalidation
Manually invalidate cached data when needed:
```tsx
const { invalidateAllCourses, invalidateCourse } = useInvalidateCourses()

// Invalidate all courses data
invalidateAllCourses()

// Invalidate specific course
invalidateCourse('ielts-preparation')
```

### 4. Filtering and Search

The courses list supports:
- **Category filtering**: Filter by course categories
- **Search**: Full-text search across title, description, instructor
- **Level filtering**: Filter by course difficulty level
- **Price range**: Filter by price range
- **Sorting**: Sort by title, price, rating, popularity, duration

### 5. Error Handling

Comprehensive error handling with:
- **Retry logic**: Automatic retries with exponential backoff
- **User-friendly messages**: Clear error messages for users
- **Fallback states**: Graceful degradation when data fails to load

### 6. Loading States

Multiple loading states for better UX:
- **Skeleton loaders**: For course cards and lists
- **Spinner indicators**: For quick actions
- **Progressive loading**: Load essential content first

## Usage Examples

### Basic Course List
```tsx
import { useCourses } from '@/hooks/useCourses'

export function CourseList() {
  const { data, isLoading, error } = useCourses()
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} />
  
  return (
    <div>
      {data?.courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
```

### Filtered Course List
```tsx
const [filters, setFilters] = useState({
  category: 'Language Proficiency',
  search: '',
  page: 1,
  limit: 12
})

const { data, isLoading } = useCourses(filters)
```

### Course Detail with Related Courses
```tsx
export function CourseDetail({ slug }: { slug: string }) {
  const { data: course } = useCourse(slug)
  const { data: related } = useRelatedCourses(course?.id || 0, 3)
  
  return (
    <div>
      <CourseInfo course={course} />
      <RelatedCourses courses={related} />
    </div>
  )
}
```

## Configuration

Query configurations are set in the hooks with sensible defaults:
- **Stale Time**: 5-15 minutes depending on data type
- **Cache Time**: 10-60 minutes
- **Retry**: Up to 2 retries with exponential backoff
- **Refetch on Focus**: Disabled for better UX

## API Integration

The implementation uses a service layer (`courses-api.ts`) that can be easily adapted to work with:
- REST APIs
- GraphQL endpoints
- Database queries
- Third-party services

Currently uses mock data but the structure is ready for real API integration.
