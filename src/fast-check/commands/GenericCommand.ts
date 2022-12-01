import { AsyncCommand } from 'fast-check'
import { expectEqualResults } from '../../chai/expectEqualResults'
import { stringify } from '../../JSON'

// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class GenericCommand<Model extends object, Real, Result> implements AsyncCommand<Model, Real, true> {
  async run(model: Model, real: Real) {
    await this.expectEqualResults(this.runModel(model), this.runReal(real))
  }

  async expectEqualResults(modelTxPromise: Promise<Result>, realTxPromise: Promise<Result>) {
    return expectEqualResults('Model', 'Real')(modelTxPromise, realTxPromise)
  }

  abstract check(model: Readonly<Model>): Promise<boolean>

  abstract runModel(model: Model): Promise<Result>

  abstract runReal(real: Real): Promise<Result>

  toString(): string {
    return `${this.constructor.name} ${(stringify(this))}`
  }

}
