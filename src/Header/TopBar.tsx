'use client'

import React from 'react'
import Link from 'next/link'
import { motion, MotionValue } from 'framer-motion'
import { Logo } from '@/components/Logo/Logo'

interface TopBarProps {
  opacity: MotionValue<number>
  y: MotionValue<number>
  pointerEvents: MotionValue<string>
  theme: string | null
}

export const TopBar: React.FC<TopBarProps> = ({ opacity, y, pointerEvents, theme }) => {
  return (
    <motion.div
      className="container relative z-30 hidden lg:block"
      style={{
        opacity,
        y,
        pointerEvents,
      }}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="py-4 lg:py-6 flex justify-center items-center">
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0" />
        </Link>
      </div>
    </motion.div>
  )
}
