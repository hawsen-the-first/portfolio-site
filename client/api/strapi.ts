const BASE = (import.meta as { env: { VITE_STRAPI_URL?: string } }).env
  .VITE_STRAPI_URL ?? 'http://localhost:1337'

export const strapiUrl = (path: string) =>
  path.startsWith('http://') || path.startsWith('https://') ? path : `${BASE}${path}`

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(strapiUrl(path), init)
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

export const strapiGet = <T>(path: string) => request<T>(path)

export const strapiPost = <T>(path: string, body: unknown) =>
  request<T>(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
