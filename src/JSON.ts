import { Result } from './result'
import { ensureIsError } from './ensure'
import { WrappedError } from './error'

export function safeParseJSON(input: string): Result<unknown, Error> {
  try {
    return {
      success: true,
      value: JSON.parse(input),
    }
  } catch (error) {
    return {
      success: false,
      error: ensureIsError(error),
    }
  }
}

export function parseJSON(input: string) {
  const result = safeParseJSON(input)
  if (result.success) {
    return result.value
  } else {
    throw new WrappedError('Could not parse JSON', { input }, result.error)
  }
}

export function stringify(value: unknown) {
  return JSON.stringify(value, null, 2)
}

export function stringifyError(error: Error) {
  return JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
}

/**
 * Useful for avoiding the serialization issues with data types that are not directly serializable (e.g. Date)
 */
export function restringify(value: unknown) {
  return JSON.parse(JSON.stringify(value))
}

export function toSerializableValue(value?: string) {
  return value ?? null
}
