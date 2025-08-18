'use client'

import React, { useEffect } from 'react'

interface GoogleTranslateProps {
  className?: string
}

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (options: any, element: string): any
          InlineLayout: {
            SIMPLE: number
            HORIZONTAL: number
            VERTICAL: number
          }
        }
      }
    }
    googleTranslateElementInit?: () => void
  }
}

export const GoogleTranslate: React.FC<GoogleTranslateProps> = ({ className = '' }) => {
  useEffect(() => {
    // Check if Google Translate is already loaded
    if (window.google && window.google.translate) {
      initializeTranslate()
      return
    }

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      initializeTranslate()
    }

    // Load Google Translate script
    const script = document.createElement('script')
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      delete window.googleTranslateElementInit
    }
  }, [])

  const initializeTranslate = () => {
    if (!window.google || !window.google.translate) return

    new window.google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,ne',
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
      multilanguagePage: true,
    }, 'google_translate_element')
  }

  return (
    <div className={className}>
      <div id="google_translate_element"></div>
    </div>
  )
} 