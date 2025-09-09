import { useState, useEffect, useCallback, useRef } from 'react'

interface UseAutoPlayProps {
  isEnabled: boolean
  interval: number
  onNext: () => void
  isTransitioning: boolean
}

interface UseAutoPlayReturn {
  isPlaying: boolean
  toggle: () => void
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

export const useAutoPlay = ({
  isEnabled,
  interval,
  onNext,
  isTransitioning,
}: UseAutoPlayProps): UseAutoPlayReturn => {
  const [isPlaying, setIsPlaying] = useState(isEnabled)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isPausedOnHoverRef = useRef(false)

  // Clear interval helper
  const clearAutoPlayInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Start interval helper
  const startAutoPlayInterval = useCallback(() => {
    if (isEnabled && isPlaying && !isPausedOnHoverRef.current && !isTransitioning) {
      clearAutoPlayInterval()
      intervalRef.current = setInterval(onNext, interval)
    }
  }, [isEnabled, isPlaying, isTransitioning, interval, onNext, clearAutoPlayInterval])

  // Toggle play/pause
  const toggle = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  // Handle mouse enter (pause on hover)
  const handleMouseEnter = useCallback(() => {
    isPausedOnHoverRef.current = true
    clearAutoPlayInterval()
  }, [clearAutoPlayInterval])

  // Handle mouse leave (resume on hover out)
  const handleMouseLeave = useCallback(() => {
    isPausedOnHoverRef.current = false
    if (isPlaying) {
      startAutoPlayInterval()
    }
  }, [isPlaying, startAutoPlayInterval])

  // Effect to handle autoplay state changes
  useEffect(() => {
    if (isPlaying) {
      startAutoPlayInterval()
    } else {
      clearAutoPlayInterval()
    }

    return clearAutoPlayInterval
  }, [isPlaying, startAutoPlayInterval, clearAutoPlayInterval])

  // Effect to handle transitioning state changes
  useEffect(() => {
    if (isTransitioning) {
      clearAutoPlayInterval()
    } else if (isPlaying && !isPausedOnHoverRef.current) {
      startAutoPlayInterval()
    }
  }, [isTransitioning, isPlaying, startAutoPlayInterval, clearAutoPlayInterval])

  // Cleanup on unmount
  useEffect(() => {
    return clearAutoPlayInterval
  }, [clearAutoPlayInterval])

  return {
    isPlaying,
    toggle,
    handleMouseEnter,
    handleMouseLeave,
  }
}
