import StackTrace from 'stacktrace-js'

export function getClearStackFrame(): ClearStackFrame {
  const functionName = undefined
  const fileName = undefined
  const lineNumber = undefined
  const columnNumber = undefined
  const stacktrace = StackTrace.getSync({ offline: true })
  const $stacktrace = stacktrace.slice(2) // needed because Next.js bundles multiple files into chunks, so filename information is not preserved
  for (const frame of $stacktrace) {
    // if (frame.fileName && (frame.fileName.endsWith('task.ts') || frame.fileName.endsWith('stacktrace.ts'))) continue
    return {
      functionName: !isGeneric(frame.functionName) ? frame.functionName : undefined,
      lineNumber: frame.lineNumber,
      columnNumber: frame.columnNumber,
      fileName: frame.fileName && frame.fileName.replace('webpack-internal:///', ''),
    }
  }
  return { functionName, fileName, lineNumber, columnNumber }
}

function isGeneric(functionName: string | undefined) {
  return [undefined, 'Object.<anonymous>', 'fulfilled', 'eval', 'undefined'].includes(functionName)
}

export interface ClearStackFrame {
  functionName?: string
  fileName?: string
  lineNumber?: number
  columnNumber?: number
}
