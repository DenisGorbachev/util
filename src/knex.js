import knex_module from 'src/knex.js'
import { isDev } from './helpers.js'

export function createKnex() {
  return knex_module({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    asyncStackTraces: isDev,
  })
}
