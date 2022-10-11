import { test } from '@jest/globals'
import { uncage, uncageP } from './cage'
import { expect } from './chai'

test(uncage.name, () => {
  expect(uncage(1)).to.equal(1)
  expect(uncage(() => 1)).to.equal(1)
})

test(uncageP.name, async () => {
  expect(await uncageP(1)).to.equal(1)
  expect(await uncageP(() => 1)).to.equal(1)
  expect(await uncageP(async () => 1)).to.equal(1)
})
