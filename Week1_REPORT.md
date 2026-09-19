Weekly Increment Report
Week of: September 14–20, 2026

## What changed this week

- Cloned the class final-project-template repository and set it up locally
- Made the repository public and enabled GitHub Pages via GitHub Actions
- Verified the app runs locally in demo mode and deployed it live for the first time
- Replaced the template's demo "sightings" app with my actual Yumzys app:
  - Rewrote `seed.json` with 4 real starter places (LALA Garden, Grill Seoul, John's Kitchen, Cafe Dia)
  - Rewrote `mockApi.js`, `httpApi.js`, and `index.js` to use `places` instead of `sightings` (listPlaces, getPlace, createPlace, updatePlace, deletePlace)
  - Rebuilt `App.jsx` into Yumzys's actual screens: Home (with All / Want to Try / Visited filters), Visited, and Add Place, all using local state and the mock API
- Set up `project/README.md` in my workspace linking my repository and live site
- Filled in Overview, Setup, and How to Run sections of the plan

## Why

The template ships with a working demo app so the repository has a live link from day one, but it isn't my project. This week's goal was to replace that demo entirely with Yumzys's real screens and data, while keeping the API shape the template expects, so switching to a real backend later is a small change instead of a rewrite.

## What broke or what I got stuck on

- Git initially failed to push because it didn't recognize my identity, fixed by setting `user.name` and `user.email`
- The first GitHub Actions deploy failed because GitHub Pages hadn't been switched to "GitHub Actions" as the source yet, once that was set and the workflow was re-run manually, it deployed successfully
- After rewriting `App.jsx`, the app showed a blank white screen, caused by one leftover import line still referencing the old `Sighting` function names instead of `Place`. Found it by checking the browser console for the exact error and fixing the import.

## What is left

- Add Place screen still needs a photo upload field (not wired up yet)
- Place Detail screen (viewing/editing one place, with its photo gallery) isn't built yet, currently places can only be added or deleted from the list
- Styling still uses the template's default look, my actual design system (colors, spacing, components) hasn't been applied yet
- No real backend yet, everything still runs on mock data in localStorage
