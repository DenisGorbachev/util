import knex_module from 'knex'
import { isDev } from './env.constants.js'

export function createKnex() {
  return knex_module({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    asyncStackTraces: isDev,
  })
}
