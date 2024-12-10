import pkg from '@/manifest.json'

export const baseUrl = import.meta.env.VITE_BASE_URL
export const commonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Version': `${pkg.name}/${pkg.versionCode}`,
}
