import { todo } from '../../todo.js'
import { constant } from 'fast-check'
import { Interval } from 'luxon'

export function arbitraryInterval() {
  return todo(constant(Interval.fromDateTimes(new Date(0), new Date(0))))
}
