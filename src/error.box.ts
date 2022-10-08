import { isFunction, isString } from 'lodash-es'
import { Box, BoxP } from './box'

export type ErrorBox = string | Box<Error>

export type ErrorBoxP = string | BoxP<Error>

export function unboxE(box: (() => Error)): Error

export function unboxE(box: Error): Error

export function unboxE(box: ErrorBox) {
  if (isFunction(box)) {
    return box()
  } else if (isString(box)) {
    return new Error(box)
  } else {
    return box
  }
}

export function unboxEP(box: (() => Promise<Error>)): Promise<Error>

export function unboxEP(box: (() => Error)): Promise<Error>

export function unboxEP(box: Error): Promise<Error>

export async function unboxEP(box: ErrorBoxP) {
  if (isFunction(box)) {
    return await box()
  } else if (isString(box)) {
    return new Error(box)
  } else {
    return box
  }
}
