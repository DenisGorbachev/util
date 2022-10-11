// allows to implement partial functions & leave a message for another developer
import { nail } from './string'
import { Cage, uncage } from './cage'

export function todo<Val, Err>(value?: Val, error?: Cage<Err>): Val {
  if (!value) throw uncage(error ?? impl())
  return value
}

/**
 * @deprecated use todo()
 */
export function stub<V>(message = 'Implement stub'): V {
  throw impl(message)
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function impl(message = '') {
  return new ImplementationError(nail(message).trim())
}

export const Impl = function () {
  throw impl()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function manual<Key extends keyof any, Value>(map: Record<Key, Value>, key: Key, message?: string): Value {
  const value = map[key]
  if (!value) throw impl(message)
  return value
}

export class ImplementationError extends Error {

}

export interface Stub {}

export const manually = impl
