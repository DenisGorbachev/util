import { isFunction, isString } from 'lodash-es'
import { Cage, CageP } from '../cage'

export type ErrorCage = string | Cage<Error>

export type ErrorCageP = string | CageP<Error>

export function uncageE(cage: (() => Error)): Error

export function uncageE(cage: Error): Error

export function uncageE(cage: ErrorCage) {
  if (isFunction(cage)) {
    return cage()
  } else if (isString(cage)) {
    return new Error(cage)
  } else {
    return cage
  }
}

export function uncageEP(cage: (() => Promise<Error>)): Promise<Error>

export function uncageEP(cage: (() => Error)): Promise<Error>

export function uncageEP(cage: Error): Promise<Error>

export async function uncageEP(cage: ErrorCageP) {
  if (isFunction(cage)) {
    return await cage()
  } else if (isString(cage)) {
    return new Error(cage)
  } else {
    return cage
  }
}
