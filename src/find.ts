// export type Query<Obj> = { [Prop in keyof Obj]: Condition<Obj[Prop]> }
//
// export interface Condition<T> {
//   $eq?: T
//   $gt?: T
//   $gte?: T
//   $lt?: T
//   $lte?: T
// }
//
// const conditionFuncs = {
//   $eq: (a: Ordinal, b: Ordinal) => a === b,
//   $gt: (a: Ordinal, b: Ordinal) => a > b,
//   $gte: (a: Ordinal, b: Ordinal) => a >= b,
//   $lt: (a: Ordinal, b: Ordinal) => a < b,
//   $lte: (a: Ordinal, b: Ordinal) => a <= b,
// }
//
// export function find<Obj>(query: Query<Obj>, array: Obj[]) {
//   return array.find(filter(query))
// }
//
// const filter = <Obj>(query: Query<Obj>) => (object: Obj) => {
//   for (const key in query) {
//     const condition = query[key]
//     for (const conditionKey in condition) {
//       const conditionFuncKey = conditionKey as keyof typeof conditionFuncs
//       const conditionFunc = conditionFuncs[conditionFuncKey]
//       const conditionValue = condition[conditionKey]
//       if (!conditionFunc) throw new Error(`Can't find a condition function for operator ${conditionKey}`)
//       if (!conditionFunc(object[key], conditionValue)) {
//         return false
//       }
//     }
//   }
//   return true
// }

export {}
