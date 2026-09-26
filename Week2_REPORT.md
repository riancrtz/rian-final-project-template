# Weekly Increment Report

Week of: September 21-27, 2026

## What changed this week

- Set up a real PostgreSQL database on Neon (free tier, Singapore region)
- Rewrote `server/db/schema.sql` and `server/db/seed.sql` for a `places` table matching my proposal's data shape, replacing the template's `sightings` table
- Wrote `placesRepo.js` with parameterized queries (getAll, getById, create, update, remove), replacing the old `sightingsRepo.js`
- Rewrote `server.js` to use the new `places` routes and repo
- Added an HTTP Basic Auth middleware to gate every `/api/places` route, per my professor's new security requirement (the app has no login system otherwise)
- Deployed the Express API to Render, connected to the real Neon database
- Connected the deployed GitHub Pages client to the real deployed API (set `VITE_USE_MOCK_API=false` and `VITE_API_BASE_URL` as repository variables, triggered a rebuild)
- Replaced the original Basic Auth approach (browser-native login popup) with an in-app login screen after discovering the native popup doesn't work reliably across origins in incognito windows
- Wrote `SECURITY-CHECKLIST.md` (31 rows) in my workspace, going through secrets, GitHub Actions, database, access control, input/output, and repository privacy checks
- Updated the repository's `README.md` to match my professor's exact 7-section documentation guide, and added `AI-USAGE.md` with a full record of AI assistance used
- Added a type filter (Restaurant/Cafe) to the Home screen myself, extending the existing status filter pattern, as a genuine "written by me" piece for the AI usage record

## Why

Last week's app only had a working front end using mock/localStorage data. This week's goal was to build the actual backend: a real database, a real API, and to secure it properly, since my professor's new security brief specifically requires an access gate on any app that writes to a public database with no login system.

## What broke or what I got stuck on

- My first attempt at securing the app baked admin credentials directly into the client's build using `VITE_` environment variables, which I later realized is a real security flaw, since those variables are compiled into public JavaScript
- I initially assumed the browser's native Basic Auth popup would work fine once deployed, but testing in an incognito window showed it failed with a 401, since modern browsers partition cached auth credentials by top-level site, especially in private windows. I had to build a proper in-app login screen instead
- After adding the type filter myself, I ended up with two buttons both labeled "All" (one for status, one for type), which was confusing until I relabeled them "All statuses" and "All types"
- A `git push` was rejected twice this week because I'd made small edits directly on GitHub's web editor (the README) that my local repo didn't have yet, fixed both times with `git pull` then `git push`

## What is left

- No photo upload yet, the data model supports a `photos` field, but there's no upload UI built
- No Place Detail screen yet, places can only be added or deleted from the list, there's no way to view or edit one place's full info
- Styling still uses the template's default look, my own design system (colors, spacing, components) hasn't been applied yet
- The database user the app connects as (`neondb_owner`) has full owner privileges rather than being scoped down to only what the app needs
- GitHub Actions workflow uses moveable version tags rather than pinned commit SHAs (this came from the class template unmodified)
