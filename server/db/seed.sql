-- Sample data for development.
--
-- This starts with TRUNCATE. That is correct on your laptop and catastrophic
-- against the database your live demo depends on. Check which DATABASE_URL is
-- loaded before you run it.

TRUNCATE TABLE places RESTART IDENTITY CASCADE;

INSERT INTO places (name, type, area, status, rating, notes, photos) VALUES
  ('LALA Garden', 'cafe', 'Angeles City', 'visited', 4,
   'Great Mango Shake, go before 5pm.', '{}'),
  ('Grill Seoul', 'restaurant', 'Clark', 'want_to_try', NULL,
   '', '{}'),
  ('John''s Kitchen', 'restaurant', 'Angeles City', 'visited', 5,
   'They have the best steaks.', '{}'),
  ('Cafe Dia', 'cafe', 'Clark', 'want_to_try', NULL,
   '', '{}');
