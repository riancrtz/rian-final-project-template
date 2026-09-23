-- The complete shape of the database. Safe to run against an empty database,
-- and safe to run twice.
--
-- This file is committed on purpose. Your schema is a fact about your
-- application, not a runtime concern: it should be readable by opening a file
-- rather than by connecting to a server. It is also what lets you move to a
-- hosted database in one command.

CREATE TABLE IF NOT EXISTS places (
  id         SERIAL PRIMARY KEY,
  name       TEXT        NOT NULL,
  type       TEXT        NOT NULL CHECK (type IN ('restaurant', 'cafe')),
  area       TEXT        NOT NULL DEFAULT '',
  status     TEXT        NOT NULL DEFAULT 'want_to_try' CHECK (status IN ('want_to_try', 'visited')),
  rating     INTEGER     CHECK (rating BETWEEN 1 AND 5),
  notes      TEXT        NOT NULL DEFAULT '',
  photos     TEXT[]      NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- The home screen filters by status often, so index it.
CREATE INDEX IF NOT EXISTS places_status_idx
  ON places (status);
