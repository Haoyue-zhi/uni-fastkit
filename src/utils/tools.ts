const ensureDecodeURIComponent = (url: string) => {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }
  return url
}

// 解析 path
export function parseUrl(fullPath: string) {
  const [path, queryStr] = fullPath.split('?')
  const name = path.slice(path.lastIndexOf('/') + 1)
  const query: Record<string, string> = {}

  if (queryStr) {
    queryStr.split('&').forEach((item) => {
      const [key, value] = item.split('=')
      query[key] = ensureDecodeURIComponent(value)
    })
  }

  return { name, path, query }
}

// 还原url
export function restoreUrl(path: string, query: Record<string, unknown>) {
  let count = 0
  for (const key in query) {
    path += `${count === 0 ? '?' : '&'}${key}=${query[key]}`
    count += 1
  }
  return path
}
