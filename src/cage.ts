import { isFunction } from 'lodash-es'

/**
 * @see ErrorBox
 */

export type Cage<Value> = Value | (() => Value)

export type CageP<Value> = Value | (() => Value) | (() => Promise<Value>)

export function uncage<Value>(cage: (() => Value)): Value

export function uncage<Value>(cage: Value): Value

export function uncage<Value>(cage: Cage<Value>) {
  if (isFunction(cage)) {
    return cage()
  } else {
    return cage
  }
}

export function uncageP<Value>(cage: (() => Promise<Value>)): Promise<Value>

export function uncageP<Value>(cage: (() => Value)): Promise<Value>

export function uncageP<Value>(cage: Value): Promise<Value>

export async function uncageP<Value>(cage: CageP<Value>) {
  if (isFunction(cage)) {
    return await cage()
  } else {
    return cage
  }
}
