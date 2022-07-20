export function safeParseJSON(input: string, $default = {}) {
  try {
    return JSON.parse(input)
  } catch (e) {
    return $default
  }
}

export function stringify(value: unknown) {
  return JSON.stringify(value, null, 2)
}

export function stringifyError(error: Error) {
  return JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
}

export function toSerializableValue(value?: string) {
  return value ?? null
}
