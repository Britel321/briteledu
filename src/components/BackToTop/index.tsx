'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface BackToTopProps {
  className?: string
  threshold?: number
}

export const BackToTop: React.FC<BackToTopProps> = ({ 
  className,
  threshold = 300 
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Animated background ring */}
      <div 
        className={cn(
          'absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
          'animate-pulse opacity-20 blur-sm',
          isVisible ? 'scale-100' : 'scale-0',
          'transition-transform duration-500'
        )}
      />
      
      {/* Glowing border effect */}
      <div 
        className={cn(
          'absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400',
          'animate-spin-slow opacity-30',
          isVisible ? 'scale-110' : 'scale-0',
          'transition-transform duration-700'
        )}
        style={{ animationDuration: '3s' }}
      />
      
      <Button
        onClick={scrollToTop}
        size="icon"
        className={cn(
          'relative h-14 w-14 rounded-full shadow-2xl transition-all duration-500',
          'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600',
          'hover:from-blue-500 hover:via-purple-500 hover:to-pink-500',
          'border-2 border-white/20 backdrop-blur-md',
          'hover:scale-110 hover:shadow-blue-500/25 hover:shadow-2xl',
          'active:scale-95',
          isVisible 
            ? 'opacity-100 translate-y-0 rotate-0' 
            : 'opacity-0 translate-y-10 rotate-12 pointer-events-none',
          className
        )}
        aria-label="Back to top"
      >
        {/* Inner glow effect */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
        
        {/* Icon with custom styling */}
        <ChevronUp className="h-6 w-6 text-white drop-shadow-lg relative z-10" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          <div className="absolute top-1 left-1/2 w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="absolute top-2 left-1/3 w-0.5 h-0.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-3 right-1/3 w-0.5 h-0.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        </div>
      </Button>
      
      {/* Tooltip */}
      <div 
        className={cn(
          'absolute bottom-full right-0 mb-2 px-3 py-1 text-xs text-white',
          'bg-black/80 backdrop-blur-sm rounded-lg whitespace-nowrap',
          'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          'pointer-events-none'
        )}
      >
        Back to top
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
      </div>
    </div>
  )
} 