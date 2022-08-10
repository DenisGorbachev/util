import { expect } from './chai'
import { test } from '@jest/globals'
import { getTopLevelDomainFromHostname } from './url'

test('getTopLevelDomain', async function () {
  expect(getTopLevelDomainFromHostname('sub.sub.example.com')).to.equal('example.com')
  expect(getTopLevelDomainFromHostname('sub.example.com')).to.equal('example.com')
  expect(getTopLevelDomainFromHostname('example.com')).to.equal('example.com')
})
