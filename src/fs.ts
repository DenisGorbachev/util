import { PathLike } from 'fs'
import { readdir } from 'fs/promises'

export async function isFile(path: PathLike) {
  throw new Error('Implement me')
}

export async function getFolderPaths(folder: PathLike) {
  const filenames = await readdir(folder)
  return filenames.map(filename => `${folder}/${filename}`)
}
