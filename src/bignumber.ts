import { BigNumber } from 'bignumber.js'

// Re-export everything for parent projects
export * from 'bignumber.js'

export const zero = new BigNumber(0)

export const one = new BigNumber(1)

export function sumBigNumbers(array: BigNumber[]) {
  return array.reduce((acc, bn) => acc.plus(bn), zero)
}

export function multBigNumbers(array: BigNumber[]) {
  return array.reduce((acc, bn) => acc.multipliedBy(bn), one)
}

export function num(value: BigNumber.Value) {
  return new BigNumber(value)
}

export function minimize(value: BigNumber.Value) {
  return one.div(value)
}

/**
 * WARNING: This method uses a BigNumber instance from the current package
 * If you're using a BigNumber instance from another package, the instanceof check will return false (because these will be two different instances)
 */
export function toBigNumber(value: unknown) {
  if (typeof value === 'string' || typeof value === 'number') {
    return new BigNumber(value)
  } else if (value instanceof BigNumber) {
    return value
  } else {
    throw new Error(`Can't convert value "${value}" to BigNumber`)
  }
}

export function minimax(num: BigNumber, min: BigNumber, max: BigNumber) {
  if (!min.lte(max)) throw new Error('min must be less than or equal than max')
  return BigNumber.maximum(min, BigNumber.minimum(max, num))
}
