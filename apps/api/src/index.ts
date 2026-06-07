import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono().basePath('/api')

app.use('*', cors())
app.use('*', logger())

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.onError((err, c) => c.json({ error: err.message }, 500))
app.notFound((c) => c.json({ error: 'Not Found' }, 404))

export default app
