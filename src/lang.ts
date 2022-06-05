import { last } from 'lodash-es'

/**
 * Compiled class name is different in dev & prod
 *
 * dev: task.class = "ManualTask"
 * prod: task.class = "ManualTask_ManualTask"
 */
export function getClassName(constructorName: string) {
  return last(constructorName.split('_'))
}
