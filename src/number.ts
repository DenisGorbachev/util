export function betweenLeftRight(a: number, i: number, b: number) {
  return a <= i && i <= b
}

export function betweenRight(a: number, i: number, b: number) {
  return a < i && i <= b
}

export function roundDownBy(a: number, b: number) {
  return Math.trunc(a / b) * b
}
