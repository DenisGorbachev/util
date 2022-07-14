import { test } from '@jest/globals'
import { BigNumber, minimax } from './bignumber'
import { expect } from './chai'

test(minimax.name, () => {
  const one = new BigNumber(1)
  const ten = new BigNumber(10)
  const twenty = new BigNumber(20)
  const thirty = new BigNumber(30)
  expect(minimax(ten, one, twenty)).to.bignumber.equal(ten)
  expect(minimax(one, ten, twenty)).to.bignumber.equal(ten)
  expect(minimax(thirty, ten, twenty)).to.bignumber.equal(twenty)
})
