import { TFunction } from 'i18next'

export function withNamespace(t: TFunction, ns: string): TFunction {
  return (key, options?) => {
    return t(key, { ...(options ?? {}), ns })
  }
}

export function withNamespaces(t: TFunction, nses: string[]) {
  return nses.map(ns => withNamespace(t, ns))
}
