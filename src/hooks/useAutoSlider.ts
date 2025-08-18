import { useState, useEffect, useCallback, useRef } from 'react'

interface UseAutoSliderProps {
  totalSlides: number
  interval: number
  pauseOnHover?: boolean
}

export const useAutoSlider = ({
  totalSlides,
  interval,
  pauseOnHover = false,
}: UseAutoSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentSlide(index)
      }
    },
    [totalSlides],
  )

  const pauseSlider = useCallback(() => {
    setIsPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const resumeSlider = useCallback(() => {
    setIsPlaying(true)
  }, [])

  useEffect(() => {
    if (isPlaying && totalSlides > 1) {
      intervalRef.current = setInterval(nextSlide, interval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, interval, nextSlide, totalSlides])

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
    isPlaying,
    pauseSlider,
    resumeSlider,
  }
}
