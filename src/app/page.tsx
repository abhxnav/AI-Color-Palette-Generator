'use client'

import {
  AnimatedLogo,
  AnimatedTagline,
  LoginModal,
  ProfileDropdown,
  SignupModal,
} from '@/components'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeInVariant } from '@/lib/animations'
import Image from 'next/image'
import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'

import LoginIcon from '@/../public/assets/icons/login.svg'
import DefaultAvatar from '@/../public/assets/icons/default-avatar.svg'

const Home = () => {
  const { user, logout } = useUser()
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)

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
            className="size-12 rounded-full overflow-hidden border-2 border-gray-300 shadow-md cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Image
              src={user?.user_metadata?.avatar_url || DefaultAvatar}
              alt="Profile"
              width={200}
              height={200}
            />
          </button>

          <ProfileDropdown
            user={user}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            handleLogout={handleLogout}
          />
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
