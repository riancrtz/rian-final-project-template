# Weekly Increment Report

Week of: September 14–20, 2026

## What changed this week

- Cloned the class final-project-template repository and set it up on my computer.
- Made the repository public and enabled GitHub Pages through GitHub Actions.
- Checked that the app works locally in demo mode and deployed it live for the first time.
- Replaced the template's demo "sightings" app with my actual Yumzys app:
  - Rewrote `seed.json` with 4 starter places: LALA Garden, Grill Seoul, John's Kitchen, and Cafe Dia.
  - Rewrote `mockApi.js`, `httpApi.js`, and `index.js` to use places instead of sightings, including `listPlaces`, `getPlace`, `createPlace`, `updatePlace`, and `deletePlace`.
  - Rebuilt `App.jsx` into Yumzys's actual screens: Home with All / Want to Try / Visited filters, Visited, and Add Place. These currently use local state and the mock API.
- Set up `project/README.md` in my workspace with links to my repository and live site.
- Filled in the Overview, Setup, and How to Run sections of the plan.

## Why

The template already has a working demo app so the repository has a live link from the start, but it is not my actual project. My goal this week was to replace the demo with Yumzys's actual screens and data while still keeping the API structure that the template expects. This should make it easier to switch to a real backend later without having to rewrite the whole app.

## What broke or what I got stuck on

- Git initially failed to push because it did not recognize my identity. I fixed this by setting my `user.name` and `user.email`.
- The first GitHub Actions deployment failed because GitHub Pages was not set to use "GitHub Actions" as the source. After changing the setting and running the workflow again, it deployed successfully.
- After rewriting `App.jsx`, the app showed a blank white screen. The problem was one leftover import that was still referencing the old Sighting function names instead of Place. I found the exact error through the browser console and fixed the import.

## What is left

- The Add Place screen still needs a photo upload field, which is not connected yet.
- The Place Detail screen still needs to be built. This will be used for viewing and editing one place and showing its photo gallery. Right now, places can only be added or deleted from the list.
- The styling still uses the template's default look. I have not applied my actual design system, including the colors, spacing, and components, yet.
- There is no real backend yet. Everything still uses mock data stored in localStorage.
