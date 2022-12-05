import { isArray, isBoolean, isNumber, isObject, isString } from 'lodash-es'

export interface WithOptionalIdentifiers {
  id?: string
  _id?: string
  uid?: string
  url?: string
  name?: string
  title?: string
}

export function guessObjectIdentifier(object: WithOptionalIdentifiers) {
  return object.id ?? object._id ?? object.uid ?? object.url ?? object.name ?? object.title
}

export function getMoniker(value: unknown) {
  if (isObject(value)) {
    if (value === null) {
      return 'null'
    } if (isArray(value)) {
      return `array[${value.length}]`
    } else {
      return `object("${guessObjectIdentifier(value)}")`
    }
  } if (isNumber(value) || isString(value) || isBoolean(value)) {
    return `primitive(${value})`
  } else {
    return 'value(unknown)'
  }
}
