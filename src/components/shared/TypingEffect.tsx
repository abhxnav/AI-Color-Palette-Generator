'use client'

import { motion } from 'framer-motion'
import { textContainer, textVariant } from '@/lib/animations'

interface TypingEffectProps {
  text: string
  className?: string
}

const TypingEffect = ({ text, className }: TypingEffectProps) => {
  return (
    <motion.p variants={textContainer(0.02, 0.5)} className={className}>
      {Array.from(text).map((letter, index) => (
        <motion.span variants={textVariant} key={index}>
          {letter}
        </motion.span>
      ))}
    </motion.p>
  )
}

export default TypingEffect
