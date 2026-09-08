# whitehawk-product-stub-pages Specification

## Purpose

Provides resolvable, placeholder pages for the WhiteHawk product routes whose chapters have not been
written yet, so links from the products section have a real destination.

## Requirements

### Requirement: Five stub routes exist under `/portfolio/whitehawk/`

The router SHALL have a stub route for `/portfolio/whitehawk/client-b`, the one remaining tier 2
exploration whose chapter is not yet written. It SHALL render a visible placeholder page.

`/portfolio/whitehawk/platform`, `/portfolio/whitehawk/engage`, `/portfolio/whitehawk/comply`, and
`/portfolio/whitehawk/client-a` SHALL NOT exist; those products now ship as full chapters at
`/portfolio/whitehawk/cyber-risk-rating`, `/portfolio/whitehawk/cyber-risk-portfolio`,
`/portfolio/whitehawk/compliance-frameworks`, and `/portfolio/whitehawk/risk-assessment-platform`.
The retired URLs SHALL fall through to the not-found page rather than redirecting.

`src/pages/portfolio/whitehawk/client-a/index.tsx` SHALL be deleted rather than left unrouted.

#### Scenario: The remaining product route resolves

- **WHEN** a visitor navigates (via transition or directly) to `/portfolio/whitehawk/client-b`
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

#### Scenario: The client-a route falls through

- **WHEN** a visitor navigates to `/portfolio/whitehawk/client-a`
- **THEN** the not-found page renders, with no redirect to the new chapter

#### Scenario: Unknown whitehawk sub-routes fall through

- **WHEN** a visitor navigates to `/portfolio/whitehawk/unknown-slug`
- **THEN** the not-found page renders

#### Scenario: The retired stub component is gone

- **WHEN** `src/pages/portfolio/whitehawk/` is inspected
- **THEN** no `client-a` directory remains

### Requirement: Stub pages use the water-fill transition

Navigation from the remaining stub page to any internal route SHALL use `TransitionLink` or
`AppLink`, not a plain `<a>` and not React Router's `<Link>`.

#### Scenario: Back link on a stub page triggers the transition

- **WHEN** a visitor clicks a back/return link on a product stub page
- **THEN** the water-fill transition fires before the destination page renders
