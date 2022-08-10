export function getTopLevelDomainFromHostname(hostname: string) {
  return hostname.split('.').slice(-2).join('.')
}

export function getDomainFromUrl(url: string) {
  return new URL(url).hostname
}
