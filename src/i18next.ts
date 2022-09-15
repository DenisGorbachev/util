import { TFunction } from 'i18next'

export function withNamespace(t: TFunction, ns: string) {
  return (key: string) => t(key, { ns })
}

export function withNamespaces(t: TFunction, nses: string[]) {
  return nses.map(ns => withNamespace(t, ns))
}
