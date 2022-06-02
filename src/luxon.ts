import { DateTime } from 'luxon'

export function today(date: Date) {
  return DateTime.fromJSDate(date).startOf('day').toJSDate()
}

export function formatDay(date: Date) {
  return DateTime.fromJSDate(date).toFormat('yyyy-MM-dd')
}
