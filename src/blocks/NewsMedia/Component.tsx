'use client'
import React from 'react'
import type { NewsMediaBlock as NewsMediaBlockProps } from '@/payload-types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CalendarIcon, Newspaper } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { useNewsData } from '@/hooks/useNewsData'

export const NewsMediaBlock: React.FC<NewsMediaBlockProps> = ({ section }) => {
  const { data: mediaContent, isLoading, error } = useNewsData()

  if (isLoading) {
    return (
      <section id="news-media" className="py-12 lg:py-20">
        <div className="container">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="news-media" className="py-12 lg:py-20">
        <div className="container">
          <div className="text-center">
            <p className="text-red-600">Error loading news content</p>
          </div>
        </div>
      </section>
    )
  }

  if (!mediaContent || mediaContent.length === 0) {
    return null
  }

  const featuredArticle = mediaContent[0]
  const otherArticles = mediaContent.slice(1)

  return (
    <section id="news-media" className="py-8">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{section}</h2>
          <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Article - Large Left Card */}
          {featuredArticle && (
            <motion.div
              className="lg:col-span-1 w-full h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center text-sm text-gray-200 mb-3">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span>{featuredArticle.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold leading-tight">{featuredArticle.title}</h3>
                </div>
              </div>
            </motion.div>
          )}

          {/* Right Column with 4 Smaller Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherArticles.map((article, index) => (
              <motion.div
                key={article.id}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-48"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-full">
                  <Image src={article.image} alt={article.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center text-sm text-gray-200 mb-2">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{article.date}</span>
                    </div>
                    <h4 className="text-base font-semibold leading-tight">{article.title}</h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All News and Media Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <CMSLink
            url="/news"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
          >
            <Newspaper className="mr-3 w-5 h-5" />
            View All News and Media
          </CMSLink>
        </motion.div>
      </div>
    </section>
  )
}
