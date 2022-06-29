import { expect, test } from '@jest/globals'
import { truncateToDay } from './date'

test(truncateToDay.name, () => {
  expect(truncateToDay(new Date('2022-05-31T12:32:23Z'))).toEqual(new Date('2022-05-31T00:00:00Z'))
})
