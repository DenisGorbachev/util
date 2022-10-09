import { identity } from 'lodash-es'
import { Box, BoxP, unbox, unboxP } from './box'

export function ensure<Obj, Err>(object: Obj | null | undefined, error?: Box<Err>) {
  if (object === null || object === undefined) throw unbox(error ?? notFound)
  return object
}

export async function ensureP<Obj, Err>(object: Obj | null | undefined, error?: BoxP<Err>) {
  if (object === null || object === undefined) throw await unboxP(error ?? notFound)
  return object
}

export function ensureFind<Obj, Err>(collection: Obj[], filter: (object: Obj) => boolean, error?: Box<Err>) {
  const object = collection.find(filter)
  if (object === null || object === undefined) throw unbox(error ?? get_notFound(filter))
  return object
}

export async function ensureFindP<Obj, Err>(collection: Obj[], filter: (object: Obj) => boolean, error?: BoxP<Err>) {
  const object = collection.find(filter)
  if (object === null || object === undefined) throw await unboxP(error ?? get_notFound(filter))
  return object
}

export function ensureMapGet<Key, Value>(map: Map<Key, Value>, key: Key) {
  return ensure(map.get(key), new Error(`Can't find key "${key}" in map ${map}`))
}

export function ensureEvery<Obj, Err>(objects: Array<Obj | null | undefined>, error?: BoxP<Err>) {
  if (!objects.every(identity)) throw unbox(error ?? new Error(`Some objects are falsy: \n\n${JSON.stringify(objects)}`))
  return objects
}

export const notFound = new Error('Can\'t find object in collection')

export const get_notFound = <Obj>(filter: (object: Obj) => boolean) => new Error('Can\'t find an object in a collection using filter: ' + filter.toString())
