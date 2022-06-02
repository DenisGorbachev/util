import { getHumanName } from './filesystem'

export function getCommandName(filename: string) {
  return getHumanName(filename)
}
