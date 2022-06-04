import { getHumanName } from './filesystem.js'

export function getCommandName(filename: string) {
  return getHumanName(filename)
}
