import { Mapper } from '../lodash'
import { sum } from 'lodash-es'

export const getAverageBy = <Val>(mapper: Mapper<Val, number>) => (array: Val[]) => sum(array.map(mapper)) / array.length
