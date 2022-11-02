import { expect } from './chai'
import { test } from '@jest/globals'
import { getBaseDomain, getBaseDomainFromHostname } from './url'

test(getBaseDomain.name, async function () {
  expect(getBaseDomain('https://example.com')).to.equal('example.com')
  expect(getBaseDomain('https://www.example.com')).to.equal('example.com')
  expect(getBaseDomain('https://sub.www.example.com')).to.equal('example.com')
})

test(getBaseDomainFromHostname.name, async function () {
  expect(getBaseDomainFromHostname('example.com')).to.equal('example.com')
  expect(getBaseDomainFromHostname('sub.example.com')).to.equal('example.com')
  expect(getBaseDomainFromHostname('sub.sub.example.com')).to.equal('example.com')
})
