import { identity } from 'lodash-es'
import { Box, unbox } from './box'

export const notFound = new Error('Can\'t find object in collection')

export const get_notFound = <Obj>(filter: (object: Obj) => boolean) => new Error('Can\'t find an object in a collection using filter: ' + filter.toString())

export function ensure<Obj, Res>(object: Obj | null | undefined, errorBox: Box<Error> = notFound) {
  if (object === null || object === undefined) {
    throw unbox(errorBox)
  } else {
    return object
  }
}

export function ensureStatic<Obj, Err>(object: Obj | null | undefined, errorBox: Box<Error> = notFound) {
  if (object === null || object === undefined) {
    throw unbox(errorBox)
  } else {
    return object
  }
}

export function ensureFind<Obj, Err>(collection: Obj[], filter: (object: Obj) => boolean, errorBox: Box<Error> = get_notFound(filter)) {
  const object = collection.find(filter)
  if (object === null || object === undefined) {
    throw unbox(errorBox)
  } else {
    return object
  }
}

export function ensureMapGet<Key, Value>(map: Map<Key, Value>, key: Key) {
  return ensure(map.get(key), new Error(`Can't find key "${key}" in map ${map}`))
}

export function checkAll<Obj, Res>(objects: Array<Obj | null | undefined>) {
  if (!objects.every(identity)) {
    throw new Error(`Some objects are falsy: \n\n${JSON.stringify(objects)}`)
  } else {
    return objects
  }
}
