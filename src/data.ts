import { Mutex } from 'async-mutex'
import { isDefined } from './typescript'

export type GetterP<This, Val> = (this: This) => Promise<Val>

/**
 * Note: this function does not accept any arguments, because otherwise only the first result would be cached; subsequent invocations would return the same result for different arguments
 */
export function getExclusiveGetterP<This, Val>(getter: GetterP<This, Val>) {
  let value: Val | undefined = undefined
  const mutex = new Mutex()
  return async function (this: This) {
    const release = await mutex.acquire()
    if (isDefined(value)) {
      release()
      return value
    } else {
      try {
        value = await getter.apply(this)
      } finally {
        // release even if the fetcher throws an error
        release()
      }
      return value
    }
  }
}

export function getExclusiveGetterPWithThisRedirect<Ctx, Result>(runner: (context: Ctx) => Promise<Result>) {
  let result: Result | undefined = undefined
  const mutex = new Mutex()
  return async function (this: Ctx) {
    const release = await mutex.acquire()
    if (isDefined(result)) {
      release()
      return result
    } else {
      try {
        result = await runner(this)
      } finally {
        // release even if the fetcher throws an error
        release()
      }
      return result
    }
  }
}
