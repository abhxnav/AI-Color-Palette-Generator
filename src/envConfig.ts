export const envConfig = {
  openRouter: {
    apiKey: String(process.env.OPENROUTER_API_KEY),
  },
}

export type EnvConfig = typeof envConfig
