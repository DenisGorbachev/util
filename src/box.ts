import { isFunction } from 'lodash-es'

/**
 * @see ErrorBox
 */

export type Box<Value> = Value | (() => Value)

export type BoxP<Value> = Value | (() => Value) | (() => Promise<Value>)

export function unbox<Value>(box: (() => Value)): Value

export function unbox<Value>(box: Value): Value

export function unbox<Value>(box: Box<Value>) {
  if (isFunction(box)) {
    return box()
  } else {
    return box
  }
}

export function unboxP<Value>(box: (() => Promise<Value>)): Promise<Value>

export function unboxP<Value>(box: (() => Value)): Promise<Value>

export function unboxP<Value>(box: Value): Promise<Value>

export async function unboxP<Value>(box: BoxP<Value>) {
  if (isFunction(box)) {
    return await box()
  } else {
    return box
  }
}
