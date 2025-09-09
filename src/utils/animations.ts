import { Variants } from 'framer-motion'

export const quoteVariants: Variants = {
  enter: {
    opacity: 0,
    y: 20,
  },
  center: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
}

export const headerVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export const defaultTransition = {
  duration: 0.6,
  ease: 'easeInOut' as const,
}

export const headerTransition = {
  duration: 0.6,
}
