'use client'
import React from 'react'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'

import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import { cn } from '@/utilities/ui'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  SliderBlock as SliderBlockProps,
  AboutBlock as AboutBlockProps,
  ArticleSectionBlock as ArticleSectionBlockProps,
  ContentSectionBlock as ContentSectionBlockProps,
  PhotoGalleryBlock as PhotoGalleryBlockProps,
  VideoGalleryBlock as VideoGalleryBlockProps,
  NewsMediaBlock as NewsMediaBlockProps,
  SimpleSliderBlock as SimpleSliderBlockProps,
  PrivacyPolicyBlock as PrivacyPolicyBlockProps,
  TermsOfServiceBlock as TermsOfServiceBlockProps,
  QuoteCarouselBlock as QuoteCarouselBlockProps,
  FAQBlock as FAQBlockProps,
  UniversitiesBlock as UniversitiesBlockProps,
  BasicSlider as BasicSliderBlockProps,
  UniversityGroupBlock as UniversityGroupBlockProps,
  VideoModalHeroBlock as VideoModalHeroBlockProps,
  JourneyWithUsBlock as JourneyWithUsBlockProps,
  TestimonialsBlock as TestimonialsBlockProps,
} from '@/payload-types'

import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { SliderBlock } from '@/blocks/Sliders/Component'
import { AboutBlock } from '@/blocks/About/Component'
import { ArticleSectionBlock } from '@/blocks/ArticleSection/Component'
import { ContentSectionBlock } from '@/blocks/ContentSection/Component'
import { PhotoGalleryBlock } from '@/blocks/PhotoGallery/Component'
import { VideoGalleryBlock } from '@/blocks/VideoGallery/Component'
import { NewsMediaBlock } from '@/blocks/NewsMedia/Component'
import { SimpleSliderBlock } from '@/blocks/SimpleSlider/Component'
import { PrivacyPolicyBlock } from '@/blocks/PrivacyPolicy/Component'
import { TermsOfServiceBlock } from '@/blocks/TermsOfService/Component'
import { QuoteCarouselBlock } from '@/blocks/QuoteCarousel/Component'
import { FAQBlock } from '@/blocks/FAQ/Component'
import { UniversitiesBlock } from '@/blocks/Universities/Component'
import { BasicSlider } from '@/blocks/BasicSlider/Component'
import { UniversityGroupBlock } from '@/blocks/UniversityGroupBlock/Component'
import { VideoModalHeroBlock } from '@/blocks/VideoModalHeroBlock/Component'
import { JourneyWithUsBlock } from '@/blocks/JourneyWithUsBlock/Component'
import { TestimonialsBlock } from '@/blocks/Testimonials/Component'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      | CTABlockProps
      | MediaBlockProps
      | BannerBlockProps
      | CodeBlockProps
      | SliderBlockProps
      | AboutBlockProps
      | ArticleSectionBlockProps
      | ContentSectionBlockProps
      | PhotoGalleryBlockProps
      | VideoGalleryBlockProps
      | NewsMediaBlockProps
      | SimpleSliderBlockProps
      | PrivacyPolicyBlockProps
      | TermsOfServiceBlockProps
      | QuoteCarouselBlockProps
      | FAQBlockProps
      | UniversitiesBlockProps
      | BasicSliderBlockProps
      | UniversityGroupBlockProps
      | VideoModalHeroBlockProps
      | JourneyWithUsBlockProps
      | TestimonialsBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

// Enhanced typography components
const EnhancedHeading = ({ level, children, className = '', ...props }: any) => {
  const baseStyles = 'font-bold text-gray-900 leading-tight tracking-tight'

  const levelStyles = {
    1: 'text-3xl md:text-4xl lg:text-5xl mb-6 mt-8 first:mt-0 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent',
    2: 'text-2xl md:text-3xl lg:text-4xl mb-5 mt-8 first:mt-0 relative',
    3: 'text-xl md:text-2xl lg:text-3xl mb-4 mt-6 first:mt-0 text-gray-800',
    4: 'text-lg md:text-xl lg:text-2xl mb-3 mt-5 first:mt-0 text-gray-800',
    5: 'text-base md:text-lg lg:text-xl mb-3 mt-4 first:mt-0 text-gray-700',
    6: 'text-sm md:text-base lg:text-lg mb-2 mt-3 first:mt-0 text-gray-700 uppercase tracking-wider',
  }

  const headingProps = {
    className: cn(baseStyles, levelStyles[level as keyof typeof levelStyles], className),
    ...props,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative"
    >
      {level === 1 && <h1 {...headingProps}>{children}</h1>}
      {level === 2 && <h2 {...headingProps}>{children}</h2>}
      {level === 3 && <h3 {...headingProps}>{children}</h3>}
      {level === 4 && <h4 {...headingProps}>{children}</h4>}
      {level === 5 && <h5 {...headingProps}>{children}</h5>}
      {level === 6 && <h6 {...headingProps}>{children}</h6>}

      {level === 2 && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '3rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"
        />
      )}
    </motion.div>
  )
}

const EnhancedParagraph = ({ children, className = '', ...props }: any) => (
  <motion.p
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className={cn(
      'text-base md:text-lg leading-relaxed text-gray-700 mb-6 last:mb-0',
      'hover:text-gray-900 transition-colors duration-300',
      className,
    )}
    {...props}
  >
    {children}
  </motion.p>
)

const EnhancedBlockquote = ({ children, className = '', ...props }: any) => (
  <motion.blockquote
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className={cn(
      'relative pl-6 md:pl-8 py-4 my-8 italic text-lg md:text-xl text-gray-700',
      'border-l-4 border-blue-600 bg-blue-50/50 rounded-r-lg',
      'before:content-["""] before:absolute before:-top-2 before:-left-2',
      'before:text-6xl before:text-blue-600/30 before:font-serif before:leading-none',
      'hover:bg-blue-50 transition-colors duration-300',
      className,
    )}
    {...props}
  >
    <div className="relative z-10">{children}</div>
  </motion.blockquote>
)

const EnhancedList = ({ listType, children, className = '', ...props }: any) => {
  const Tag = listType === 'bullet' ? 'ul' : 'ol'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="my-6"
    >
      <Tag
        className={cn(
          'space-y-3 text-gray-700 text-base md:text-lg leading-relaxed',
          listType === 'bullet' ? 'list-disc list-inside' : 'list-decimal list-inside',
          'marker:text-blue-600 marker:font-medium',
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    </motion.div>
  )
}

const EnhancedListItem = ({ children, className = '', ...props }: any) => (
  <motion.li
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className={cn(
      'pl-2 hover:text-gray-900 transition-colors duration-300',
      'relative before:absolute before:left-0 before:top-0 before:w-0 before:h-full',
      'before:bg-blue-100 before:transition-all before:duration-300 hover:before:w-full',
      'before:z-[-1] before:rounded',
      className,
    )}
    {...props}
  >
    <span className="relative z-10">{children}</span>
  </motion.li>
)

const EnhancedLink = ({ href, children, className = '', ...props }: any) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={cn(
      'text-blue-600 hover:text-blue-800 font-medium underline decoration-blue-300',
      'hover:decoration-blue-600 underline-offset-2 transition-all duration-300',
      'relative inline-flex items-center gap-1',
      className,
    )}
    {...props}
  >
    {children}
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: [0, 2, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <LucideIcons.ExternalLink className="w-3 h-3 opacity-70" />
    </motion.div>
  </motion.a>
)

const EnhancedCode = ({ children, className = '', ...props }: any) => (
  <motion.code
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={cn(
      'px-2 py-1 text-sm font-mono bg-gray-100 text-gray-800 rounded',
      'border border-gray-200 hover:bg-gray-200 hover:border-gray-300',
      'transition-all duration-200',
      className,
    )}
    {...props}
  >
    {children}
  </motion.code>
)

const EnhancedStrong = ({ children, className = '', ...props }: any) => (
  <motion.strong
    whileHover={{ scale: 1.02 }}
    className={cn('font-bold text-gray-900 relative', className)}
    {...props}
  >
    {children}
  </motion.strong>
)

const EnhancedEmphasis = ({ children, className = '', ...props }: any) => (
  <motion.em
    whileHover={{ scale: 1.02 }}
    className={cn('italic text-gray-800 font-medium', className)}
    {...props}
  >
    {children}
  </motion.em>
)

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),

  // Enhanced text elements
  heading: ({ node }) => {
    const level = node.tag?.replace('h', '') || 1
    const content = node.children?.map((child: any, index: number) => (
      <React.Fragment key={index}>{child.type === 'text' ? child.text : ''}</React.Fragment>
    ))

    return <EnhancedHeading level={parseInt(level as string)}>{content}</EnhancedHeading>
  },

  paragraph: ({ node }) => {
    const content = node.children?.map((child: any, index: number) => {
      if (child.type === 'text') {
        if (child.format & 1) {
          // Bold
          return <EnhancedStrong key={index}>{child.text}</EnhancedStrong>
        }
        if (child.format & 2) {
          // Italic
          return <EnhancedEmphasis key={index}>{child.text}</EnhancedEmphasis>
        }
        return <span key={index}>{child.text}</span>
      }
      return null
    })

    return <EnhancedParagraph>{content}</EnhancedParagraph>
  },

  quote: ({ node }) => {
    const content = node.children?.map((child: any, index: number) => (
      <React.Fragment key={index}>{child.type === 'text' ? child.text : ''}</React.Fragment>
    ))

    return <EnhancedBlockquote>{content}</EnhancedBlockquote>
  },

  list: ({ node }) => {
    const content = node.children?.map((child: any, index: number) => {
      if (child.type === 'listitem') {
        const itemContent = child.children?.map((grandChild: any, grandIndex: number) => (
          <React.Fragment key={grandIndex}>
            {grandChild.type === 'text' ? grandChild.text : ''}
          </React.Fragment>
        ))
        return <EnhancedListItem key={index}>{itemContent}</EnhancedListItem>
      }
      return null
    })

    return <EnhancedList listType={node.listType}>{content}</EnhancedList>
  },

  link: ({ node }) => {
    const content = node.children?.map((child: any, index: number) => (
      <React.Fragment key={index}>{child.type === 'text' ? child.text : ''}</React.Fragment>
    ))

    return <EnhancedLink href={node.fields?.url || '#'}>{content}</EnhancedLink>
  },

  code: ({ node }) => <EnhancedCode>{node.text || ''}</EnhancedCode>,

  text: ({ node }) => {
    if (node.format & 1) {
      // Bold
      return <EnhancedStrong>{node.text}</EnhancedStrong>
    }
    if (node.format & 2) {
      // Italic
      return <EnhancedEmphasis>{node.text}</EnhancedEmphasis>
    }

    return <span>{node.text}</span>
  },

  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-8" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3 my-8"
        imgClassName="m-0 rounded-lg shadow-lg"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem] mt-4 text-center text-gray-600 italic"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2 my-8" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    sliderblock: ({ node }: { node: any }) => <SliderBlock {...node.fields} />,
    about: ({ node }: { node: any }) => <AboutBlock {...node.fields} />,
    articleSection: ({ node }: { node: any }) => <ArticleSectionBlock {...node.fields} />,
    contentSection: ({ node }: { node: any }) => <ContentSectionBlock {...node.fields} />,
    photoGallery: ({ node }: { node: any }) => <PhotoGalleryBlock {...node.fields} />,
    videoGallery: ({ node }: { node: any }) => <VideoGalleryBlock {...node.fields} />,
    newsMedia: ({ node }: { node: any }) => <NewsMediaBlock {...node.fields} />,
    simpleSlider: ({ node }: { node: any }) => <SimpleSliderBlock config={node.fields} />,
    privacyPolicy: ({ node }: { node: any }) => <PrivacyPolicyBlock {...node.fields} />,
    termsOfService: ({ node }: { node: any }) => <TermsOfServiceBlock {...node.fields} />,
    quoteCarousel: ({ node }: { node: any }) => <QuoteCarouselBlock {...node.fields} />,
    faq: ({ node }: { node: any }) => <FAQBlock {...node.fields} />,
    universities: ({ node }: { node: any }) => <UniversitiesBlock {...node.fields} />,
    basicSlider: ({ node }: { node: any }) => <BasicSlider {...node.fields} />,
    universityGroup: ({ node }: { node: any }) => <UniversityGroupBlock {...node.fields} />,
    videoModalHero: ({ node }: { node: any }) => <VideoModalHeroBlock {...node.fields} />,
    journeyWithUs: ({ node }: { node: any }) => <JourneyWithUsBlock {...node.fields} />,
    testimonials: ({ node }: { node: any }) => <TestimonialsBlock {...node.fields} />,
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  variant?: 'default' | 'compact' | 'expanded'
  theme?: 'light' | 'dark'
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const {
    className,
    enableProse = true,
    enableGutter = true,
    variant = 'default',
    theme = 'light',
    ...rest
  } = props

  const variantStyles = {
    default: 'leading-relaxed',
    compact: 'leading-normal text-sm md:text-base',
    expanded: 'leading-loose text-lg md:text-xl',
  }

  const themeStyles = {
    light: 'text-gray-900',
    dark: 'text-gray-100 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-gray-100 [&_p]:text-gray-200',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'rich-text-container',
        'font-sans antialiased selection:bg-blue-100 selection:text-blue-900',
        variantStyles[variant],
        themeStyles[theme],
        className,
      )}
    >
      <ConvertRichText
        converters={jsxConverters}
        className={cn(
          'payload-richtext enhanced-richtext',
          // Base typography styles
          'font-feature-settings-normal text-rendering-optimize-legibility',
          // Enhanced prose styles
          {
            'container mx-auto px-4 sm:px-6 lg:px-8': enableGutter,
            'max-w-none': !enableGutter,
            // Custom prose styles instead of default Tailwind prose
            'max-w-4xl': enableProse,
          },
          // Enhanced spacing and typography
          '[&>*:first-child]:mt-0',
          '[&>*:last-child]:mb-0',
          // Enhanced table styles
          '[&_table]:w-full [&_table]:border-collapse [&_table]:border-gray-200',
          '[&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-50 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold',
          '[&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-2',
          // Enhanced hr styles
          '[&_hr]:my-8 [&_hr]:border-0 [&_hr]:h-px [&_hr]:bg-gradient-to-r [&_hr]:from-transparent [&_hr]:via-gray-300 [&_hr]:to-transparent',
          // Enhanced image styles
          '[&_img]:rounded-lg [&_img]:shadow-md [&_img]:transition-transform [&_img]:duration-300 hover:[&_img]:scale-105',
        )}
        {...rest}
      />
    </motion.div>
  )
}

// Export enhanced components for direct use if needed
export {
  EnhancedHeading,
  EnhancedParagraph,
  EnhancedBlockquote,
  EnhancedList,
  EnhancedListItem,
  EnhancedLink,
  EnhancedCode,
  EnhancedStrong,
  EnhancedEmphasis,
}
