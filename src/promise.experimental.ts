async function test_parallel_variadic() {
  const [str, num] = await parallel_variadic([
    Promise.resolve('something'),
    Promise.resolve(1),
  ])
  str.toLowerCase()
  num.toExponential()
}

/**
 * TODO: replace body with `return Promise.allSettled(promises).then(rethrowAny)`
 */
function parallel_variadic<T extends unknown[]>(promises: readonly [...T]): Promise<{ readonly [P in keyof T]: Awaited<T[P]> }> {
  return Promise.all(promises)
}

export default {}
