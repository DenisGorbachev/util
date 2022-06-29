import { existsSync } from 'fs'
import { requireUncached } from './require'

export const REPLAY_PATH = `${__dirname}/../replay.js`

export function getReplayParameters() {
  return process.env.CI ? {} : (existsSync(REPLAY_PATH) ? requireUncached(REPLAY_PATH) : {})
}
