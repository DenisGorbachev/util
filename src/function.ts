import { startCase } from 'lodash'

export function humanize(functionName: string) {
  return startCase(functionName)
}
