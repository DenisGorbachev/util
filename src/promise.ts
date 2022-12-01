import { flatten, identity } from 'lodash-es'
import { AlwaysTrueTypeGuard } from './typescript'

export async function mapAsync<In, Out, Args extends unknown[]>(values: In[], mapper: (value: In, ...args: Args) => Promise<Out>, ...args: Args) {
  return Promise.all(values.map(value => mapper(value, ...args)))
}

export async function parallelMapEvery<In, Out, Args extends unknown[]>(values: In[], mapper: (value: In, ...args: Args) => Promise<Out>, ...args: Args) {
  const results = await parallelMap(values, mapper, ...args)
  return results.every(identity)
}

export async function parallelMap<In, Out, Args extends unknown[]>(values: In[], mapper: (value: In, ...args: Args) => Promise<Out>, ...args: Args) {
  return parallel(values.map(value => mapper(value, ...args)))
}

export async function parallelMapGet<In, Out, Args extends unknown[]>(getter: (...args: Args) => Promise<In[]>, mapper: (value: In, ...args: Args) => Promise<Out>, ...args: Args) {
  const values = await getter(...args)
  return parallel(values.map(value => mapper(value, ...args)))
}

export async function parallelFlatMap<In, Out, Args extends unknown[]>(values: In[], mapper: (value: In, ...args: Args) => Promise<Out[]>, ...args: Args) {
  const resultsArray = await Promise.all(values.map(value => mapper(value, ...args)))
  return flatten<Out>(resultsArray)
}

export async function parallelMapIndex<In, Out, Args extends unknown[]>(values: In[], mapper: (value: In, index: number, ...args: Args) => Promise<Out>, ...args: Args) {
  return parallel(values.map((value, index) => mapper(value, index, ...args)))
}

export async function sequentialMap<In, Out, Args extends unknown[]>(values: In[], mapper: (value: In, ...args: Args) => Promise<Out>, ...args: Args) {
  const results: Out[] = []
  for (const value of values) {
    results.push(await mapper(value, ...args))
  }
  return results
}

export async function sequentialMapAsyncGen<In, Out, Args extends unknown[]>(values: AsyncGenerator<In>, mapper: (value: In, ...args: Args) => Promise<Out>, ...args: Args) {
  const results: Out[] = []
  for await (const value of values) {
    results.push(await mapper(value, ...args))
  }
  return results
}

export async function parallelMapAsyncGen<In, Out, Args extends unknown[]>(values: AsyncGenerator<In>, mapper: (value: In, ...args: Args) => Promise<Out>, ...args: Args) {
  const promises: Promise<Out>[] = []
  for await (const value of values) {
    promises.push(mapper(value, ...args))
  }
  return parallel(promises)
}

export function parallel<A, M, K, N, P, D, G, C, O, L, Q, R>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>, Promise<C>, Promise<O>, Promise<L>, Promise<Q>, Promise<R>]): Promise<[A, M, K, N, P, D, G, C, O, L, Q, R]>;

export function parallel<A, M, K, N, P, D, G, C, O, L, Q>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>, Promise<C>, Promise<O>, Promise<L>, Promise<Q>]): Promise<[A, M, K, N, P, D, G, C, O, L, Q]>;

export function parallel<A, M, K, N, P, D, G, C, O, L>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>, Promise<C>, Promise<O>, Promise<L>]): Promise<[A, M, K, N, P, D, G, C, O, L]>;

export function parallel<A, M, K, N, P, D, G, C, O>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>, Promise<C>, Promise<O>]): Promise<[A, M, K, N, P, D, G, C, O]>;

export function parallel<A, M, K, N, P, D, G, C>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>, Promise<C>]): Promise<[A, M, K, N, P, D, G, C]>;

export function parallel<A, M, K, N, P, D, G>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>, Promise<G>]): Promise<[A, M, K, N, P, D, G]>;

export function parallel<A, M, K, N, P, D>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>, Promise<D>]): Promise<[A, M, K, N, P, D]>;

export function parallel<A, M, K, N, P>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>, Promise<P>]): Promise<[A, M, K, N, P]>;

export function parallel<A, M, K, N>(promises: [Promise<A>, Promise<M>, Promise<K>, Promise<N>]): Promise<[A, M, K, N]>;

export function parallel<A, M, K>(promises: [Promise<A>, Promise<M>, Promise<K>]): Promise<[A, M, K]>;

export function parallel<A, M>(promises: [Promise<A>, Promise<M>]): Promise<[A, M]>;

export function parallel<A>(promises: Promise<A>[]): Promise<A[]>;

export function parallel<A>(promises: Promise<A>[]): Promise<A[]> {
  return Promise.allSettled(promises).then(rethrowAny)
}

export async function together<In, Out, Args extends unknown[]>(mappers: Array<(...args: Args) => Promise<Out>>, ...args: Args) {
  return parallel(mappers.map(mapper => mapper(...args)))
}

export const rethrowErrors = <Err>(isError: (e: unknown) => e is Err) => <T>(results: PromiseSettledResult<T>[]) => {
  const reasons = []
  const values = []
  for (const result of results) {
    if (result.status === 'fulfilled') {
      values.push(result.value)
    } else {
      if (isError(result.reason)) {
        reasons.push(result.reason)
      } else {
        throw result.reason
      }
    }
  }
  if (reasons.length) {
    throw flatten(reasons)
  } else {
    return values
  }
}

export const rethrowAny = rethrowErrors(AlwaysTrueTypeGuard)
