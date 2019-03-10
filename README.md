# news

A Little News App, server-side rendered with React and Redux.
Styling with sass.

To run: `yarn`, then `APIKEY='2cd86ec8b59b4e7d8b2b14ea90a075e6' yarn start`.

Future improvements:

UX:

- Animate loading cards while fetching stories from the API
- Friendly message if fetching fails
- Ability to add and remove categories/sources/countries
- Filter out non-news sources (ie deviantart is here for some reason?)
- Ensure legacy browser support

Stability:

- type scripting
- test coverage for all components
- jest snapshots

General Future Stuff:

- Do a proper renderToString with cached API response so that articles don't refetch on refresh
- Improve caching & throttling (atm it basically doesn't work)
- Organize stylesheets in their component folders
