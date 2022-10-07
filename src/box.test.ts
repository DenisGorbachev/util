import { test } from '@jest/globals'
import { unbox, unboxP } from './box'
import { expect } from './chai'

test(unbox.name, () => {
  expect(unbox(1)).to.equal(1)
  expect(unbox(() => 1)).to.equal(1)
})

test(unboxP.name, async () => {
  expect(await unboxP(1)).to.equal(1)
  expect(await unboxP(() => 1)).to.equal(1)
  expect(await unboxP(async () => 1)).to.equal(1)
})
