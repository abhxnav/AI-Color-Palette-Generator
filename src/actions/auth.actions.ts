import { supabaseClient } from '@/lib/supabase/client'

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabaseClient.auth.signUp({ email, password })

  if (error) {
    console.error('Error signing up:', error.message)
    throw new Error('Failed to sign up. Please try again!')
  }

  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Error signing in:', error.message)

    if (error.message.includes('Invalid login credentials')) {
      throw new Error(
        "Incorrect email or password. Please try again or sign up if you don't have an account!"
      )
    }

    if (error.message.includes('already registered')) {
      throw new Error(
        'An account with this email already exists. Try logging in instead or use Google Sign-In.'
      )
    }

    if (error.message === 'Email signups are not allowed for this user') {
      throw new Error(
        'This email is registered using Google. Please log in with Google.'
      )
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
