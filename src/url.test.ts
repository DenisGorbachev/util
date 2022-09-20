import { expect } from './chai'
import { test } from '@jest/globals'
import { getTopLevelDomain, getTopLevelDomainFromHostname } from './url'

test(getTopLevelDomain.name, async function () {
  expect(getTopLevelDomain('https://example.com')).to.equal('example.com')
  expect(getTopLevelDomain('https://www.example.com')).to.equal('example.com')
  expect(getTopLevelDomain('https://sub.www.example.com')).to.equal('example.com')
})

test(getTopLevelDomainFromHostname.name, async function () {
  expect(getTopLevelDomainFromHostname('example.com')).to.equal('example.com')
  expect(getTopLevelDomainFromHostname('sub.example.com')).to.equal('example.com')
  expect(getTopLevelDomainFromHostname('sub.sub.example.com')).to.equal('example.com')
})
