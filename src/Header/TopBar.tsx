'use client'

import React from 'react'
import Link from 'next/link'
import { motion, MotionValue } from 'framer-motion'
import { Logo } from '@/components/Logo/Logo'
import Image from 'next/image'

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
          <Image src="/briteledu-logo.png" alt="Britel Education" width={200} height={20} />
        </Link>
      </div>
    </motion.div>
  )
}
