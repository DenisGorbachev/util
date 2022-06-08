import fs, { FileHandle, mkdir, readFile } from 'fs/promises'
import { OpenMode, PathLike } from 'fs'
import { basename } from 'path'
import { Abortable } from 'events'

export type Path = string

export async function readFileAsString(path: PathLike | FileHandle, options?: { encoding?: null, flag?: OpenMode } & Abortable | null): Promise<string> {
  const buffer = await readFile(path, options)
  return buffer.toString()
}

export function getHumanName(filename: string) {
  return basename(filename).split('.')[0]
}

export async function fileExists(path: PathLike) {
  return fs.stat(path).then(stat => true).catch(e => false)
}

export async function mkdirIfNoxExists(folder: string) {
  if (!await fileExists(folder)) {
    await mkdir(folder, { recursive: true })
  }
}
