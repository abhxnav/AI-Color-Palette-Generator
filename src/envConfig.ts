export const envConfig = {
  openRouter: {
    apiKey: String(process.env.OPENROUTER_API_KEY),
  },
  supabase: {
    url: String(process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL),
    publicKey: String(process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY),
    serviceRoleKey: String(process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY),
  },
}

export type EnvConfig = typeof envConfig
