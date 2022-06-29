import { expect } from './chai'
import { test } from '@jest/globals'
import { getTopLevelDomain } from './url'

test('getTopLevelDomain', async function () {
  expect(getTopLevelDomain('sub.sub.example.com')).to.equal('example.com')
  expect(getTopLevelDomain('sub.example.com')).to.equal('example.com')
  expect(getTopLevelDomain('example.com')).to.equal('example.com')
})
