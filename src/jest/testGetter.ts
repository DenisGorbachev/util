import { test } from '@jest/globals'
import { expect } from '../chai'
import { Mapper } from '../lodash'
import { identity } from 'lodash-es'

export function testEqual<Val, Actual>(getter: () => Val, actual: Actual, mapper: Mapper<Val, Actual> = identity) {
  test(normalize(getter.name), function () {
    expect(mapper(getter())).to.deep.equal(actual)
  })
}

function normalize(name: string) {
  return name.replace('get_', '')
}
