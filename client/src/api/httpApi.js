const BASE = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, options) {
  const response = await fetch(`${BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`
    try {
      const body = await response.json()
      if (body?.error) message = body.error
    } catch {
      // not JSON
    }
    throw new Error(message)
  }

  return response.status === 204 ? null : response.json()
}

export const listPlaces = () => request('/api/places')

export const getPlace = (id) => request(`/api/places/${id}`)

export const createPlace = (input) =>
  request('/api/places', { method: 'POST', body: JSON.stringify(input) })

export const updatePlace = (id, input) =>
  request(`/api/places/${id}`, { method: 'PUT', body: JSON.stringify(input) })

export const deletePlace = (id) =>
  request(`/api/places/${id}`, { method: 'DELETE' })