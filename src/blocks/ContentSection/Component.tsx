import React from 'react'
import type { ContentSectionBlock as ContentSectionBlockProps } from '@/payload-types'

export const ContentSectionBlock: React.FC<ContentSectionBlockProps> = ({
  links: _links,
  richText: _richText,
}) => {
  return (
    <section id="constituency" className="py-12 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <div className="section-header text-center mb-8 lg:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                About Our Constituency
              </h2>
              <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-8 mb-4 lg:mb-0">
            <div className="constituency-content">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Our constituency represents a diverse and vibrant community with rich history and
                bright future prospects. We are committed to serving every citizen with dedication
                and transparency.
              </p>
              <p className="text-gray-600 mb-4">
                Through collaborative efforts and community engagement, we work towards sustainable
                development, economic growth, and social welfare for all residents.
              </p>
              <p className="text-gray-600 mb-4">
                Our initiatives focus on education, healthcare, infrastructure development, and
                environmental conservation to ensure a better quality of life for current and future
                generations.
              </p>
              <p className="text-gray-800">
                <strong>
                  This is demonstration content showing the layout and structure of the constituency
                  section.
                </strong>
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 text-center">
            <div className="constituency-image-placeholder bg-gray-100 p-6 lg:p-8 rounded-lg">
              <i className="fas fa-map-marked-alt text-6xl text-blue-600 mb-4"></i>
              <p className="text-gray-600">Demo Constituency Map</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
