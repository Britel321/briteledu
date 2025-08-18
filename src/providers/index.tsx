'use client'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

// Create a client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // With SSR, we usually want to set some default staleTime
      // above 0 to avoid refetching immediately on the client
      staleTime: 60 * 1000,
    },
  },
})

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
