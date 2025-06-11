import { supabaseClient } from '@/lib/supabase/client'
import { checkExistingUser } from '@/actions/user.actions'

export const signUp = async (email: string, password: string) => {
  const existingUser = await checkExistingUser(email)

  if (existingUser) {
    if (existingUser?.provider === 'google') {
      throw new Error(
        'This email is registered using Google. Please sign in with Google.'
      )
    }

    throw new Error('This email is already registered. Please sign in.')
  }

  const { data, error } = await supabaseClient.auth.signUp({ email, password })

  if (error) {
    console.error('Error signing up:', error.message)
    throw new Error('Failed to sign up. Please try again!')
  }

  return data
}

export const signIn = async (email: string, password: string) => {
  const existingUser = await checkExistingUser(email)

  if (existingUser?.provider === 'google') {
    throw new Error(
      'This email is registered using Google. Please sign in with Google.'
    )
  }

  if (!existingUser) {
    throw new Error('This user does not exist. Please sign up first!')
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Error signing in:', error.message)

    if (error.message.includes('Invalid login credentials')) {
      throw new Error('Incorrect email or password. Please try again!')
    }

    throw new Error('Failed to sign in. Please try again!')
  }

  return data
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
  })

  if (error) {
    console.error('Error signing in with Google:', error.message)
    throw new Error('Failed to sign in with Google. Please try again!')
  }

  return data
}

export const signOut = async () => {
  const { error } = await supabaseClient.auth.signOut()

  if (error) {
    console.error('Error signing out:', error.message)
    throw new Error('Failed to sign out. Please try again!')
  }
}
