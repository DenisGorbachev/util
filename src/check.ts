import { find } from 'lodash'

export interface Check {
  name: string,
  value: boolean
  date: Date
}

export function includes(checks: Check[], names: string[]) {
  for (const name of names) {
    const check = find(checks, { name })
    if (!check) throw new Error(`Check not found: "${name}"`)
    if (!check.value) return false
  }
  return true
}
