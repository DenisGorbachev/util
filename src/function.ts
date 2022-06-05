import { startCase } from 'lodash-es'

export function humanize(functionName: string) {
  return startCase(functionName)
}
