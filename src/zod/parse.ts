import { ZodError, ZodSchema, ZodType, ZodTypeDef } from 'zod'
import { CompositeError, IndexedError } from '../error'

export function parseOneLog<Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodSchema<Output, Def, Input>, input: Input) {
  const result = schema.safeParse(input)
  if (result.success) {
    return result.data
  } else {
    console.error('input', input)
    throw result.error
  }
}

export function parseMany<Output, Def extends ZodTypeDef = ZodTypeDef, Input = Output>(schema: ZodType<Output, Def, Input>, inputs: Input[]) {
  const results = inputs.map(b => schema.safeParse(b))
  const initial: ErrorsValues<IndexedError<ZodError>, Output> = { errors: [], values: [] }
  const { values, errors } = results.reduce(function ({ errors, values }, result, index) {
    if (result.success) {
      const value = result.data
      return { errors, values: values.concat([value]) }
    } else {
      const error = new IndexedError(index, result.error)
      return { errors: errors.concat([error]), values }
    }
  }, initial)
  if (errors.length) throw new CompositeError(errors)
  return values
}

export interface ErrorsValues<Err, Val> {
  errors: Err[]
  values: Val[]
}
