import { ZodSchema } from 'zod'
import { expect } from '../chai'
import { test } from '@jest/globals'
import { getName } from '../zod'

export function testSamples<Obj>(schema: ZodSchema<Obj>, validSamples: Obj[], invalidSamples: Obj[]) {
  const name = getName(schema)

  test.each(validSamples)(name + ' valid sample matches schema', async function (sample) {
    const result = await schema.safeParseAsync(sample)
    if (result.success === false) console.error(result)
    expect(result).to.haveOwnProperty('success', true)
  })

  test.each(invalidSamples)(name + ' invalid sample does not match schema', async function (sample) {
    const result = await schema.safeParseAsync(sample)
    if (result.success === true) console.error(result)
    expect(result).to.haveOwnProperty('success', false)
  })
}
