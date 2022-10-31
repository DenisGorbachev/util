import { Mutex } from 'async-mutex'

export type Getter<Val> = () => Val

export type GetterP<Val> = () => Promise<Val>

/**
 * Note: this function does not accept any arguments, because otherwise only the first result would be cached; subsequent invocations would return the same result for different arguments
 */
export function getExclusiveGetterP<This, Val>(fetcher: (this: This) => Promise<Val>) {
  let value: Val | undefined = undefined
  const mutex = new Mutex()
  return async function (this: This) {
    return mutex.runExclusive(async function (this: This) {
      // console.log(new Date(), 'Acquired for', fetcher.name, 'isDefined', isDefined(value))
      if (value === undefined) {
        value = await fetcher.apply(this)
      }
      return value
    }.bind(this))
  }
}

export function getExclusiveGetterPWithThisRedirect<Ctx, Val>(runner: (context: Ctx) => Promise<Val>) {
  let value: Val | undefined = undefined
  const mutex = new Mutex()
  return async function (this: Ctx) {
    return mutex.runExclusive(async function (this: Ctx) {
      if (value === undefined) {
        value = await runner(this)
      }
      return value
    }.bind(this))
  }
}
