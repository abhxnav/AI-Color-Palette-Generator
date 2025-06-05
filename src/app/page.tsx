'use client'

import {
  AnimatedLogo,
  AnimatedTagline,
  LoginModal,
  SignupModal,
} from '@/components'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInVariant } from '@/lib/animations'
import Image from 'next/image'
import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'

import LoginIcon from '@/../public/assets/icons/login.svg'
import DefaultAvatar from '@/../public/assets/icons/default-avatar.svg'
import { Separator } from '@/components/ui'

const Home = () => {
  const { user, logout } = useUser()
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    logout()
    setShowDropdown(false)
  }

  return (
    <div className="h-dvh w-dvw flex flex-col gap-3 justify-center items-center relative">
      {/* Profile Button Top Right */}
      {user && (
        <div className="absolute top-6 right-6">
          <button
            className="size-12 rounded-full overflow-hidden border-2 border-gray-300 shadow-md"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Image
              src={user?.user_metadata?.avatar_url || DefaultAvatar}
              alt="Profile"
              width={200}
              height={200}
            />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="px-4 py-2 text-sm text-gray-700 font-semibold w-full overflow-hidden text-ellipsis">
                {user.user_metadata?.name || user.email}
              </div>

              <Separator className="my-1 bg-black/25" />

              <button
                onClick={() => {
                  router.push('/saved')
                  setShowDropdown(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                Saved Palettes
              </button>
              <button
                onClick={() => {
                  router.push('/history')
                  setShowDropdown(false)
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              >
                History
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      <AnimatedLogo />
      <AnimatedTagline />

      <div className="flex gap-2">
        {!user && (
          <motion.div
            variants={fadeInVariant('up', 'spring', 2.5, 1)}
            initial="hidden"
            animate="show"
            className="mt-2"
          >
            <button
              onClick={() => setAuthModal('login')}
              className="bg-card text-primary-foreground text-base font-semibold shadow-xl shadow-black/20 px-6 py-2 rounded-full cursor-pointer hover:brightness-90 flex gap-1"
            >
              <span>Login</span>
              <Image src={LoginIcon} alt="login" width={20} height={20} />
            </button>
          </motion.div>
        )}
        <motion.div
          variants={fadeInVariant('up', 'spring', 2.7, 1)}
          initial="hidden"
          animate="show"
          className="mt-2"
        >
          <Link
            href="/generate"
            className="bg-primary text-primary-foreground font-semibold shadow-xl shadow-black/20 px-6 py-2 rounded-full cursor-pointer hover:brightness-90 flex"
          >
            Get started <span className="ml-1">&rarr;</span>
          </Link>
        </motion.div>
      </div>

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

export default Home
