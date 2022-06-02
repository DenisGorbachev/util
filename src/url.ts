export function getTopLevelDomain(hostname: string) {
  return hostname.split('.').slice(-2).join('.')
}
