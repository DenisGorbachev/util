import { TFunction } from 'i18next'

export function withNamespace(t: TFunction, ns: string) {
  return (key: string) => t(key, { ns })
}
