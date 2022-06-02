import { Random } from 'random'

export type Sampler<T> = (objects: T[]) => T | undefined

export function getSampler<T>(random: Random): Sampler<T> {
  return (array: T[]) => {
    const index = random.int(0, array.length - 1)
    return array.length ? array[index] : undefined
  }
}
