import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema/index'

type DrizzleDb = ReturnType<typeof drizzle<typeof schema>>

let _db: DrizzleDb | null = null

export const db = new Proxy({} as DrizzleDb, {
  get(_, prop) {
    if (!_db) {
      _db = drizzle(neon(process.env.DATABASE_URL!), { schema })
    }
    return (_db as any)[prop]
  },
})

export * from './schema/index'
