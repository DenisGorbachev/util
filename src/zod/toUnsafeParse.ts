import { SafeParseReturnType } from 'zod/lib/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toUnsafeParse<Args extends any[], Input, Output>(func: (...args: Args) => SafeParseReturnType<Input, Output>) {
  return function (...args: Args) {
    const result = func(...args)
    if (result.success) return result.data
    throw result.error
  }
}
