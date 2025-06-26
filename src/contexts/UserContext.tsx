'use client'

import { signOut } from '@/actions/auth.actions'
import { supabaseClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface UserContext {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
}

const UserContext = createContext<UserContext>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  logout: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
        error,
      } = await supabaseClient.auth.getSession()

      if (error) {
        console.error('Error getting current user: ', error.message)
        throw new Error('Failed to fetch current user')
      }

      setUser(session?.user || null)
      setIsLoading(false)
    }

    getUser()

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          if (!sessionStorage.getItem('hasLoggedIn')) {
            sessionStorage.setItem('hasLoggedIn', 'true')
            setUser(session?.user ?? null)
            toast.success(
              `Signed in ${
                session?.user?.user_metadata?.full_name
                  ? `as ${session?.user?.user_metadata?.full_name}`
                  : 'successfully'
              }!`
            )
            router.push('/generate')
          }
        }

        if (event === 'SIGNED_OUT') {
          sessionStorage.removeItem('hasLoggedIn')
          toast.success('Signed out successfully!')
          setUser(null)
        }
      }
    )

    return () => listener?.subscription.unsubscribe()
  }, [router])

  const logout = async () => {
    try {
      await signOut()
      router.push('/')
      toast.success('Signed out successfully!')
    } catch (error: unknown) {
      let errorMessage = 'Failed to logout. Please try again!'

      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }

      toast.error(errorMessage)
    }
  }

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated: !!user, isLoading, logout }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
