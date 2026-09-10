## MODIFIED Requirements

### Requirement: Any unmatched URL renders the not-found page

The router SHALL define a `path: '*'` route rendering `NotFoundPage`. It SHALL be declared last, so
every named route still wins. No unmatched URL SHALL reach React Router's built-in error screen.

This is now the only place the retired product URLs are specified. Five slugs have been retired as
their chapters shipped: `platform`, `engage`, `comply`, `client-a`, and `client-b`. None SHALL be
routed and none SHALL redirect to its replacement. A visitor who follows an old link gets the
not-found page and the site's one way back, rather than being silently rerouted to a page whose name
they did not ask for.

#### Scenario: A mistyped path renders the page

- **WHEN** a visitor navigates to a URL matching no route, such as `/portfolio/typo`
- **THEN** the not-found page renders in the site's own design

#### Scenario: A retired product URL renders the page

- **WHEN** a visitor navigates to `/portfolio/whitehawk/platform`, `/engage`, `/comply`, `/client-a`,
  or `/client-b`
- **THEN** the not-found page renders rather than a redirect or an error screen

#### Scenario: Retired slugs are absent from the router

- **WHEN** `src/App.tsx` is inspected
- **THEN** no route is declared for any of the five retired slugs

#### Scenario: Named routes still win

- **WHEN** a visitor navigates to any route the app defines
- **THEN** that route's page renders, not the not-found page

#### Scenario: Deep links survive the GitHub Pages redirect

- **WHEN** a visitor loads an unmatched URL directly, so `public/404.html` redirects into the app
- **THEN** the not-found page renders once the app boots
