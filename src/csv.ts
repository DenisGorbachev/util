import { Options, Stringifier, stringify } from 'csv-stringify'
import { createWriteStream } from 'fs'
import { pipeline } from './stream.js'

export type ToCsvArray<Obj> = (object: Obj) => unknown[]

export function getCsvStringifier<Obj>(options: Options, toCsvArray: ToCsvArray<Obj>, objects: Obj[]) {
  const array = objects.map(toCsvArray)
  return stringify(array, options)
}

export async function writeCsvFile<Obj>(stringifier: Stringifier, path: string) {
  const writeStream = createWriteStream(path)
  return pipeline(stringifier, writeStream)
}
