export async function *fromArray<T>(array: T[]) {
  for (const el of array) {
    yield el
  }
}
