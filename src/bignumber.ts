import { BigNumber } from 'bignumber.js'

export const zero = new BigNumber(0)

export const one = new BigNumber(1)

export function sumBigNumbers(array: BigNumber[]) {
  return array.reduce((acc, bn) => acc.plus(bn), new BigNumber(0))
}

export function num(value: BigNumber.Value) {
  return new BigNumber(value)
}

export function minimize(value: BigNumber.Value) {
  return one.div(value)
}

export function toBigNumber(value: unknown) {
  if (typeof value === 'string' || typeof value === 'number') {
    return new BigNumber(value)
  } else if (value instanceof BigNumber) {
    return value
  } else {
    throw new Error(`Can't convert value "${value}" to BigNumber`)
  }
}
