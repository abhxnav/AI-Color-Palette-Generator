'use client'

import { Button, Textarea } from '@/components'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInVariant } from '@/lib/animations'

interface PromptInputProps {
  inputPrompt: string
  setInputPrompt: (prompt: string) => void
  handleGeneration: () => void
  loading: boolean
}

const PromptInput = ({
  inputPrompt,
  setInputPrompt,
  handleGeneration,
  loading,
}: PromptInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <motion.div
        variants={fadeInVariant('right', 'spring', 0.2, 1)}
        initial="hidden"
        animate="show"
      >
        <Textarea
          className="min-h-60 shadow-[4px_-4px_20px_rgba(0,0,0,0.25)]"
          placeholder="Describe your vision here to generate a color palette"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          disabled={loading}
        />
      </motion.div>
      <motion.div
        variants={fadeInVariant('right', 'spring', 0.5, 1)}
        initial="hidden"
        animate="show"
        className=""
      >
        <Button
          className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-full cursor-pointer hover:brightness-90 mt-1 w-full"
          disabled={loading || inputPrompt.trim().length < 5}
          onClick={handleGeneration}
        >
          {loading ? (
            <div className="flex gap-2 items-center justify-center">
              <Loader2 size={20} className="animate-spin" />
              <p>Generating...</p>
            </div>
          ) : (
            <div>
              Generate <span className="ml-1">&rarr;</span>
            </div>
          )}
        </Button>
      </motion.div>
    </div>
  )
}

export default PromptInput
