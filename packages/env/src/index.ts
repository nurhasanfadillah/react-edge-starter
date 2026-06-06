import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

/**
 * Server-side env — used in apps/api and server-only code.
 * Never import this directly in client-side (browser) code.
 *
 * For apps/web (Vite), create a local env.ts that re-uses these schemas
 * with import.meta.env as the runtimeEnv source.
 */
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  },
  clientPrefix: 'VITE_',
  client: {
    VITE_APP_URL: z.string().url().optional(),
  },
  runtimeEnv: process.env,
})

/** Re-export schemas for apps to compose their own env */
export const serverSchema = {
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
}

export const clientSchema = {
  VITE_APP_URL: z.string().url().optional(),
}
