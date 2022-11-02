/**
 * "getDomain", not "getHostname", because "domain" is more common
 */
export function getDomain(url: string) {
  return new URL(url).hostname
}

export function getBaseDomainFromHostname(hostname: string) {
  return hostname.split('.').slice(-2).join('.')
}

export function getBaseDomain(url: string) {
  return getBaseDomainFromHostname(getDomain(url))
}
