'use client'

import { fadeInVariant } from '@/lib/animations'
import clsx from 'clsx'
import { motion } from 'framer-motion'

const AnimatedLogo = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        'text-8xl font-semibold text-primary-foreground flex',
        className
      )}
    >
      <motion.div
        variants={fadeInVariant('right', 'spring', 0.2, 1.5)}
        initial="hidden"
        animate="show"
      >
        mos
      </motion.div>
      <motion.span
        variants={fadeInVariant('down', 'spring', 1, 1.5)}
        initial="hidden"
        animate="show"
        className="text-primary"
      >
        AI
      </motion.span>
      <motion.div
        variants={fadeInVariant('left', 'spring', 0.2, 1.5)}
        initial="hidden"
        animate="show"
      >
        c
      </motion.div>
    </div>
  )
}

export default AnimatedLogo
