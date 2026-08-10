export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers)
  headers.set("Content-Type", "application/json")

  const response = await fetch(`/api${path}`, {
    ...init,
    headers,
    credentials: "include",
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as {
      message?: string | string[]
    } | null
    const message = Array.isArray(payload?.message)
      ? payload.message[0]
      : payload?.message
    throw new Error(message ?? `Permintaan gagal (${response.status})`)
  }

  return response.json() as Promise<T>
}

export function apiDelete(path: string): Promise<void> {
  return apiRequest<void>(path, { method: "DELETE" })
}
