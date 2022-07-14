import { AsyncCommand } from 'fast-check'
import { ImplementationError } from '../../todo'
import { expect } from '../../chai'

// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class GenericCommand<Model extends object, Real, Result> implements AsyncCommand<Model, Real, true> {
  async run(model: Model, real: Real) {
    await this.expectEqualResults(this.runModel(model), this.runReal(real))
  }

  async expectEqualResults(modelTxPromise: Promise<Result>, realTxPromise: Promise<Result>) {
    const [modelResult, realResult] = await Promise.allSettled([modelTxPromise, realTxPromise])
    try {
      expect(modelResult.status).to.equal(realResult.status)
      if (modelResult.status === 'fulfilled' && realResult.status === 'fulfilled') {
        expect(modelResult.value).to.deep.equal(realResult.value)
      } else if (modelResult.status === 'rejected' && realResult.status === 'rejected') {
        expect(modelResult.reason.toString()).to.equal(realResult.reason.toString())
        if (modelResult.reason instanceof ImplementationError || realResult.reason instanceof ImplementationError) {
          throw new Error('Unexpected ImplementationError')
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        if (modelResult.status === 'rejected') e.message += '\n\nModel ' + modelResult.reason.stack
        if (realResult.status === 'rejected') e.message += '\n\nReal ' + realResult.reason.stack
      }
      throw e
    }
  }

  abstract check(model: Readonly<Model>): Promise<boolean>

  abstract runModel(model: Model): Promise<Result>

  abstract runReal(real: Real): Promise<Result>

  toString(): string {
    return `${this.constructor.name} ${JSON.stringify(this, undefined, 2)}`
  }

}
