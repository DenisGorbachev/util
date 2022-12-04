import { stringify } from './JSON'

export class CustomError extends Error {
  public props: object;

  constructor(message: string, props: object) {
    // toString() should take care of displaying a proper message
    super(message)
    // assign props after message, so that the message is displayed first in toString()
    this.props = props

    // super(message + ' ' + stringify(props))
    // this._message = message
    // this._props = props
  }

  toJSONProps() {
    return stringify(this.props)
  }

  // NOTE: Don't redefine toJSON() as `return stringifyError(this)`, because this leads to infinite recursion
}

export class CompositeError extends Error {
  constructor(public errors: Error[]) {
    super('Multiple errors occurred: \n\n' + errors.map(e => `- ${e}\n`))
  }
}

export class WrappedError extends Error {
  constructor(public message: string, public error: Error) {
    super(`${message}\n\nWrapped error: ${error}`)
  }
}

export class InfoError<T> extends Error {
  constructor(public message: string, public info: T, public code: number) {
    super(message)
  }
}

export class IndexedError<Err extends Error> extends Error {
  constructor(public index: number, public error: Err) {
    super(`At index ${index}: ${error.toString()}`)
  }
}

export interface WithStack {
  stack: string
}

export function hasStack(obj: object): obj is WithStack {
  return Object.hasOwn(obj, 'stack')
}
