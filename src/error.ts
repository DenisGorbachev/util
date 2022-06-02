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
