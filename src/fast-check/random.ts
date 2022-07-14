import prand from 'pure-rand'
import { Random } from 'fast-check'

export const random = new Random(prand.xoroshiro128plus(Date.now()))
