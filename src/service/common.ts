import pkg from '@/manifest.json'

export const DefaultBaseUrl = import.meta.env.VITE_BASE_URL
export const DefaultHeaders = {
  Accept: 'application/json',
  'X-Version': `${encodeURIComponent(pkg.name)}/${pkg.versionCode}`,
}
export const timeout = 1000 * 3
