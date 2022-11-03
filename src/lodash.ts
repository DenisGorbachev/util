import { difference, isArray, isEqual, mergeWith } from 'lodash-es'
import { GetUid } from './zod'

export type Mapper<U, V> = (obj: U) => V

export type MapperP<U, V> = (obj: U) => Promise<V>

export type IsEqual<U> = (a: U) => (b: U) => boolean

export function isEqualBy<U, V>(a: U, b: U, mapper: Mapper<U, V>) {
  return isEqual(mapper(a), mapper(b))
}

export function equal<U>(a: U) {
  return (b: U) => isEqual(a, b)
}

export function equalBy<U, V>(a: U, mapper: Mapper<U, V>) {
  return (b: U) => isEqualBy(a, b, mapper)
}

export function isSubsetOf<T>(set: T[], subset: T[]) {
  return difference(set, subset).length === 0
}

export function mergeWithArrays<TObject, TSource1, TSource2>(object: TObject, source1: TSource1, source2: TSource2): TObject & TSource1 & TSource2 {
  return mergeWith(object, source1, source2, function (a, b) {
    if (isArray(a) && isArray(b)) {
      return b.concat(a)
    }
  })
}

export const notInBy = <Elem, Uid>(getUid: GetUid<Elem>) => (elements: Elem[]) => (element: Elem) => {
  return !elements.find(el => isEqualBy(el, element, getUid))
}

/**
 * Doesn't allow undefined values
 */
export const identityStrict = <T>(value: T) => value
