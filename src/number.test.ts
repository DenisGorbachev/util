import { roundDownBy } from './number'
import { expect } from './chai'

test(roundDownBy.name, async function () {
  expect(roundDownBy(9, 3)).to.equal(9)
  expect(roundDownBy(10, 3)).to.equal(9)
  expect(roundDownBy(11, 3)).to.equal(9)
  expect(roundDownBy(12, 3)).to.equal(12)
})
