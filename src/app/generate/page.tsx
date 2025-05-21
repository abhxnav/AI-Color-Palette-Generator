'use client'

import { ColorPalette, Logo, PromptInput } from '@/components'
import { toast } from 'sonner'
import { useState } from 'react'
import { cleanUpColors } from '@/lib/utils'

const Generate = () => {
  const [inputPrompt, setInputPrompt] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [palette, setPalette] = useState<PaletteColor[] | null>(null)

  const handleGeneration = async () => {
    try {
      setLoading(true)
      setPalette(null)

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ inputPrompt }),
      })

      const responseJson = await response.json()

      if (responseJson.error) {
        throw new Error(responseJson.errorMessage || 'Something went wrong.')
      }

      const cleaned = cleanUpColors(responseJson?.colors)

      const pairs = cleaned
        .split(', ')
        .map((entry: string) => entry.split(': '))
        .map(([label, hex]) => ({ label, hex }))

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
      <div className="w-full h-screen p-7">
        <ColorPalette colorPalette={palette} />
      </div>
    </div>
  )
}

export default Generate
