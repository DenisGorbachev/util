import { identity } from 'lodash-es'
import { Cage, CageP, uncage, uncageP } from './cage'

export function ensure<Obj, Err>(object: Obj | null | undefined, error?: Cage<Err>) {
  if (object === null || object === undefined) throw uncage(error ?? getNotFoundError())
  return object
}

export async function ensureP<Obj, Err>(object: Obj | null | undefined, error?: CageP<Err>) {
  if (object === null || object === undefined) throw await uncageP(error ?? getNotFoundError())
  return object
}

export function ensureFind<Obj, Err>(collection: Obj[], filter: (object: Obj) => boolean, error?: Cage<Err>) {
  const object = collection.find(filter)
  if (object === null || object === undefined) throw uncage(error ?? getNotFoundErrorForFilter(filter))
  return object
}

export async function ensureFindP<Obj, Err>(collection: Obj[], filter: (object: Obj) => boolean, error?: CageP<Err>) {
  const object = collection.find(filter)
  if (object === null || object === undefined) throw await uncageP(error ?? getNotFoundErrorForFilter(filter))
  return object
}

export function ensureMapGet<Key, Value, Err>(map: Map<Key, Value>, key: Key, error?: Cage<Err>) {
  return ensure(map.get(key), () => uncage(error) ?? getNotFoundInMapByKeyError(map, key))
}

export function ensureGet<Key extends string | number | symbol, Value, Err>(record: Record<Key, Value>, key: Key, error?: Cage<Err>) {
  return ensure(record[key], () => uncage(error) ?? getNotFoundInRecordByKeyError(record, key))
}

export function ensureIndex<Value, Err>(array: Value[], index: number, error?: Cage<Err>) {
  return ensure(array[index], () => uncage(error) ?? getNotFoundInArrayByIndexError(array, index))
}

export function ensureEvery<Obj, Err>(objects: Array<Obj | null | undefined>, error?: CageP<Err>) {
  if (!objects.every(identity)) throw uncage(error ?? new Error(`Some objects are falsy: \n\n${JSON.stringify(objects)}`))
  return objects
}

export const getNotFoundError = () => new Error('Can\'t find object in collection')

export const getNotFoundErrorForFilter = <Obj>(filter: (object: Obj) => boolean) => new Error('Can\'t find an object in a collection using filter: ' + filter.toString())

export const getNotFoundInMapByKeyError = <Key, Value>(map: Map<Key, Value>, key: Key) => new Error(`Can't find key "${key}" in map ${map}`)

export const getNotFoundInRecordByKeyError = <Key extends string | number | symbol, Value>(record: Record<Key, Value>, key: Key) => new Error(`Can't find key "${key.toString()}" in record ${record}`)

export const getNotFoundInArrayByIndexError = <Value>(array: Value[], index: number) => new Error(`Can't find index "${index}" in array ${array.join(', ')}`)
