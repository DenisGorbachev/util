import { day } from './duration'
import { DateTime } from 'luxon'
// import './luxon-business-days'
// import { DateTime as DateTimeBusiness } from 'luxon-business-days'

export type MaybeDate = Date | undefined

export type DateLike = Date | string | number

export interface WithDate { date: Date }

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

// export function addBusiness(date: Date, duration: Duration) {
//   return DateTimeBusiness.fromJSDate(date).plusBusiness(duration).toJSDate()
// }

export function byDate(a: WithDate, b: WithDate) {
  return a.date.getTime() - b.date.getTime()
}
