import { stringify, stringifyError } from './JSON'

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

  toJSON() {
    return stringifyError(this)
  }

  toJSONProps() {
    return stringify(this.props)
  }

  toString() {
    return this.toJSON()
  }
}

export class CompositeError extends Error {
  constructor(public errors: Error[]) {
    super('Multiple errors occurred: \n\n' + errors.map(e => `- ${e}\n`))
  }
}

export class InfoError<T> extends Error {
  constructor(public message: string, public info: T, public code: number) {
    super(message)
  }
}

export interface ErrorLike {
  message: string
  stack: string
}

export function isErrorLike(obj: object): obj is ErrorLike {
  return Object.hasOwn(obj, 'message') && Object.hasOwn(obj, 'stack')
}
