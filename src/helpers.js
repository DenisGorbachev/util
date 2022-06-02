import { compact, every, flatten } from 'lodash'

export async function getTaskFromAggregatedTask(proto, getter, context) {
  const children = await getter(context)
  return Object.assign({}, proto, {
    children,
  })
}

export function tsk(type, userIds, data) {
  return { type, userIds, data }
}

export function bundle(object, tasks) {
  return [object, object ? [] : tasks]
}

export function $t(tasks) {
  return compact(flatten(tasks))
}

export const isServer = typeof window === 'undefined'

export const isClient = typeof window !== 'undefined'

export const isProd = process.env.NODE_ENV === 'production'

export const isDev = process.env.NODE_ENV === 'development'

export const isTest = process.env.NODE_ENV === 'test'
