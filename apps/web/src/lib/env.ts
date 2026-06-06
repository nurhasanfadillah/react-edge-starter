import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

/**
 * Client-only env untuk apps/web (Vite SPA).
 * Hanya VITE_* vars — tidak ada server secrets di sini.
 * Untuk server env, import dari @repo/env di apps/api.
 */
export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_APP_URL: z.string().url().optional(),
  },
  server: {},
  runtimeEnv: import.meta.env,
})
