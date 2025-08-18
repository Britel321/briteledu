/**
 * Animation presets and utilities for the slider component
 */

export const createSlideAnimation = (
  animationType: string,
  direction: 'forward' | 'backward',
  duration = 0.6,
) => {
  const baseTransition = { duration, ease: 'easeInOut' }

  const animations = {
    fade: {
      enter: { opacity: 0 },
      center: { opacity: 1, zIndex: 1 },
      exit: { opacity: 0, zIndex: 0, transition: baseTransition },
    },

    slide: {
      enter: {
        x: direction === 'forward' ? '100%' : '-100%',
        opacity: 1,
      },
      center: { x: 0, opacity: 1, zIndex: 1 },
      exit: {
        x: direction === 'forward' ? '-100%' : '100%',
        opacity: 1,
        zIndex: 0,
        transition: baseTransition,
      },
    },

    slideVertical: {
      enter: {
        y: direction === 'forward' ? '100%' : '-100%',
        opacity: 1,
      },
      center: { y: 0, opacity: 1, zIndex: 1 },
      exit: {
        y: direction === 'forward' ? '-100%' : '100%',
        opacity: 1,
        zIndex: 0,
        transition: baseTransition,
      },
    },

    zoom: {
      enter: { scale: 0.8, opacity: 0 },
      center: { scale: 1, opacity: 1, zIndex: 1 },
      exit: { scale: 1.2, opacity: 0, zIndex: 0, transition: baseTransition },
    },

    zoomOut: {
      enter: { scale: 1.2, opacity: 0 },
      center: { scale: 1, opacity: 1, zIndex: 1 },
      exit: { scale: 0.8, opacity: 0, zIndex: 0, transition: baseTransition },
    },

    flip: {
      enter: { rotateY: 90, opacity: 0 },
      center: { rotateY: 0, opacity: 1, zIndex: 1 },
      exit: { rotateY: -90, opacity: 0, zIndex: 0, transition: baseTransition },
    },

    flipVertical: {
      enter: { rotateX: 90, opacity: 0 },
      center: { rotateX: 0, opacity: 1, zIndex: 1 },
      exit: { rotateX: -90, opacity: 0, zIndex: 0, transition: baseTransition },
    },

    cube: {
      enter: {
        rotateY: direction === 'forward' ? 90 : -90,
        x: direction === 'forward' ? '50%' : '-50%',
        opacity: 0.7,
      },
      center: { rotateY: 0, x: 0, opacity: 1, zIndex: 1 },
      exit: {
        rotateY: direction === 'forward' ? -90 : 90,
        x: direction === 'forward' ? '-50%' : '50%',
        opacity: 0.7,
        zIndex: 0,
        transition: baseTransition,
      },
    },

    accordion: {
      enter: {
        scaleX: 0,
        transformOrigin: direction === 'forward' ? 'left' : 'right',
        opacity: 0.8,
      },
      center: { scaleX: 1, opacity: 1, zIndex: 1 },
      exit: {
        scaleX: 0,
        transformOrigin: direction === 'forward' ? 'right' : 'left',
        opacity: 0.8,
        zIndex: 0,
        transition: baseTransition,
      },
    },

    blur: {
      enter: { filter: 'blur(10px)', opacity: 0 },
      center: { filter: 'blur(0px)', opacity: 1, zIndex: 1 },
      exit: { filter: 'blur(10px)', opacity: 0, zIndex: 0, transition: baseTransition },
    },

    kenBurns: {
      enter: { scale: 1, opacity: 0 },
      center: {
        scale: [1, 1.1],
        opacity: 1,
        zIndex: 1,
        transition: {
          scale: { duration: duration * 8, ease: 'linear' },
          opacity: { duration: duration },
        },
      },
      exit: { scale: 1.1, opacity: 0, zIndex: 0, transition: baseTransition },
    },
  }

  return animations[animationType] || animations.fade
}

export const createTextAnimation = (delay = 0.2) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay,
    },
  },
})

export const createStaggerAnimation = (staggerDelay = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
    },
  },
})

export const createParallaxOffset = (scrollY: number, speed = 0.5) => {
  return scrollY * speed
}
