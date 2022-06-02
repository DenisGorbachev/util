import { pipeline as $pipeline } from 'stream'
import { promisify } from 'util'

export const pipeline = promisify($pipeline)
