import { Mutex } from 'async-mutex'
import { isDefined } from './typescript.js'

export type Getter<Obj> = () => Promise<Obj>

/**
 * Note: this function does not accept any arguments, because otherwise only the first result would be cached; subsequent invocations would return the same result for different arguments
 */
export function getGetter<This, Result>(fetcher: (this: This) => Promise<Result>) {
  let result: Result | undefined = undefined
  const mutex = new Mutex()
  return async function (this: This) {
    const release = await mutex.acquire()
    if (isDefined(result)) {
      release()
      return result
    } else {
      try {
        result = await fetcher.apply(this)
      } finally {
        // release even if the fetcher throws an error
        release()
      }
      return result
    }
  }
}

export function getGetterWithThisRedirect<Proj, Result>(fetcher: (project: Proj) => Promise<Result>) {
  let result: Result | undefined = undefined
  const mutex = new Mutex()
  return async function (this: Proj) {
    const release = await mutex.acquire()
    if (isDefined(result)) {
      release()
      return result
    } else {
      try {
        result = await fetcher(this)
      } finally {
        // release even if the fetcher throws an error
        release()
      }
      return result
    }
  }
}
