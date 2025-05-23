// Slide in from direction (left, right, up, down)
export const slideInVariant = (
  direction: 'left' | 'right' | 'up' | 'down',
  type: 'spring' | 'tween' = 'spring',
  delay = 0,
  duration = 0.8
) => ({
  hidden: {
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type, delay, duration, ease: 'easeOut' },
  },
})

// Fade in with optional direction
export const fadeInVariant = (
  direction: 'left' | 'right' | 'up' | 'down' | 'none' = 'none',
  type: 'spring' | 'tween' = 'tween',
  delay = 0,
  duration = 0.6
) => ({
  hidden: {
    x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
    y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { type, delay, duration, ease: 'easeOut' },
  },
})

// Simple fade-in
export const simpleFadeVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
}

// Text drop-in effect
export const textDropInVariant = (delay = 0) => ({
  hidden: { y: 50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', delay, duration: 1 },
  },
})

// Staggered container
export const staggerContainerVariant = (
  staggerChildren = 0.15,
  delayChildren = 0
) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

// Rotate and slide in
export const rotateInVariant = (direction: 'left' | 'right') => ({
  hidden: {
    x: direction === 'left' ? '-200%' : '200%',
    rotate: 180,
  },
  show: {
    x: 0,
    rotate: 0,
    transition: {
      type: 'spring',
      duration: 1.2,
      delay: 0.5,
    },
  },
})

// Text
export const textContainer = (delay = 0, speed = 0) => ({
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: delay, delayChildren: i * speed },
  }),
})

export const textVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeIn',
    },
  },
}

// Footer rise up
export const riseUpVariant = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      delay: 0.4,
    },
  },
}

// Hover effect
export const hoverScaleVariant = {
  scale: 1.07,
  transition: {
    type: 'spring',
    stiffness: 120,
    damping: 12,
  },
}

// Tab effect
export const tapBounceVariant = {
  scale: [1, 1.08, 1],
  transition: {
    type: 'tween',
    duration: 0.3,
    ease: 'easeInOut',
  },
}
