## ADDED Requirements

### Requirement: Five stub routes exist under `/portfolio/whitehawk/`

The router SHALL have routes for `/portfolio/whitehawk/platform`, `/portfolio/whitehawk/engage`,
`/portfolio/whitehawk/comply`, `/portfolio/whitehawk/client-a`, and
`/portfolio/whitehawk/client-b`. Each SHALL render a visible placeholder page and SHALL NOT return
a 404.

#### Scenario: Each product route resolves

- **WHEN** a visitor navigates (via transition or directly) to any of the five product URLs
- **THEN** a page renders with at minimum the product name and a "coming soon" or placeholder
  message

#### Scenario: Unknown whitehawk sub-routes still 404

- **WHEN** a visitor navigates to `/portfolio/whitehawk/unknown-slug`
- **THEN** the app renders its standard not-found state (no route matches)

### Requirement: Stub pages use the water-fill transition

Navigation from any stub page back to `/portfolio/whitehawk` or to other internal routes SHALL use
`TransitionLink` / `AppLink`, not a plain `<a>` or React Router `<Link>`.

#### Scenario: Back link on a stub page triggers the transition

- **WHEN** a visitor clicks a back/return link on a product stub page
- **THEN** the water-fill transition fires before the destination page renders
