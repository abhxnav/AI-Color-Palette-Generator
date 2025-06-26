'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'sonner'
import { Button } from '@/components'
import { Loader2 } from 'lucide-react'
import { signUp } from '@/actions/auth.actions'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitch: () => void
}

const SignupModal = ({ isOpen, onClose, onSwitch }: SignupModalProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email.')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }

    try {
      setLoading(true)

      const data = await signUp(email, password)

      if (data) {
        toast.success('Sign up successful! Please check your email to verify.')
        onClose()
      }
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong'

      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }

      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs">
      <div className="bg-background rounded-md p-6 w-[90%] max-w-sm shadow-xl relative">
        <Button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl cursor-pointer bg-transparent hover:bg-transparent"
        >
          &times;
        </Button>

        <h2 className="text-lg font-semibold mb-4">Sign Up</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 px-3 py-2 border rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded-md"
        />

        <div className="w-full flex flex-col gap-2 items-center justify-center">
          <Button
            onClick={handleSignup}
            disabled={loading}
            className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-full cursor-pointer hover:brightness-90 w-full"
          >
            {loading ? (
              <div className="flex gap-2 items-center justify-center">
                <Loader2 size={20} className="animate-spin" />
                <p>Signing up...</p>
              </div>
            ) : (
              <span>Sign Up</span>
            )}
          </Button>
          <div className="text-sm">
            Already have an account?{' '}
            <span
              className="text-primary brightness-80 underline cursor-pointer hover:brightness-90"
              onClick={onSwitch}
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default SignupModal
