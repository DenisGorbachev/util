declare module 'execa/lib/command' {
  export function getEscapedCommand(file: string, args: readonly string[]): string
}
