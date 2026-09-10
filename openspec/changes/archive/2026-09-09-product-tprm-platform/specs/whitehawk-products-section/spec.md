## MODIFIED Requirements

### Requirement: Products section renders below the flipbook

The WhiteHawk page SHALL render a products section below the flipbook (`WhiteHawkCaseStudy`) and
above `CaseStudyNav`. The section SHALL display exactly five product entries sourced from `PRODUCTS`
in `src/content/products.ts`. All five SHALL be named: `Cyber Risk Rating`, `Cyber Risk Portfolio`,
`Compliance Frameworks`, `Risk Assessment Platform`, and `Third Party Risk Management Platform`. No
entry SHALL remain an unnamed placeholder.

#### Scenario: Products section is present in document flow

- **WHEN** a visitor loads `/portfolio/whitehawk`
- **THEN** a grid of five product entries is visible below the flipbook content

#### Scenario: Each entry shows a name and thumbnail area

- **WHEN** the products section is rendered
- **THEN** each of the five entries shows the product name and a thumbnail area

#### Scenario: The fifth entry is a named product

- **WHEN** a visitor reads the products grid
- **THEN** the fifth entry reads `Third Party Risk Management Platform`, and `Client B` does not
  appear

### Requirement: Product entries link to individual product pages

Each product entry SHALL link to `/portfolio/whitehawk/<id>` via `TransitionLink` (or `AppLink`)
so the water-fill transition fires on navigation. The five entries' `id` values SHALL be
`cyber-risk-rating`, `cyber-risk-portfolio`, `compliance-frameworks`, `risk-assessment-platform`, and
`tprm-platform`. No entry SHALL carry the id `client-a` or `client-b`.

#### Scenario: Clicking a product entry navigates with transition

- **WHEN** a visitor clicks a product entry
- **THEN** the water-fill page transition fires and the visitor is taken to
  `/portfolio/whitehawk/<id>`

#### Scenario: Every entry reaches a real chapter

- **WHEN** a visitor clicks any of the five entries
- **THEN** a product chapter renders, not a placeholder

#### Scenario: Third Party Risk Management Platform entry targets its chapter

- **WHEN** a visitor clicks the Third Party Risk Management Platform entry
- **THEN** they are taken to `/portfolio/whitehawk/tprm-platform`

#### Scenario: Middle-click or right-click opens the URL directly

- **WHEN** a visitor middle-clicks or right-clicks a product entry
- **THEN** the browser opens `/portfolio/whitehawk/<id>` in a new tab without triggering the
  water-fill transition

### Requirement: Thumbnail placeholder is trivially swappable

A product entry with `thumbnail: null` SHALL render a styled placeholder rectangle. Setting
`thumbnail` to a non-null imported asset SHALL render that image with identical dimensions. All five
entries SHALL now use a real thumbnail: `cyber-risk-scorecard_thumbnail.png`,
`portfolio_report-thumbnail.png`, `frameworks_thumbnail.png`,
`product-risk-assessment-platform_thumbnail.png`, and `tprm_thumbnail.png`.

The `null` branch SHALL be kept even though nothing exercises it. It is the documented fallback for
the next product added before its thumbnail exists, and removing it would make `thumbnail` a
non-nullable field for no gain.

#### Scenario: Null thumbnail renders a placeholder

- **WHEN** a product's `thumbnail` field is `null`
- **THEN** the entry renders a grey/muted rectangle in place of the image

#### Scenario: Non-null thumbnail renders the image

- **WHEN** a product's `thumbnail` field is a non-null imported asset
- **THEN** the entry renders an `<img>` with `src` set to that asset

#### Scenario: All five entries show their own thumbnails

- **WHEN** a visitor loads `/portfolio/whitehawk`
- **THEN** all five entries show a distinct thumbnail image and none shows a placeholder rectangle
