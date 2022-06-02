export interface EmptyObject {}

export function getKeys<Obj>(object: Obj) {
  // fix the type
  return Object.keys(object) as Array<keyof Obj>
}
