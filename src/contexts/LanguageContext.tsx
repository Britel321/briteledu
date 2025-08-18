'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LanguageContextType {
  currentLanguage: string
  setLanguage: (language: string) => void
  isTranslating: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [isTranslating, setIsTranslating] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('website-language')
    if (savedLanguage && savedLanguage !== currentLanguage) {
      setCurrentLanguage(savedLanguage)
    }
  }, [currentLanguage])

  const setLanguage = (language: string) => {
    console.log('Language switching to:', language)
    setCurrentLanguage(language)
    localStorage.setItem('website-language', language)
    
    // Set the cookie for Google Translate and reload the page
    document.cookie = `googtrans=/en/${language};path=/`
    console.log('Cookie set, reloading page...')
    window.location.reload()
  }

  const value: LanguageContextType = {
    currentLanguage,
    setLanguage,
    isTranslating,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 