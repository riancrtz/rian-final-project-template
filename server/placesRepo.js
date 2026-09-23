// The data-access layer, the same shape as m5a3.
//
// Every query is parameterised: values go in the array, never into the string.
// This is the single most important habit in database code, and it is what
// stops "'; DROP TABLE places; --" in a form field from being a real
// problem.

export async function getAll(pool) {
  const result = await pool.query(
    'SELECT * FROM places ORDER BY created_at DESC'
  )
  return result.rows
}

export async function getById(pool, id) {
  const result = await pool.query('SELECT * FROM places WHERE id = $1', [id])
  return result.rows[0] ?? null
}

export async function create(pool, { name, type, area, status, rating, notes, photos }) {
  const result = await pool.query(
    `INSERT INTO places (name, type, area, status, rating, notes, photos)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [name, type, area ?? '', status ?? 'want_to_try', rating ?? null, notes ?? '', photos ?? []]
  )
  return result.rows[0]
}

export async function update(pool, id, { name, type, area, status, rating, notes, photos }) {
  const result = await pool.query(
    `UPDATE places
     SET name = $1, type = $2, area = $3, status = $4, rating = $5, notes = $6, photos = $7
     WHERE id = $8
     RETURNING *`,
    [name, type, area ?? '', status ?? 'want_to_try', rating ?? null, notes ?? '', photos ?? [], id]
  )
  return result.rows[0] ?? null
}

export async function remove(pool, id) {
  const result = await pool.query(
    'DELETE FROM places WHERE id = $1 RETURNING id',
    [id]
  )
  return result.rowCount > 0
}