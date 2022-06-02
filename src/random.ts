import $random, { Random } from 'random'
import seedrandom from 'seedrandom'

export function getRandom(seed: string) {
  return $random.clone(seedrandom(seed))
}

export type RandomNumberGenerator = () => number

export function getMean(sample: number[]) {
  return sample.reduce((memo, n) => memo + n, 0) / sample.length
}

export function getStandardDeviation(sample: number[], mean: number) {
  const sumOfSquares = sample.reduce((memo, n) => memo + (n - mean) ** 2, 0)
  return Math.sqrt(sumOfSquares / (sample.length - 1)) // "- 1" is Bessel's correction: https://en.wikipedia.org/wiki/Bessel%27s_correction
}

const wordChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'

export function getRandomString(length: number, random: Random) {
  return Array.from({ length }, () => wordChars[random.int(0, wordChars.length)]).join('')
}
