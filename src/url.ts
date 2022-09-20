/**
 * "getDomain", not "getHostname", because "domain" is more common
 */
export function getDomain(url: string) {
  return new URL(url).hostname
}

export function getTopLevelDomainFromHostname(hostname: string) {
  return hostname.split('.').slice(-2).join('.')
}

export function getTopLevelDomain(url: string) {
  return getTopLevelDomainFromHostname(getDomain(url))
}
