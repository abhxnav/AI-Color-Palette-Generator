'use client'

import { ColorPalette, Logo, PromptInput } from '@/components'
import { toast } from 'sonner'
import { useState } from 'react'
import { generatePaletteFromPrompt } from '@/lib/generators/generatePaletteFromPrompt'
import { generateTitle } from '@/lib/generators/generateTitle'

const Generate = () => {
  const [inputPrompt, setInputPrompt] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [palette, setPalette] = useState<PaletteColor[] | null>(null)

  const handleGeneration = async () => {
    try {
      setLoading(true)
      setPalette(null)

      const pairs = await generatePaletteFromPrompt(inputPrompt)

      setPalette(pairs)
    } catch (error: any) {
      toast.error('Failed to generate color palette.')
      console.error('Error generating color palette:', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="min-w-[300px] w-[25vw] h-screen flex flex-col gap-10 p-7">
        <Logo className="text-5xl!" />
        <PromptInput
          inputPrompt={inputPrompt}
          setInputPrompt={setInputPrompt}
          handleGeneration={handleGeneration}
          loading={loading}
        />
      </div>

      {/* Divider */}
      <div className="w-0.5 h-[90vh] bg-border mt-[5vh]" />

      {/* Palette */}
      <div className="w-full h-screen p-14">
        <ColorPalette colorPalette={palette} isGenerating={loading} />
      </div>
    </div>
  )
}

export default Generate
