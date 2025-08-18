import { useState, useEffect, useCallback, useRef } from 'react'
import type { UseAutoSliderConfig } from '../types/slider'

export const useAutoSlider = ({
  totalSlides,
  interval,
  pauseOnHover = false,
  pauseOnFocus = false,
  infiniteLoop = true,
  startFromSlide = 0,
}: UseAutoSliderConfig) => {
  const [currentSlide, setCurrentSlide] = useState(() => {
    return Math.max(0, Math.min(startFromSlide, totalSlides - 1))
  })
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [progress, setProgress] = useState(0)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const pauseReasonRef = useRef<Set<string>>(new Set())
  const isUserNavigatingRef = useRef(false)

  // Enhanced navigation with direction tracking
  const nextSlide = useCallback(() => {
    setDirection('forward')
    setCurrentSlide((prev) => {
      if (infiniteLoop) {
        return (prev + 1) % totalSlides
      }
      return Math.min(prev + 1, totalSlides - 1)
    })
    setProgress(0) // Reset progress on manual navigation
  }, [totalSlides, infiniteLoop])

  const prevSlide = useCallback(() => {
    setDirection('backward')
    setCurrentSlide((prev) => {
      if (infiniteLoop) {
        return (prev - 1 + totalSlides) % totalSlides
      }
      return Math.max(prev - 1, 0)
    })
    setProgress(0) // Reset progress on manual navigation
  }, [totalSlides, infiniteLoop])

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides && index !== currentSlide) {
        setDirection(index > currentSlide ? 'forward' : 'backward')
        setCurrentSlide(index)
        setProgress(0)
        isUserNavigatingRef.current = true

        // Reset user navigation flag after a short delay
        setTimeout(() => {
          isUserNavigatingRef.current = false
        }, 100)
      }
    },
    [totalSlides, currentSlide],
  )

  // Enhanced pause/resume with reason tracking
  const pauseSlider = useCallback((reason = 'manual') => {
    pauseReasonRef.current.add(reason)
    setIsPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }, [])

  const resumeSlider = useCallback((reason = 'manual') => {
    pauseReasonRef.current.delete(reason)
    if (pauseReasonRef.current.size === 0) {
      setIsPlaying(true)
      setProgress(0)
    }
  }, [])

  // Force resume (clears all pause reasons)
  const forceResumeSlider = useCallback(() => {
    pauseReasonRef.current.clear()
    setIsPlaying(true)
    setProgress(0)
  }, [])

  // Check if we can auto-advance
  const canAutoAdvance = useCallback(() => {
    if (!infiniteLoop && currentSlide === totalSlides - 1) {
      return false
    }
    return totalSlides > 1
  }, [infiniteLoop, currentSlide, totalSlides])

  // Progress tracking effect
  useEffect(() => {
    if (isPlaying && canAutoAdvance() && !isUserNavigatingRef.current) {
      let progressCount = 0
      const progressStep = 100 / (interval / 50) // Update progress every 50ms

      progressIntervalRef.current = setInterval(() => {
        progressCount += progressStep
        setProgress(Math.min(progressCount, 100))
      }, 50)

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
      }
    }
  }, [isPlaying, interval, canAutoAdvance])

  // Main autoplay effect
  useEffect(() => {
    if (isPlaying && canAutoAdvance() && !isUserNavigatingRef.current) {
      intervalRef.current = setInterval(nextSlide, interval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, interval, nextSlide, canAutoAdvance])

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  return {
    currentSlide,
    direction,
    progress,
    nextSlide,
    prevSlide,
    goToSlide,
    isPlaying,
    pauseSlider,
    resumeSlider,
    forceResumeSlider,
    canGoNext: infiniteLoop || currentSlide < totalSlides - 1,
    canGoPrev: infiniteLoop || currentSlide > 0,
    isFirstSlide: currentSlide === 0,
    isLastSlide: currentSlide === totalSlides - 1,
    totalSlides,
  }
}
