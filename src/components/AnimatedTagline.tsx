'use client'

import { TypingEffect } from '@/components'
import { staggerContainerVariant } from '@/lib/animations'
import { motion } from 'framer-motion'

const AnimatedTagline = () => {
  return (
    <motion.div
      variants={staggerContainerVariant(0.2, 1)}
      initial="hidden"
      animate="show"
      className="flex justify-center items-center flex-col 2xl:max-w-[1280px] w-full mx-auto"
    >
      <TypingEffect
        text="From words to colors — Type a prompt, hit generate, and let AI craft a
      unique color palette that captures your vision perfectly."
        className="text-muted-foreground italic w-[600px] text-center"
      />
    </motion.div>
  )
}

export default AnimatedTagline
