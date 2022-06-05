import { expect } from './chai.js'
import { test } from '@jest/globals'
import { getTopLevelDomain } from './url.js'

test('getTopLevelDomain', async function () {
  expect(getTopLevelDomain('sub.sub.example.com')).to.equal('example.com')
  expect(getTopLevelDomain('sub.example.com')).to.equal('example.com')
  expect(getTopLevelDomain('example.com')).to.equal('example.com')
})
