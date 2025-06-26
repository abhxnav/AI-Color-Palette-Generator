'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ColorPalette,
  Logo,
  LoginModal,
  ProfileButton,
  PromptInput,
  SavedPalettesList,
  SignupModal,
} from '@/components'
import { toast } from 'sonner'
import { generatePaletteFromPrompt } from '@/lib/generators/generatePaletteFromPrompt'
import { useUser } from '@/contexts/UserContext'
import { PaletteColor } from '@/types/types'
import LoginIcon from '@/../public/assets/icons/login.svg'

const Generate = () => {
  const [inputPrompt, setInputPrompt] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [palette, setPalette] = useState<PaletteColor[] | null>(null)
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null)

  const { user } = useUser()

  const handleGeneration = async () => {
    try {
      setLoading(true)
      setPalette(null)

      const pairs = await generatePaletteFromPrompt(inputPrompt)

      setPalette(pairs as PaletteColor[])
    } catch (error: unknown) {
      let errorMessage =
        'Unknown error occurred while generating color palette.'

      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }

      toast.error(errorMessage)
      console.error('Error generating color palette:', errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="min-w-[300px] w-[25vw] h-screen flex flex-col justify-between p-7 py-5">
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
        {user ? (
          <div>
            <ProfileButton openDirection="up" />
          </div>
        ) : (
          <div
            className="cursor-pointer flex items-center gap-2 bg-background hover:brightness-95 py-3"
            onClick={() => setAuthModal('login')}
          >
            <Image
              src={LoginIcon}
              alt="Login"
              width={200}
              height={200}
              className="size-6"
            />
            <span className="text-foreground text-s">Login</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-0.5 h-[95vh] bg-border my-auto" />

      {/* Palette */}
      <div className="w-full h-screen p-14">
        <ColorPalette colorPalette={palette} isGenerating={loading} />
      </div>

      {/* Auth Modals */}
      <LoginModal
        isOpen={authModal === 'login'}
        onClose={() => setAuthModal(null)}
        onSwitch={() => setAuthModal('signup')}
      />

      <SignupModal
        isOpen={authModal === 'signup'}
        onClose={() => setAuthModal(null)}
        onSwitch={() => setAuthModal('login')}
      />
    </div>
  )
}

export default Generate
