'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Globe, Check } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { useLanguage } from '@/contexts/LanguageContext'

interface LanguageTranslatorProps {
  className?: string
  variant?: 'desktop' | 'mobile'
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
]

export const LanguageTranslator: React.FC<LanguageTranslatorProps> = ({
  className = '',
  variant = 'desktop',
}) => {
  const { currentLanguage, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom'>('bottom')
  const [dropdownAlignment, setDropdownAlignment] = useState<'left' | 'right'>('right')
  const switcherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleTouchOutside = (event: TouchEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    // Use mousedown for better mobile touch handling
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleTouchOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleTouchOutside)
    }
  }, [])

  const handleLanguageSelect = (languageCode: string) => {
    console.log('Language selected:', languageCode, 'variant:', variant)
    setLanguage(languageCode)
    setIsOpen(false)
  }

  const handleToggle = () => {
    console.log('Language translator toggle clicked, variant:', variant, 'isOpen:', isOpen)
    if (variant === 'mobile' && !isOpen) {
      // Check available space and set position accordingly
      if (switcherRef.current) {
        const rect = switcherRef.current.getBoundingClientRect()
        const spaceAbove = rect.top
        const spaceBelow = window.innerHeight - rect.bottom
        const dropdownHeight = 120 // Approximate height of dropdown
        const dropdownWidth = 160 // Approximate width of dropdown on mobile
        
        // Check if dropdown would overflow horizontally
        const spaceRight = window.innerWidth - rect.right
        const spaceLeft = rect.left
        const wouldOverflowRight = spaceRight < dropdownWidth
        const wouldOverflowLeft = spaceLeft < dropdownWidth
        
        // Check if dropdown would overflow vertically
        const wouldOverflowBottom = spaceBelow < dropdownHeight
        const wouldOverflowTop = spaceAbove < dropdownHeight
        
        // Set horizontal alignment
        if (wouldOverflowRight && !wouldOverflowLeft) {
          setDropdownAlignment('left')
        } else {
          setDropdownAlignment('right')
        }
        
        // Set vertical position based on available space
        if (wouldOverflowBottom && !wouldOverflowTop) {
          setDropdownPosition('top')
        } else if (wouldOverflowTop && !wouldOverflowBottom) {
          setDropdownPosition('bottom')
        } else {
          // Default to bottom if both positions work, or if both overflow
          setDropdownPosition('bottom')
        }
        
        console.log('Mobile dropdown position set to:', dropdownPosition, 'alignment:', dropdownAlignment)
      }
    }
    setIsOpen(!isOpen)
  }

  const selectedLang = languages.find((lang) => lang.code === currentLanguage) || languages[0]

  const buttonClasses =
    variant === 'desktop'
      ? 'flex items-center gap-2 px-4 py-2 text-white bg-transparent border border-white rounded-full hover:bg-white hover:text-gray-900 transition-colors duration-200'
      : 'flex items-center gap-2 px-3 py-2 text-sm text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200'

  const dropdownClasses =
    variant === 'desktop'
      ? 'absolute top-full right-0 mt-2 w-48 z-50'
      : dropdownPosition === 'top'
      ? dropdownAlignment === 'right'
        ? 'absolute bottom-full right-0 mb-2 w-40 sm:w-48 z-[60] max-w-[calc(100vw-2rem)]'
        : 'absolute bottom-full left-0 mb-2 w-40 sm:w-48 z-[60] max-w-[calc(100vw-2rem)]'
      : dropdownAlignment === 'right'
        ? 'absolute top-full right-0 mt-2 w-40 sm:w-48 z-[60] max-w-[calc(100vw-2rem)]'
        : 'absolute top-full left-0 mt-2 w-40 sm:w-48 z-[60] max-w-[calc(100vw-2rem)]'

  return (
    <div ref={switcherRef} className={cn('relative', className)} data-no-translate="true">
      {/* Language Switcher Button */}
      <button onClick={handleToggle} className={buttonClasses}>
        <Globe className="w-4 h-4" />
        <span className="text-sm">
          {selectedLang?.flag} {selectedLang?.name}
        </span>
      </button>

      {/* Language Dropdown */}
      {isOpen && (
        <div
          className={cn(
            'bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700',
            dropdownClasses,
            variant === 'mobile' && 'max-h-48 overflow-y-auto min-w-[160px] mobile-language-dropdown'
          )}
        >
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  currentLanguage === language.code
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-900 dark:text-white'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="flex-1 text-left">{language.name}</span>
                {currentLanguage === language.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 