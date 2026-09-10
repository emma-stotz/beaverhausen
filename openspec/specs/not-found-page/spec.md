# not-found-page Specification

## Purpose

What an unmatched URL renders. The router previously had no catch-all, so any mistyped or retired
path fell through to React Router's unstyled error screen. This capability covers route precedence,
the page's composition and voice, the single way out, and the deliberate duplication of the contact
page's landscape scene.

## Requirements

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

### Requirement: The page mirrors the contact page's composition

The not-found page SHALL use `DefaultLayout` with `Header` and render the same landscape scene behind
its content as `/contact`. It SHALL be thin: composition and copy only, with no local state.

Its content SHALL sit directly on the scene rather than on a `BaseCard`. The contact page needs a
card because it carries a form; this page carries three lines and reads better against the landscape.
The content stack SHALL be centered, both its alignment and its text.

#### Scenario: The page is recognisably part of the site

- **WHEN** the not-found page renders
- **THEN** the header and landscape scene match those on `/contact`

#### Scenario: No card behind the copy

- **WHEN** the not-found page renders
- **THEN** the heading, line, and link sit directly on the scene with no card surface behind them

#### Scenario: Content is centered

- **WHEN** the not-found page renders
- **THEN** the heading, line, and link are centered as a column, and their text is centered

#### Scenario: Heading uses the shared heading machinery

- **WHEN** the page renders its heading
- **THEN** it is emitted by `AutoH`, not a hardcoded `<h1>`

### Requirement: Colours are tuned for the scene, not a card

Without a card surface, the copy sits on the landscape in both themes and SHALL take colours chosen
against it: the heading `text-beaver-dark dark:text-cream`, the line
`text-beaver dark:text-beaver-dark`, and the link the `ghost` interactive variant so it reads as
`iron-orange` with the shared underline affordance.

#### Scenario: Copy is legible in both themes

- **WHEN** a visitor loads the page in light or dark mode
- **THEN** the heading and line render in the colours above, against the landscape rather than a card

#### Scenario: The link uses the accent affordance

- **WHEN** the link renders
- **THEN** it uses the `ghost` variant, so it is `iron-orange` with the site's underline-build
  treatment

### Requirement: Copy states the situation without apologising

The page SHALL carry the heading "Nothing built here" and the line "No structure at this address.
Either it moved, or it was never built." It SHALL NOT use an error code as its heading, an apology, or
an exclamation.

#### Scenario: Copy is present

- **WHEN** a visitor reads the page
- **THEN** the heading and the single explanatory sentence appear, in the contact page's type
  treatment

### Requirement: One way back, through the page transition

The page SHALL offer exactly one navigation affordance in its content: an `AppLink` (or
`TransitionLink`) to `/portfolio`, so leaving fires the water transition. It points at the portfolio
rather than the landing page because the header already links home, and a visitor who reached a dead
URL was most likely after the work.

#### Scenario: The link returns to the portfolio

- **WHEN** a visitor clicks the link
- **THEN** the water-fill transition fires and the portfolio page renders

#### Scenario: The header still offers full navigation

- **WHEN** the page renders
- **THEN** the site header is present with its usual links, so the visitor is not stranded if they
  ignore the in-content link

#### Scenario: No competing affordances

- **WHEN** the page renders
- **THEN** it offers no search field, suggested links, or second call to action

### Requirement: The scene is duplicated on purpose, not extracted

The page SHALL duplicate the contact page's scene markup and import
`src/components/contact/contact.css` rather than share a component with it. A comment in the page
SHALL record that this is deliberate, because the not-found design is expected to diverge from
contact.

#### Scenario: The duplication is explained where it lives

- **WHEN** a reader opens the not-found page
- **THEN** a comment explains why the scene is copied rather than shared

#### Scenario: The contact page is unchanged

- **WHEN** this change is inspected
- **THEN** `src/pages/contact/index.tsx` and `contact.css` have no modifications

### Requirement: The scene respects reduced motion

The scene's animations SHALL honour `prefers-reduced-motion: reduce`, which `contact.css` already
implements for the clouds, the swimming beaver, its frame cycling, and the water ripple.

#### Scenario: Motion is stilled when the visitor asks

- **WHEN** a visitor with `prefers-reduced-motion: reduce` loads the page
- **THEN** the clouds, beaver, and ripple render without animation
