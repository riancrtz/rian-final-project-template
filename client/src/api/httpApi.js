// The real client. Every function here talks to YOUR Express API.
//
// This is the file that matters for your finals project. mockApi.js exists so
// you can build the interface before this has anywhere to point.

const BASE = import.meta.env.VITE_API_BASE_URL || ''

// For local development only. In Week 3, this needs a better solution (the
// browser will show its own login prompt) rather than baking credentials into
// the built client, which anyone can read. See journal notes on this.
const AUTH = 'Basic ' + btoa(`${import.meta.env.VITE_ADMIN_USER}:${import.meta.env.VITE_ADMIN_PASS}`)

async function request(path, options) {
  const response = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH,
    },
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
