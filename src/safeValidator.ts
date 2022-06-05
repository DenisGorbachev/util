// ValidatorMessage must be the validator itself translated into the language that is understood by the initial executor
import { impl } from './todo.js'

export type SafeValidatorMessage = unknown

export type SafeValidator<Val> = (value: Val) => Promise<SafeValidatorMessage[]>

export async function validateInParallel<T>(validator: SafeValidator<T>[]) {
  throw impl()
}
