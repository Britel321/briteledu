import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import type { SocialBlock as SocialProps } from '@/payload-types'

import { Media } from '../../components/Media'

// Utility function to extract video ID from YouTube URLs
// This function handles various YouTube URL formats:
// - https://www.youtube.com/embed/VIDEO_ID
// - https://www.youtube.com/watch?v=VIDEO_ID
// - https://youtu.be/VIDEO_ID
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

type Props = SocialProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const SocialBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    staticImage,
    disableInnerContainer,
    // New config fields
    title = 'Social Media Updates',
    description,
    facebook,
    twitter,
    youtube,
    layout,
    media,
    caption,
  } = props

  // Layout settings
  const columns = layout?.columns || '3'
  const spacing = layout?.spacing || '8'
  const backgroundColor = layout?.backgroundColor || 'gray-50'

  // Grid classes based on columns
  const getGridClasses = () => {
    switch (columns) {
      case '1':
        return 'grid-cols-1'
      case '2':
        return 'grid-cols-1 md:grid-cols-2'
      case '3':
      default:
        return 'grid-cols-1 lg:grid-cols-3 md:grid-cols-2'
    }
  }

  // Spacing classes
  const getSpacingClasses = () => {
    switch (spacing) {
      case '4':
        return 'gap-4'
      case '12':
        return 'gap-12'
      case '8':
      default:
        return 'gap-8'
    }
  }

  // Background color classes
  const getBackgroundClasses = () => {
    switch (backgroundColor) {
      case 'white':
        return 'bg-white'
      case 'blue-50':
        return 'bg-blue-50'
      case 'green-50':
        return 'bg-green-50'
      case 'gray-50':
      default:
        return 'bg-gray-50'
    }
  }

  // Build Facebook iframe URL
  const buildFacebookUrl = () => {
    if (!facebook?.pageUrl) return ''

    const params = new URLSearchParams({
      href: facebook.pageUrl,
      tabs: facebook.tabs || 'timeline',
      width: '800',
      height: (facebook.height || 520).toString(),
      small_header: (!facebook.showHeader).toString(),
      adapt_container_width: 'true',
      hide_cover: (!facebook.showCover).toString(),
      show_facepile: (facebook.showFacepile || true).toString(),
      appId: '555639014960254',
    })

    return `https://www.facebook.com/plugins/page.php?${params.toString()}`
  }

  return (
    <section id="social-updates" className={cn('py-8 lg:py-12', getBackgroundClasses(), className)}>
      <div
        className={cn('container', {
          container: enableGutter,
        })}
      >
        {/* Section Header */}
        {(title || description) && (
          <div className="text-center mb-8 lg:mb-12">
            {title && <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>}
            <div className="section-divider w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
        )}

        <div className={cn('grid', getGridClasses(), getSpacingClasses())}>
          {/* Facebook Widget */}
          {facebook?.enabled && (
            <div className="social-widget">
              <div className="social-content bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative" style={{ height: `${facebook.height || 520}px` }}>
                  <iframe
                    src={buildFacebookUrl()}
                    width="100%"
                    height={facebook.height || 520}
                    className="border-0 rounded-xl bg-white block w-full h-full"
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={false}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title="Facebook Page"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Twitter Widget */}
          {twitter?.enabled && (
            <div className="social-widget">
              <div className="social-content bg-white rounded-xl shadow-lg">
                <div
                  className="flex flex-col items-center justify-center p-6"
                  style={{ height: `${twitter.height || 400}px` }}
                >
                  <svg
                    className="w-16 h-16 text-gray-400 mb-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <p className="text-gray-600 mb-2 text-center">
                    {twitter.placeholderText ||
                      'Here is detailed information about Chanda Chaudhary&apos;s political journey and social contributions.'}
                  </p>
                  <small className="text-gray-500">Social Networks</small>
                </div>
              </div>
            </div>
          )}

          {/* YouTube Widget */}
          {youtube?.enabled && (
            <div className="social-widget lg:col-span-1 md:col-span-2">
              <div className="social-content space-y-4">
                {youtube.videos && youtube.videos.length > 0 ? (
                  youtube.videos.map((video, index) => {
                    const videoId = extractYouTubeVideoId(video.embedUrl ?? undefined)

                    return (
                      <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {videoId ? (
                          <div className="aspect-video">
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              className="w-full h-full rounded-lg"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={video.title}
                            />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-32 text-center p-6">
                            <svg
                              className="w-12 h-12 text-gray-400 mb-2"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            <p className="text-sm text-gray-600">
                              {video.description || 'Could not load video. Please check the URL.'}
                            </p>
                            {video.embedUrl && (
                              <p className="text-xs text-red-500 mt-2">
                                Invalid URL: {video.embedUrl}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  })
                ) : (
                  // Default demo videos if none configured
                  <>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h6 className="font-semibold mb-3 text-gray-800">Demo Video 1</h6>
                      <div className="flex flex-col items-center justify-center h-32 text-center">
                        <svg
                          className="w-12 h-12 text-gray-400 mb-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <p className="text-sm text-gray-600">
                          Here is detailed information about Chanda Chaudhary&apos;s political
                          journey and social contributions.
                        </p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h6 className="font-semibold mb-3 text-gray-800">Demo Video 2</h6>
                      <div className="flex flex-col items-center justify-center h-32 text-center">
                        <svg
                          className="w-12 h-12 text-gray-400 mb-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                        <p className="text-sm text-gray-600">
                          Here is detailed information about Chanda Chaudhary&apos;s political
                          journey and social contributions.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Additional Media */}
        {media && (
          <div className="mt-8">
            <Media
              imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
              resource={media}
              src={staticImage}
            />
          </div>
        )}

        {/* Additional Caption */}
        {caption && (
          <div
            className={cn(
              'mt-6',
              {
                container: !disableInnerContainer,
              },
              captionClassName,
            )}
          >
            <RichText data={caption} enableGutter={false} />
          </div>
        )}
      </div>
    </section>
  )
}
