import { useEffect, useState } from 'react'
import { listPlaces, createPlace, deletePlace } from './api'
import DemoNotice from './components/DemoNotice.jsx'

// A deliberately small working app. Replace all of it with your own project.
//
// What is worth keeping is the SHAPE: four states rather than two, a loading
// message that admits a free-tier server can be slow to wake, and errors that
// say something rather than rendering an empty list.

const EMPTY_FORM = { name: '', type: 'restaurant', area: '', status: 'want_to_try', rating: 4, notes: '' }

export default function App() {
  const [status, setStatus] = useState('loading')   // loading | ready | error
  const [places, setPlaces] = useState([])
  const [error, setError] = useState(null)
  const [slow, setSlow] = useState(false)
  const [view, setView] = useState('home')          // home | visited | add
  const [filter, setFilter] = useState('all')        // all | want_to_try | visited
  const [form, setForm] = useState(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  async function load() {
    setStatus('loading')
    setError(null)
    const timer = setTimeout(() => setSlow(true), 3000)
    try {
      setPlaces(await listPlaces())
      setStatus('ready')
    } catch (caught) {
      setError(caught)
      setStatus('error')
    } finally {
      clearTimeout(timer)
      setSlow(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim()) return

    setSaving(true)
    try {
      const created = await createPlace({
        name: form.name.trim(),
        type: form.type,
        area: form.area.trim(),
        status: form.status,
        rating: form.status === 'visited' ? Number(form.rating) : null,
        notes: form.notes.trim(),
        photos: [],
      })
      setPlaces([created, ...places])
      setForm(EMPTY_FORM)
      setView('home')
    } catch (caught) {
      setError(caught)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    const previous = places
    setPlaces(places.filter((p) => p.id !== id))
    try {
      await deletePlace(id)
    } catch (caught) {
      setPlaces(previous)
      setError(caught)
    }
  }

  const visiblePlaces =
    view === 'visited'
      ? places.filter((p) => p.status === 'visited')
      : filter === 'all'
      ? places
      : places.filter((p) => p.status === filter)

  return (
    <div className="page">
      <header>
        <h1>Yumzys</h1>
        <p className="lede">Restaurant &amp; café bucket list.</p>
      </header>

      <DemoNotice />

      <nav className="row-head" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
        <button onClick={() => setView('home')} disabled={view === 'home'}>Home</button>
        <button onClick={() => setView('visited')} disabled={view === 'visited'}>Visited</button>
        <button onClick={() => setView('add')} disabled={view === 'add'}>Add Place</button>
      </nav>

      {error && (
        <p className="error" role="alert">
          {error.message} <button onClick={load}>Try again</button>
        </p>
      )}

      {view === 'add' && (
        <form onSubmit={handleSubmit} className="card">
          <h2>Add a place</h2>

          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            maxLength={120}
            required
          />

          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="restaurant">Restaurant</option>
            <option value="cafe">Cafe</option>
          </select>

          <label htmlFor="area">Area</label>
          <input
            id="area"
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            maxLength={120}
          />

          <label htmlFor="place-status">Status</label>
          <select
            id="place-status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="want_to_try">Want to try</option>
            <option value="visited">Visited</option>
          </select>

          {form.status === 'visited' && (
            <>
              <label htmlFor="rating">Rating, 1 to 5</label>
              <input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
              />
            </>
          )}

          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            maxLength={2000}
            rows={3}
          />

          <button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Save place'}
          </button>
        </form>
      )}

      {view !== 'add' && (
        <>
          {view === 'home' && (
            <div className="row-head" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
              <button onClick={() => setFilter('all')} disabled={filter === 'all'}>All</button>
              <button onClick={() => setFilter('want_to_try')} disabled={filter === 'want_to_try'}>Want to Try</button>
              <button onClick={() => setFilter('visited')} disabled={filter === 'visited'}>Visited</button>
            </div>
          )}

          {status === 'loading' && (
            <p className="muted">
              Loading{slow ? '. The server may be waking up, which can take up to a minute.' : '...'}
            </p>
          )}

          {status === 'ready' && visiblePlaces.length === 0 && (
            <p className="muted">No places here yet.</p>
          )}

          {status === 'ready' && visiblePlaces.length > 0 && (
            <ul className="list">
              {visiblePlaces.map((place) => (
                <li key={place.id} className="card">
                  <div className="row-head">
                    <h3>{place.name}</h3>
                    {place.status === 'visited' ? (
                      <span aria-label={`Rating ${place.rating} of 5`}>
                        {'★'.repeat(place.rating)}{'☆'.repeat(5 - place.rating)}
                      </span>
                    ) : (
                      <span className="muted">Want to try</span>
                    )}
                  </div>
                  <p className="muted">{place.type} · {place.area}</p>
                  {place.notes
                    ? <p>{place.notes}</p>
                    : <p className="muted">No notes yet.</p>}
                  <footer>
                    <button onClick={() => handleDelete(place.id)}>Delete</button>
                  </footer>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
