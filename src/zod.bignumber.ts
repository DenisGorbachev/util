import BigNumber from 'bignumber.js'

export const refinePositiveOrZeroBigNumber = (value: BigNumber) => !value /* check for undefined */ || value.isGreaterThanOrEqualTo(0)

export const refinePositiveOrZeroBigNumberParams = {
  message: 'Must be positive or zero',
}

export const refinePositiveBigNumber = (value: BigNumber) => !value /* check for undefined */ || value.isGreaterThan(0)

export const refinePositiveBigNumberParams = {
  message: 'Must be positive',
}
