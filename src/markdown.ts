export function listMD(items: string[]) {
  return items.map(i => `* ${i}`).join('\n')
}
