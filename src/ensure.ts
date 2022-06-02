import { identity } from 'lodash'

export type Throwback = () => Promise<Error>

export const defaultCollectionFindThrowback = () => { throw new Error('Can\'t find object in collection') }

export const err = (message: string) => () => { throw new Error(message) }

export function ensure<Obj, Res>(object: Obj | null | undefined, throwback: Throwback = defaultCollectionFindThrowback) {
  if (object === null || object === undefined) {
    throw throwback()
  } else {
    return object
  }
}

export function ensureStatic<Obj, Err>(object: Obj | null | undefined, error?: Err) {
  if (object === null || object === undefined) {
    throw error ?? new Error('Can\'t find object in collection')
  } else {
    return object
  }
}

export function checkAll<Obj, Res>(objects: Array<Obj | null | undefined>) {
  if (!objects.every(identity)) {
    throw new Error(`Some objects are falsy: \n\n${JSON.stringify(objects)}`)
  } else {
    return objects
  }
}

export type Filter<Obj> = (object: Obj) => boolean

export function ensureFind<Obj, Err>(collection: Obj[], filter: Filter<Obj>, error?: Err) {
  const object = collection.find(filter)
  if (object === null || object === undefined) {
    throw error ?? new Error('Can\'t find an object in a collection using filter: ' + filter.toString())
  } else {
    return object
  }
}

export const tb = (err: Error) => async () => err
