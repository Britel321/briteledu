'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

const ContactPageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    // Set header theme to light for better contrast on the contact page
    setHeaderTheme('light')
  }, [setHeaderTheme])

  return <React.Fragment />
}

export default ContactPageClient 