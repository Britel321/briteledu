'use client'

import React, { useState, useMemo } from 'react'
import type { FAQBlock as FAQBlockProps } from '@/payload-types'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ChevronDown,
  Plus,
  Minus,
  Star,
  X,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & FAQBlockProps

export const FAQBlock: React.FC<Props> = ({
  className,
  title = 'Frequently Asked Questions',
  subtitle,
  enableSearch = true,
  searchPlaceholder = 'Search frequently asked questions...',
  layout = 'accordion',
  allowMultipleOpen = false,
  faqs = [],
  showCategories = false,
  style: _style = 'modern',
  accentColor = 'blue',
  backgroundColor = 'light',
  animationStyle = 'smooth',
}) => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = faqs
      .map((faq) => faq.category)
      .filter((cat): cat is string => Boolean(cat))
      .filter((cat, index, arr) => arr.indexOf(cat) === index)
    return cats
  }, [faqs])

  // Filter FAQs based on search and category
  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        !searchTerm ||
        faq.question?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = !selectedCategory || faq.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [faqs, searchTerm, selectedCategory])

  // Sort FAQs - featured first
  const sortedFAQs = useMemo(() => {
    return [...filteredFAQs].sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return 0
    })
  }, [filteredFAQs])

  const handleToggle = (index: number) => {
    const newOpenIndices = new Set(openIndices)

    if (allowMultipleOpen) {
      if (newOpenIndices.has(index)) {
        newOpenIndices.delete(index)
      } else {
        newOpenIndices.add(index)
      }
    } else {
      if (newOpenIndices.has(index)) {
        newOpenIndices.clear()
      } else {
        newOpenIndices.clear()
        newOpenIndices.add(index)
      }
    }

    setOpenIndices(newOpenIndices)
  }

  // Style configurations
  const backgroundClasses = {
    light: 'bg-gray-50',
    white: 'bg-white',
    gradient: 'bg-gradient-to-br from-blue-50 via-white to-indigo-50',
    transparent: 'bg-transparent',
  }

  const accentColorClasses = {
    blue: {
      primary: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      hover: 'hover:bg-blue-100',
      ring: 'focus:ring-blue-500',
      gradient: 'from-blue-500 to-indigo-600',
    },
    purple: {
      primary: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      hover: 'hover:bg-purple-100',
      ring: 'focus:ring-purple-500',
      gradient: 'from-purple-500 to-pink-600',
    },
    green: {
      primary: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      hover: 'hover:bg-green-100',
      ring: 'focus:ring-green-500',
      gradient: 'from-green-500 to-teal-600',
    },
    orange: {
      primary: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      hover: 'hover:bg-orange-100',
      ring: 'focus:ring-orange-500',
      gradient: 'from-orange-500 to-red-600',
    },
    pink: {
      primary: 'text-pink-600',
      bg: 'bg-pink-50',
      border: 'border-pink-200',
      hover: 'hover:bg-pink-100',
      ring: 'focus:ring-pink-500',
      gradient: 'from-pink-500 to-rose-600',
    },
    teal: {
      primary: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      hover: 'hover:bg-teal-100',
      ring: 'focus:ring-teal-500',
      gradient: 'from-teal-500 to-cyan-600',
    },
  }

  const colors = accentColorClasses[accentColor as keyof typeof accentColorClasses]

  // Animation variants
  const animationVariants = {
    smooth: {
      initial: { height: 0, opacity: 0 },
      animate: { height: 'auto', opacity: 1 },
      exit: { height: 0, opacity: 0 },
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    bouncy: {
      initial: { height: 0, opacity: 0, scale: 0.95 },
      animate: { height: 'auto', opacity: 1, scale: 1 },
      exit: { height: 0, opacity: 0, scale: 0.95 },
      transition: { duration: 0.4, type: 'spring', bounce: 0.3 },
    },
    spring: {
      initial: { height: 0, opacity: 0, y: -20 },
      animate: { height: 'auto', opacity: 1, y: 0 },
      exit: { height: 0, opacity: 0, y: -20 },
      transition: { duration: 0.5, type: 'spring', stiffness: 100 },
    },
    minimal: {
      initial: { height: 0, opacity: 0 },
      animate: { height: 'auto', opacity: 1 },
      exit: { height: 0, opacity: 0 },
      transition: { duration: 0.2 },
    },
  }

  const currentAnimation = animationVariants[animationStyle as keyof typeof animationVariants]

  return (
    <section
      className={cn(
        'py-12 md:py-16 lg:py-20',
        backgroundClasses[backgroundColor as keyof typeof backgroundClasses],
        className,
      )}
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header Section */}
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            {title && (
              <div className="relative inline-block">
                <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                  {title}
                </h2>
              </div>
            )}
            {subtitle && (
              <motion.p
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Search and Filter Section */}
        {(enableSearch || (showCategories && categories.length > 0)) && (
          <motion.div
            className="mb-8 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {enableSearch && (
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={searchPlaceholder || 'Search frequently asked questions...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    'w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-gray-200',
                    'focus:border-transparent focus:outline-none transition-all duration-300',
                    'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl',
                    `focus:ring-4 ${colors.ring} focus:ring-opacity-20`,
                  )}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {showCategories && categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                <motion.button
                  onClick={() => setSelectedCategory(null)}
                  className={cn(
                    'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    !selectedCategory
                      ? `${colors.bg} ${colors.primary} border-2 ${colors.border}`
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200',
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  All
                </motion.button>
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300',
                      selectedCategory === category
                        ? `${colors.bg} ${colors.primary} border-2 ${colors.border}`
                        : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200',
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* FAQ Items */}
        {sortedFAQs.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No FAQs found matching your criteria.</p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className={cn(
                  'mt-4 px-6 py-2 rounded-lg font-medium transition-all duration-300',
                  `${colors.primary} ${colors.hover}`,
                )}
              >
                Clear search
              </button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {sortedFAQs.map((faq, idx) => {
              const isOpen = openIndices.has(idx)
              const isFeatured = faq.featured

              return (
                <motion.div
                  key={`${faq.question}-${idx}`}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl transition-all duration-300',
                    'bg-white/80 backdrop-blur-sm border-2',
                    isOpen
                      ? `${colors.border} shadow-xl`
                      : 'border-gray-200 shadow-lg hover:shadow-xl',
                    isFeatured && 'ring-2 ring-yellow-300 ring-opacity-50',
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                >
                  {isFeatured && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </div>
                    </div>
                  )}

                  <motion.button
                    className={cn(
                      'w-full flex justify-between items-start px-6 md:px-8 py-6 text-left',
                      'focus:outline-none transition-all duration-300',
                      `focus:ring-4 ${colors.ring} focus:ring-opacity-20`,
                      isOpen && `${colors.bg}`,
                    )}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    onClick={() => handleToggle(idx)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-1 pr-4">
                      <h3
                        className={cn(
                          'font-bold text-lg md:text-xl text-gray-900 leading-tight',
                          'group-hover:text-gray-700 transition-colors duration-300',
                        )}
                      >
                        {faq.question}
                      </h3>
                      {faq.category && (
                        <span
                          className={cn(
                            'inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full',
                            `${colors.bg} ${colors.primary}`,
                          )}
                        >
                          {faq.category}
                        </span>
                      )}
                    </div>
                    <motion.div
                      className={cn(
                        'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
                        'transition-all duration-300',
                        isOpen
                          ? `${colors.primary} ${colors.bg}`
                          : 'text-gray-400 bg-gray-100 group-hover:bg-gray-200',
                      )}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {layout === 'minimal' ? (
                        isOpen ? (
                          <Minus className="w-5 h-5" />
                        ) : (
                          <Plus className="w-5 h-5" />
                        )
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </motion.div>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${idx}`}
                        initial={currentAnimation.initial}
                        animate={currentAnimation.animate}
                        exit={currentAnimation.exit}
                        transition={
                          animationStyle === 'smooth'
                            ? { duration: 0.3 }
                            : animationStyle === 'bouncy'
                              ? { duration: 0.4, type: 'spring', bounce: 0.3 }
                              : animationStyle === 'spring'
                                ? { duration: 0.5, type: 'spring', stiffness: 100 }
                                : { duration: 0.2 }
                        }
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-8 pb-6 pt-2">
                          <motion.div
                            className="prose prose-gray max-w-none"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            {typeof faq.answer === 'string' ? (
                              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                {faq.answer}
                              </p>
                            ) : (
                              <RichText data={faq.answer} enableGutter={false} />
                            )}
                          </motion.div>

                          {faq.tags && (
                            <motion.div
                              className="mt-4 pt-4 border-t border-gray-200"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            >
                              <div className="flex flex-wrap gap-2">
                                {faq.tags.split(',').map((tag, tagIdx) => (
                                  <span
                                    key={tagIdx}
                                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md"
                                  >
                                    {tag.trim()}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
