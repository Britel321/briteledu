'use client'
import React from 'react'
import type { PrivacyPolicyBlock as PrivacyPolicyBlockProps } from '@/payload-types'
import { motion } from 'framer-motion'
import RichText from '@/components/RichText'

export const PrivacyPolicyBlock: React.FC<PrivacyPolicyBlockProps> = ({
  title,
  richText,
  lastUpdated,
  contactEmail,
  contactPhone,
}) => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-12"
        >
          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title || 'Privacy Policy'}
            </h1>
            <div className="section-divider w-24 h-1 bg-blue-600 mx-auto mb-6"></div>

            {lastUpdated && (
              <p className="text-sm text-gray-600 mb-4">
                Last updated:{' '}
                {new Date(lastUpdated).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="prose prose-lg max-w-none">
            {richText && (
              <RichText
                className="text-gray-700 leading-relaxed space-y-6"
                data={richText}
                enableGutter={false}
                enableProse={true}
              />
            )}
          </motion.div>

          {/* Contact Information */}
          {(contactEmail || contactPhone) && (
            <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
              <div className="space-y-2 text-gray-700">
                {contactEmail && (
                  <p>
                    <strong>Email:</strong>{' '}
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {contactEmail}
                    </a>
                  </p>
                )}
                {contactPhone && (
                  <p>
                    <strong>Phone:</strong>{' '}
                    <a
                      href={`tel:${contactPhone}`}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {contactPhone}
                    </a>
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Footer Note */}
          <motion.div
            variants={itemVariants}
            className="mt-8 pt-6 border-t border-gray-200 text-center"
          >
            <p className="text-sm text-gray-500">
              This privacy policy is effective as of the date listed above and may be updated
              periodically.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
