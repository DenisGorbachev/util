/**
 * Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
 */
export function escape(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function getMatchesByIndex(matches: IterableIterator<RegExpMatchArray>, index: number) {
  return [...matches].map(m => m[index])
}
