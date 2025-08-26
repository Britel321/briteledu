import type { TestimonialsBlock as TestimonialsBlockProps } from 'src/payload-types'

import React from 'react'
import { AnimatedTestimonials } from './animated-testimonials'

type Props = {
  className?: string
} & TestimonialsBlockProps

const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: 'Sujata Shrestha',
    designation: 'Product Manager at HimalTech',
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: 'Prabin Gautam',
    designation: 'CTO at Arya Systems',
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: 'Aarati Koirala',
    designation: 'Operations Director at Khusiyali Labs',
    src: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: 'Nischal Adhikari',
    designation: 'Engineering Lead at Kathmandu DataWorks',
    src: 'https://images.unsplash.com/photo-1511367461989-f85a21fdae15?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
  {
    quote:
      'The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.',
    name: 'Binita Maharjan',
    designation: 'VP of Technology at Sagarmatha Networks',
    src: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3',
  },
]

export const TestimonialsBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className="w-full bg-slate-100">
      <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
    </div>
  )
}
