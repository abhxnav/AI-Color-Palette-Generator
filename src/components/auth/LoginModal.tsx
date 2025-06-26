'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Button, Separator } from '@/components'

import GoogleIcon from '@/../public/assets/icons/google.svg'
import { signIn, signInWithGoogle } from '@/actions/auth.actions'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitch: () => void
}

const LoginModal = ({ isOpen, onClose, onSwitch }: LoginModalProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleLoginWithEmailPassword = async () => {
    try {
      setLoading(true)

      const data = await signIn(email, password)

      if (data) {
        router.push('/generate')
        toast.success('Login successful!')
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

  const handleLoginWithGoogle = async () => {
    try {
      setLoading(true)
      localStorage.setItem('google-login-success', '1') // flag for toast

      await signInWithGoogle()
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
          disabled={loading}
          className="absolute top-2 right-3 text-xl cursor-pointer bg-transparent hover:bg-transparent"
        >
          &times;
        </Button>

        <h2 className="text-lg font-semibold mb-4">Login</h2>

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
            onClick={handleLoginWithEmailPassword}
            disabled={loading}
            className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-full cursor-pointer hover:brightness-90 w-full"
          >
            {loading ? (
              <div className="flex gap-2 items-center justify-center">
                <Loader2 size={20} className="animate-spin" />
                <p>Loggin in...</p>
              </div>
            ) : (
              <span>Login</span>
            )}
          </Button>
          <div className="text-sm">
            Don&rsquo;t have an account?{' '}
            <span
              className="text-primary brightness-80 underline cursor-pointer hover:brightness-90"
              onClick={onSwitch}
            >
              Sign up
            </span>
          </div>
        </div>

        <Separator className="my-4 bg-black/25" />

        <Button
          onClick={handleLoginWithGoogle}
          disabled={loading}
          className="bg-card text-primary-foreground shadow-xl shadow-black/20 px-6 py-2 rounded-full cursor-pointer hover:bg-background hover:brightness-90 flex gap-2 w-full"
        >
          <Image src={GoogleIcon} alt="login" width={20} height={20} />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>,
    document.body
  )
}

export default LoginModal
