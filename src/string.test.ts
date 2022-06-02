import { expect } from './chai'
import { test } from '@jest/globals'
import { nail } from './string'

test('nail', async function () {
  expect(nail(`
  * One
  * Two
  * Three
  `)).to.equal(`
* One
* Two
* Three
`)
  expect(nail(`
  * One
  * Two
    * Two nested 1
    * Two nested 2
  * Three
  `)).to.equal(`
* One
* Two
  * Two nested 1
  * Two nested 2
* Three
`)
  // double nail
  expect(nail(nail(`
  * One
  * Two
    * Two nested 1
    * Two nested 2
  * Three
  `))).to.equal(nail(`
  * One
  * Two
    * Two nested 1
    * Two nested 2
  * Three
  `))
  expect(nail('No change')).to.equal('No change')
  expect(nail(`
* No change
`)).to.equal(`
* No change
`)
})
