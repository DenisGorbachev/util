import { GenericCommand } from './GenericCommand'

/**
 * Internal command requires both runModel and runReal to return an object of Model type
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class InternalCommand<Model extends object, Real> extends GenericCommand<Model, Real, Model> {

}
