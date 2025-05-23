'use client'

import { AnimatedLogo, AnimatedTagline } from '@/components'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInVariant } from '@/lib/animations'

const Home = () => {
  return (
    <div className="h-dvh w-dvw flex flex-col gap-3 justify-center items-center">
      <AnimatedLogo />
      <AnimatedTagline />
      <motion.div
        variants={fadeInVariant('up', 'spring', 2.5, 1)}
        initial="hidden"
        animate="show"
        className="mt-4"
      >
        <Link
          href="/generate"
          className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-full cursor-pointer hover:brightness-90"
        >
          Get started <span className="ml-1">&rarr;</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default Home
