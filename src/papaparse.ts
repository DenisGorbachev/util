import { camelCase } from 'lodash-es'
import { parse as parseOriginal, ParseConfig } from 'papaparse'
import { strict as assert } from 'assert'

export async function parse<T = unknown>(contents: string, config: ParseConfig<T> = {}) {
  const result = await parseOriginal<T>(contents.trim(), {
    header: true,
    transformHeader: camelCase,
    ...config,
  })
  assert.deepEqual(result.errors, [])
  return result.data
}

export function getPapaparseDefaultConfig<T = unknown, TInput = undefined>(): ParseConfig<T, TInput> {
  return {
    header: true,
    transformHeader: camelCase,
  }
}

export const transformHeaderFromRecord = (headers: Record<string, string>) => (header: string, index: number) => {
  return headers[header] || camelCase(header)
}
