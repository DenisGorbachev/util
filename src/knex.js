import knex_module from 'src/knex'
import { isDev } from './helpers'

export function createKnex() {
  return knex_module({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    asyncStackTraces: isDev,
  })
}
