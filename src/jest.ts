import { ZodSchema } from 'zod'
import { expect } from './chai'

export function testSamples<Obj>(name: string, schema: ZodSchema<Obj>, validSamples: Obj[], invalidSamples: Obj[]) {
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
