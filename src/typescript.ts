export function isDefined<T>(t: T | undefined): t is T {
  return t !== undefined
}

export function toEnum<K extends string>(...args: K[]): {[P in K]: P} {
  const result = {} as {[P in K]: P}
  args.forEach(k => result[k] = k)
  return result
}

export type Ordinal = number | string | Date
