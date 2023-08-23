import dotenv from 'dotenv'
import logger from './logger'

// NOTE: Always check if `NODE_ENV` before anything else
if (!process.env.NODE_ENV) {
  logger.error(
    'Please define Your `NODE_ENV` variable using `cross-env` in package.json file'
  )
  process.exit(1)
}

logger.success('NODE_ENV:', process.env.NODE_ENV)

let envPath: string | undefined

if (process.env.NODE_ENV === 'production') {
  envPath = '.env'
}

if (process.env.NODE_ENV === 'development') {
  envPath = '.env.development'
}

if (!envPath) {
  logger.error('Please use a valid value of NODE_ENV variable.')
  process.exit(1)
}

dotenv.config({ path: envPath })
if (!process.env.PORT) {
  logger.error('Please define PORT in your .env file.')
  process.exit(1)
}

export const NODE_ENV = process.env.NODE_ENV
export const PORT = Number(process.env.PORT)

