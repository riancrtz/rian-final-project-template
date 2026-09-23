# Yumzys

A restaurant and café bucket list app: track places you want to try around
Angeles/Pampanga, mark them as visited, and rate them. Built for one person

planning food trips.

Live site: https://riancrtz.github.io/rian-final-project-template/
API: (not deployed yet)
Demo video: (link, added in Week 3)

> This deployment is running in demo mode. The interface is real; the backend
> is simulated in your browser so the site works without a server. See Demo
> mode below. Delete this quote once your API is live.

<img width="1535" height="814" alt="yumzys-live-ss" src="https://github.com/user-attachments/assets/264db2bc-13eb-481d-bde9-694cb88593e6" />
<img width="1535" height="814" alt="yumzys-live-ss-1" src="https://github.com/user-attachments/assets/695b076a-b86e-459b-b2f6-59bb8bf5968e" />

## What it does

- Add a place (restaurant or café) with a name, area, and status
- Mark a place as "want to try" or "visited"
- Rate a place once it's marked visited
- Browse all places, filtered by status
- Delete a place

## Built with

React and Vite on the front end. Express and PostgreSQL on the back end
(not built yet). The client is on GitHub Pages; the API and database are
not deployed yet.

## Demo mode

This repository can run two ways, chosen by one environment variable at
build time.

| `VITE_USE_MOCK_API` | What happens |
|---|---|
| unset, or anything but `false` | The client answers its own requests from `localStorage`. No server, no database, nothing shared between visitors. This is what the site currently runs on. |
| `false` | The client calls the Express API at `VITE_API_BASE_URL`, which reads and writes real PostgreSQL. Not available yet. |

Demo mode is a starting point, not a finished project. My finals submission
will be all three pieces (client, API, database) deployed and talking to
each other.

## Running it yourself

The client only, in demo mode. No database needed.

cd client
npm install
cp .env.example .env # VITE_USE_MOCK_API stays unset
npm run dev # http://localhost:5173


The whole stack (API and database) is not built yet. This section will be
updated once `server/` is working.

## Environment variables

None of these are committed. `.env.example` in `client/` lists them with
placeholder values.

| Name | Where | What it is |
|---|---|---|
| `VITE_USE_MOCK_API` | client, at build time | only `false` turns demo mode off; unset means on |
| `VITE_API_BASE_URL` | client, at build time | the API's public URL, no trailing slash (not used yet) |

## Deploying

Client, to GitHub Pages. Already wired up in
`.github/workflows/deploy-pages.yml`.

- Settings > Pages > Build and deployment > Source: **GitHub Actions**
- Repository must be public for Pages to serve it on a free account

API and database are not deployed yet.

## Project structure

client/
src/api/ one interface, two implementations, chosen by a variable
index.js picks mock or real API based on env variable
mockApi.js simulated backend, stores data in localStorage
httpApi.js real API calls (not yet connected to a backend)
seed.json starter place data
src/components/
DemoNotice.jsx banner shown while running in demo mode
src/App.jsx main app: Home, Visited, and Add Place screens
server/ Express API (not built yet)
docs/ planning documents and weekly reports


## Known issues and next steps

- No photo upload yet, the Add Place form and data model support a
  `photos` field, but there's no upload UI built
- No Place Detail screen yet, places can only be added or deleted from
  the list, there's no way to view or edit one place's full info
- No real backend or database yet, everything runs on mock data in the
  browser
- Styling still uses the template's default look, my own design system
  (colors, type scale, spacing) hasn't been applied yet

## What I would do next

- Build the Place Detail screen with a photo gallery
- Wire up the Express API and PostgreSQL database
- Apply my design system's colors, type, and spacing to the actual interface

## Author

6APSI, Holy Angel University

## Licence

MIT, see LICENSE.
