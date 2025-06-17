'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useUser } from '@/contexts/UserContext'
import { ProfileDropdown } from '@/components'

import DefaultAvatar from '@/../public/assets/icons/default-avatar.svg'

interface ProfileButtonProps {
  openDirection?: 'up' | 'down'
}

const ProfileButton = ({ openDirection = 'down' }: ProfileButtonProps) => {
  const { user, logout } = useUser()

  const [showDropdown, setShowDropdown] = useState<boolean>(false)

  const handleLogout = async () => {
    logout()
    setShowDropdown(false)
  }

  return (
    <div className="relative">
      {user && (
        <>
          <ProfileDropdown
            user={user}
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
            handleLogout={handleLogout}
            className={openDirection === 'up' ? 'bottom-16 left-0' : 'top-full'}
          />
          <div
            className="cursor-pointer flex items-center gap-2 bg-background hover:brightness-95 py-3"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <Image
              src={user?.user_metadata?.avatar_url || DefaultAvatar}
              alt="Profile"
              width={200}
              height={200}
              className="size-12 rounded-full overflow-hidden border-2 border-gray-300"
            />
            <span className="text-foreground text-s">
              {user?.user_metadata?.full_name}
            </span>
          </div>
        </>
      )}
    </div>
  )
}

export default ProfileButton
