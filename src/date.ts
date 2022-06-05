import { day } from './duration.js'
import { DateTime } from 'luxon'

export type MaybeDate = Date | undefined

export type DateLike = Date | string | number

export const MAX_DATE = new Date(8640000000000000)

export const MIN_DATE = new Date(-8640000000000000)

export const already = new Date(0)

export function equal(a: Date, b: Date) {
  return a.getTime() === b.getTime()
}

export function yesterday(now: Date) {
  return new Date(now.getTime() - day)
}

export function add(date: Date, durationInMilliseconds: number) {
  return new Date(date.getTime() + durationInMilliseconds)
}

export function sub(date: Date, durationInMilliseconds: number) {
  return new Date(date.getTime() - durationInMilliseconds)
}

export function timeBetween(fromHour: number, toHour: number, date: Date) {
  const { hour } = DateTime.fromJSDate(date, { zone: 'UTC' })
  return hour >= fromHour && hour < toHour
}

export function truncateToDay(date: Date) {
  return DateTime.fromJSDate(date, { zone: 'UTC' }).startOf('day').toJSDate()
}
