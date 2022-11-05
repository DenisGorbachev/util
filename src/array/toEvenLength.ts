export function toEvenLength<T>(array: T[]) {
  const isEven = array.length % 2 == 0
  return isEven ? array : array.slice(0, -1)
}
