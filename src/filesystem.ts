import fs, { mkdir } from 'fs/promises'
import { PathLike } from 'fs'
import { basename } from 'path'

export type Path = string

export function getHumanName(filename: string) {
  return basename(filename).split('.')[0]
}

export async function fileExists(path: PathLike) {
  return fs.stat(path).then(stat => true).catch(e => false)
}

export async function mkdirIfNoxExists(folder: string) {
  if (!await fileExists(folder)) {
    await mkdir(folder)
  }
}
