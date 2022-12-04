export interface ResultSuccess<Value> {
  success: true
  value: Value
}

export declare type ResultFailure<Error> = {
  success: false
  error: Error
};

export type Result<Value, Error> = ResultSuccess<Value> | ResultFailure<Error>;

export const isSuccess = <Value, Error>(result: Result<Value, Error>): result is ResultSuccess<Value> => result.success

export const isFailure = <Value, Error>(result: Result<Value, Error>): result is ResultFailure<Error> => !result.success

export const splitResults = <Value, Error>(results: Result<Value, Error>[]) => {
  return {
    values: results.filter(isSuccess).map(r => r.value),
    errors: results.filter(isFailure).map(r => r.error),
  }
}
