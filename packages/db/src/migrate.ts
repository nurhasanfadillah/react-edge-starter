import { config } from 'dotenv'
config({ path: '../../.env' })

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { migrate } from 'drizzle-orm/neon-http/migrator'

const db = drizzle(neon(process.env.DATABASE_URL!))

await migrate(db, { migrationsFolder: './drizzle' })
console.log('Migration complete.')
process.exit(0)
