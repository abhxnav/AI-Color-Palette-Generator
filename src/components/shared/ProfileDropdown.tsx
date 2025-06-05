'use client'

import { Separator } from '@/components'
import { useRouter } from 'next/navigation'

interface ProfileDropdownProps {
  user: any
  showDropdown: boolean
  setShowDropdown: (show: boolean) => void
  handleLogout: () => void
  className?: string
}

const ProfileDropdown = ({
  user,
  showDropdown,
  setShowDropdown,
  handleLogout,
  className,
}: ProfileDropdownProps) => {
  const router = useRouter()
  return (
    <div
      className={`${
        showDropdown ? 'block' : 'hidden'
      } ${className} absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg z-10 border border-gray-200`}
    >
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
  )
}

export default ProfileDropdown
