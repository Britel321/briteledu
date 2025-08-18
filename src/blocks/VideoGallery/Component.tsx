'use client'
import React, { useState } from 'react'
import type { VideoGalleryBlock as VideoGalleryBlockProps } from '@/payload-types'
import { motion } from 'framer-motion'
import { X, Video, Play } from 'lucide-react'
import { CMSLink } from '@/components/Link'

const extractYouTubeVideoId = (url: string | undefined): string | null => {
  if (!url) return null
  const patterns = [/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

const VideoGallery: React.FC<VideoGalleryBlockProps> = ({ title, description, videos, links }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const openVideo = (embedUrl: string) => {
    const videoId = extractYouTubeVideoId(embedUrl)
    if (videoId) {
      setSelectedVideo(videoId)
    } else {
      alert('Invalid YouTube URL provided.')
    }
  }

  const closeVideo = () => {
    setSelectedVideo(null)
  }

  const button = links?.[0]?.link

  return (
    <section
      id="video-gallery"
      className="py-4 lg:py-5 bg-gradient-to-br from-slate-50 to-slate-100"
    >
      <div className="container">
        <div className="text-center mb-4 lg:mb-5">
          <h2 className="text-4xl font-bold mb-4 text-primary">{title}</h2>
          <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {videos &&
            videos.slice(0, 3).map((video, index) => {
              const videoId = extractYouTubeVideoId(video.embedUrl)
              const thumbnailUrl = videoId
                ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                : ''

              return (
                <div
                  key={index}
                  className="video-card h-full cursor-pointer group bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => openVideo(video.embedUrl)}
                >
                  <div
                    className="video-thumbnail h-56 bg-cover bg-center relative flex items-center justify-center"
                    style={{
                      backgroundImage: thumbnailUrl
                        ? `url(${thumbnailUrl})`
                        : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1"
                        >
                          <polygon points="5,3 19,12 5,21"></polygon>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-3 leading-tight">
                      {video.title}
                    </h3>
                  </div>
                </div>
              )
            })}
        </div>

        {/* Show More Videos Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <CMSLink
            url="/videos"
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
          >
            <Play className="mr-3 w-5 h-5" />
            Show More Videos
          </CMSLink>
        </motion.div>

        {button && (
          <div className="text-center mt-8">
            <CMSLink
              {...button}
              className="inline-flex items-center px-8 py-4 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg hover:shadow-xl rounded-lg"
            >
              <Video className="mr-2 w-5 h-5" />
              {button.label}
            </CMSLink>
          </div>
        )}
      </div>

      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeVideo}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                className="w-full h-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Video Player"
              ></iframe>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}

export const VideoGalleryBlock: React.FC<VideoGalleryBlockProps> = (props) => {
  return <VideoGallery {...props} />
}
