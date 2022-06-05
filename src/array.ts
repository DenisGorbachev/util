import { isEqual } from 'lodash-es'

export type NonEmptyArray<T> = [T, ...T[]]

export function getUniqueElement<T>(elements: T[]) {
  const first = elements[0]
  const everyElementIsSame = elements.every((element) => isEqual(element, first))
  if (everyElementIsSame) {
    return first
  } else {
    throw new Error('Some elements are different')
  }
}
