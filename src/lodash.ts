import { difference, isArray, isEqual, mergeWith } from 'lodash-es'
import { GetUid } from './zod'

export function isEqualBy<T>(a: T, b: T, getter: (t: T) => unknown) {
  return isEqual(getter(a), getter(b))
}

export function isSubset<T>(set: T[], subset: T[]) {
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
