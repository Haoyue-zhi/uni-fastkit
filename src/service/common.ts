import pkg from '@/manifest.json'

export const DefaultBaseUrl = import.meta.env.VITE_BASE_URL
export const DefaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Version': `${encodeURIComponent(pkg.name)}/${pkg.versionCode}`,
}
export const timeout = 1000 * 3
