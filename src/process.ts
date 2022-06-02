/**
 * Next.js inlines `process.env.VAR_NAME` during build, so they must be passed directly
 * @param name
 * @param value
 */
export function ensureEnvVar(name: string, value: string | undefined) {
  if (!value) throw new Error(`process.env.${name} is required`)
  return value
}

export function getArrayEnvVar(name: string, value: string | undefined): string[] {
  const valuesAsString = ensureEnvVar(name, value)
  return valuesAsString.split(',')
}

export function getNonEmptyArrayEnvVar(name: string, value: string | undefined): [string, ...string[]] {
  const values = getArrayEnvVar(name, value)
  if (!values.length) throw new Error(`process.env.${name} must be a comma-separated list with at least one element`)
  const first = values[0]
  const rest = values.slice(1)
  return [first, ...rest]
}

export function getBooleanEnvVar(name: string, value: string | undefined): boolean {
  const $value = value ? value.toLowerCase() : ''
  return ['t', 'y', 'true', 'yes', '1'].includes($value)
}
