export function weight(amount: number, unit: string) {
  switch (unit) {
    case 'kg':
    case 'kgs':
      return amount * 1000
    case 'lb':
    case 'lbs':
      return amount * 453.59237
    case 'gram':
    case 'grams':
      return amount
    default:
      throw new Error(`Unknown unit: ${unit}`)
  }
}
