'use client'
import React from 'react'
import type { ArticleSectionBlock as ArticleSectionBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { motion } from 'framer-motion'
import { ArrowRight, Newspaper, Users, TrendingUp, Award, Calendar, Clock } from 'lucide-react'
import Image from 'next/image'

export const ArticleSectionBlock: React.FC<ArticleSectionBlockProps> = ({
  links: _links,
  richText: _richText,
}) => {
  const articles = [
    {
      title: "Women's Rights Advocacy",
      excerpt:
        "Leading the charge for gender equality and women's empowerment in Nepal through legislative reforms and community initiatives.",
      icon: Users,
      image:
        'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606750/ubeqgxdmmaatptx1nikd.jpg',
      featured: true,
      date: 'March 15, 2024',
      readTime: '5 min read',
    },
    {
      title: 'Community Development',
      excerpt:
        'Building stronger communities through grassroots initiatives and sustainable development programs.',
      icon: TrendingUp,
      image:
        'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606723/nccnszxj8fitoxewyxrp.jpg',
      date: 'March 12, 2024',
      readTime: '3 min read',
    },
    {
      title: 'Parliamentary Reforms',
      excerpt:
        'Advocating for transparent governance and democratic reforms in the legislative process.',
      icon: Award,
      image:
        'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606750/ubeqgxdmmaatptx1nikd.jpg',
      date: 'March 10, 2024',
      readTime: '4 min read',
    },
    {
      title: 'Education Initiatives',
      excerpt:
        'Promoting quality education and literacy programs across rural communities in Nepal.',
      icon: Award,
      image:
        'https://res.cloudinary.com/dz3facqgc/image/upload/v1750606723/nccnszxj8fitoxewyxrp.jpg',
      date: 'March 8, 2024',
      readTime: '6 min read',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  }

  // Ensure we have articles to display
  if (!articles || articles.length === 0) {
    return null
  }

  const featuredArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <section id="latest-articles" className="py-8 lg:py-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Latest Articles</h2>
          <div className="section-divider w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Featured Article - Hero Style */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10"></div>
            <Image
              alt={featuredArticle?.title || 'Featured Article'}
              src={featuredArticle?.image || ''}
              width={1200}
              height={600}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 z-20 flex items-end">
              <div className="p-8 lg:p-12 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Users className="text-white text-xl" />
                  </div>
                  <span className="text-blue-200 text-sm font-medium">Featured Article</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  {featuredArticle?.title}
                </h3>
                <p className="text-lg text-gray-200 mb-6 max-w-2xl leading-relaxed">
                  {featuredArticle?.excerpt}
                </p>
                <div className="flex items-center gap-6 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredArticle?.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredArticle?.readTime}</span>
                  </div>
                </div>
                <CMSLink
                  url="/articles/womens-rights"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 group"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200 w-4 h-4" />
                </CMSLink>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {otherArticles.map((article, index) => (
            <motion.article
              key={index}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              variants={cardVariants}
            >
              <div className="relative overflow-hidden">
                <Image
                  alt={article.title}
                  src={article.image || ''}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <article.icon className="text-white text-lg" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {article.title}
                </h4>

                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{article.excerpt}</p>

                <CMSLink
                  url="/articles/article"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group/link"
                >
                  Read More
                  <ArrowRight className="ml-1 group-hover/link:translate-x-1 transition-transform duration-200 w-4 h-4" />
                </CMSLink>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* View More Articles Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <CMSLink
            url="/posts"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Newspaper className="mr-3 w-5 h-5" />
            View All Articles
          </CMSLink>
        </motion.div>
      </div>
    </section>
  )
}
