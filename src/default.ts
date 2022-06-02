// default is a reserved word
export function def<T>(value: T | undefined, $default: T | undefined, error: Error): T {
  if (value !== undefined) {
    return value
  } else {
    if ($default !== undefined) {
      return $default
    } else {
      throw error
    }
  }
}
