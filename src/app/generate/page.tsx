'use client'

import { useState } from 'react'
import {
  ColorPalette,
  Logo,
  ProfileButton,
  PromptInput,
  SavedPalettesList,
} from '@/components'
import { toast } from 'sonner'
import { generatePaletteFromPrompt } from '@/lib/generators/generatePaletteFromPrompt'
import { useUser } from '@/contexts/UserContext'
import { PaletteColor } from '@/types/types'

const Generate = () => {
  const [inputPrompt, setInputPrompt] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [palette, setPalette] = useState<PaletteColor[] | null>(null)

  const { user } = useUser()

  const handleGeneration = async () => {
    try {
      setLoading(true)
      setPalette(null)

      const pairs = await generatePaletteFromPrompt(inputPrompt)

      setPalette(pairs as PaletteColor[])
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
      <div className="min-w-[300px] w-[25vw] h-screen flex flex-col justify-between p-7 pb-0">
        <div className="flex flex-col gap-10">
          {/* Logo */}
          <Logo className="text-5xl!" />

          {/* Prompt Input */}
          <PromptInput
            inputPrompt={inputPrompt}
            setInputPrompt={setInputPrompt}
            handleGeneration={handleGeneration}
            loading={loading}
          />
        </div>

        {/* Saved list */}
        {user && (
          <div className="flex-grow my-6 overflow-y-auto">
            <SavedPalettesList />
          </div>
        )}

        {/* Profile button */}
        {user && (
          <div>
            <ProfileButton openDirection="up" />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-0.5 h-[95vh] bg-border my-auto" />

      {/* Palette */}
      <div className="w-full h-screen p-14">
        <ColorPalette colorPalette={palette} isGenerating={loading} />
      </div>
    </div>
  )
}

export default Generate
