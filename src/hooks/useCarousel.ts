import { useState, useCallback } from 'react'

interface UseCarouselProps {
  itemsLength: number
  transitionDuration?: number
}

export const useCarousel = ({ itemsLength, transitionDuration = 600 }: UseCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const next = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === itemsLength - 1 ? 0 : prev + 1))
    setTimeout(() => setIsTransitioning(false), transitionDuration)
  }, [itemsLength, isTransitioning, transitionDuration])

  const previous = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === 0 ? itemsLength - 1 : prev - 1))
    setTimeout(() => setIsTransitioning(false), transitionDuration)
  }, [itemsLength, isTransitioning, transitionDuration])

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === currentIndex) return
      setIsTransitioning(true)
      setCurrentIndex(index)
      setTimeout(() => setIsTransitioning(false), transitionDuration)
    },
    [currentIndex, isTransitioning, transitionDuration],
  )

  return {
    currentIndex,
    isTransitioning,
    next,
    previous,
    goTo,
  }
}
