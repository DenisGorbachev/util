export function isDefined<T>(t: T | undefined): t is T {
  return t !== undefined
}

export function toEnum<K extends string>(...args: K[]): {[P in K]: P} {
  const result = {} as {[P in K]: P}
  args.forEach(k => result[k] = k)
  return result
}

export type Ordinal = number | string | Date

type EnumObject = {[key: string]: number | string};

type EnumObjectEnum<E extends EnumObject> = E extends {[key: string]: infer ET | string} ? ET : never;

export function getEnumValues<E extends EnumObject>(enumObject: E): EnumObjectEnum<E>[] {
  return Object.keys(enumObject)
    .filter(key => Number.isNaN(Number(key)))
    .map(key => enumObject[key] as EnumObjectEnum<E>)
}
