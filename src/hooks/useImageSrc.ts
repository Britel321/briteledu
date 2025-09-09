import { useMemo } from 'react'

type ImageType = string | { url?: string; alt?: string } | null

interface ImageInfo {
  src: string
  alt: string
}

export const useImageSrc = (image: ImageType, fallbackAlt: string = ''): ImageInfo | null => {
  return useMemo(() => {
    if (!image) return null

    if (typeof image === 'string') {
      return {
        src: image,
        alt: fallbackAlt,
      }
    }

    if (typeof image === 'object' && image.url) {
      return {
        src: image.url,
        alt: image.alt || fallbackAlt,
      }
    }

    return null
  }, [image, fallbackAlt])
}
