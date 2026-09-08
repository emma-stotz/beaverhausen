# whitehawk-product-stub-pages Specification

## Purpose

Provides resolvable, placeholder pages for the WhiteHawk product routes whose chapters have not been
written yet, so links from the products section have a real destination.

## Requirements

### Requirement: Five stub routes exist under `/portfolio/whitehawk/`

The router SHALL have stub routes for `/portfolio/whitehawk/client-a` and
`/portfolio/whitehawk/client-b`, the two tier 2 explorations whose chapters are not yet written. Each
SHALL render a visible placeholder page. `/portfolio/whitehawk/platform`,
`/portfolio/whitehawk/engage`, and `/portfolio/whitehawk/comply` SHALL NOT exist; those products now
ship as full chapters at `/portfolio/whitehawk/cyber-risk-rating`,
`/portfolio/whitehawk/cyber-risk-portfolio`, and `/portfolio/whitehawk/compliance-frameworks`. The
retired URLs SHALL fall through to the not-found page rather than redirecting.

#### Scenario: Each remaining product route resolves

- **WHEN** a visitor navigates (via transition or directly) to either remaining stub URL
- **THEN** a page renders with at minimum the product name and a "coming soon" or placeholder
  message

#### Scenario: The platform route falls through

- **WHEN** a visitor navigates to `/portfolio/whitehawk/platform`
- **THEN** the not-found page renders

#### Scenario: The engage route falls through

- **WHEN** a visitor navigates to `/portfolio/whitehawk/engage`
- **THEN** the not-found page renders

#### Scenario: The comply route falls through

- **WHEN** a visitor navigates to `/portfolio/whitehawk/comply`
- **THEN** the not-found page renders

#### Scenario: Unknown whitehawk sub-routes fall through

- **WHEN** a visitor navigates to `/portfolio/whitehawk/unknown-slug`
- **THEN** the not-found page renders

### Requirement: Stub pages use the water-fill transition

Navigation from any stub page back to `/portfolio/whitehawk` or to other internal routes SHALL use
`TransitionLink` / `AppLink`, not a plain `<a>` or React Router `<Link>`.

#### Scenario: Back link on a stub page triggers the transition

- **WHEN** a visitor clicks a back/return link on a product stub page
- **THEN** the water-fill transition fires before the destination page renders
