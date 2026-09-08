## MODIFIED Requirements

### Requirement: Products section renders below the flipbook

The WhiteHawk page SHALL render a products section below the flipbook (`WhiteHawkCaseStudy`) and
above `CaseStudyNav`. The section SHALL display exactly five product entries sourced from `PRODUCTS`
in `src/content/products.ts`. The first four SHALL be named `Cyber Risk Rating`,
`Cyber Risk Portfolio`, `Compliance Frameworks`, and `Risk Assessment Platform`. Only the fifth
entry SHALL remain an unnamed placeholder.

#### Scenario: Products section is present in document flow

- **WHEN** a visitor loads `/portfolio/whitehawk`
- **THEN** a grid of five product entries is visible below the flipbook content

#### Scenario: Each entry shows a name and thumbnail area

- **WHEN** the products section is rendered
- **THEN** each of the five entries shows the product name and a thumbnail area (image or
  placeholder rectangle)

#### Scenario: The fourth entry is a named product

- **WHEN** a visitor reads the products grid
- **THEN** the fourth entry reads `Risk Assessment Platform`, and `Client A` does not appear

### Requirement: Product entries link to individual product pages

Each product entry SHALL link to `/portfolio/whitehawk/<id>` via `TransitionLink` (or `AppLink`)
so the water-fill transition fires on navigation. The first four entries' `id` values SHALL be
`cyber-risk-rating`, `cyber-risk-portfolio`, `compliance-frameworks`, and
`risk-assessment-platform`. No entry SHALL carry the id `client-a`.

#### Scenario: Clicking a product entry navigates with transition

- **WHEN** a visitor clicks a product entry
- **THEN** the water-fill page transition fires and the visitor is taken to
  `/portfolio/whitehawk/<id>`

#### Scenario: Cyber Risk Rating entry targets its chapter

- **WHEN** a visitor clicks the Cyber Risk Rating entry
- **THEN** they are taken to `/portfolio/whitehawk/cyber-risk-rating`

#### Scenario: Cyber Risk Portfolio entry targets its chapter

- **WHEN** a visitor clicks the Cyber Risk Portfolio entry
- **THEN** they are taken to `/portfolio/whitehawk/cyber-risk-portfolio`

#### Scenario: Compliance Frameworks entry targets its chapter

- **WHEN** a visitor clicks the Compliance Frameworks entry
- **THEN** they are taken to `/portfolio/whitehawk/compliance-frameworks`

#### Scenario: Risk Assessment Platform entry targets its chapter

- **WHEN** a visitor clicks the Risk Assessment Platform entry
- **THEN** they are taken to `/portfolio/whitehawk/risk-assessment-platform`

#### Scenario: Middle-click or right-click opens the URL directly

- **WHEN** a visitor middle-clicks or right-clicks a product entry
- **THEN** the browser opens `/portfolio/whitehawk/<id>` in a new tab without triggering the
  water-fill transition

### Requirement: Thumbnail placeholder is trivially swappable

A product entry with `thumbnail: null` SHALL render a styled placeholder rectangle. Setting
`thumbnail` to a non-null imported asset SHALL render that image with identical dimensions. The four
shipped chapters SHALL use `cyber-risk-scorecard_thumbnail.png`, `portfolio_report-thumbnail.png`,
`frameworks_thumbnail.png`, and `product-risk-assessment-platform_thumbnail.png`; the remaining
entry stays `null` until its chapter ships.

#### Scenario: Null thumbnail renders a placeholder

- **WHEN** a product's `thumbnail` field is `null`
- **THEN** the entry renders a grey/muted rectangle in place of the image

#### Scenario: Non-null thumbnail renders the image

- **WHEN** a product's `thumbnail` field is a non-null imported asset
- **THEN** the entry renders an `<img>` with `src` set to that asset

#### Scenario: Shipped chapters show their real thumbnails

- **WHEN** a visitor loads `/portfolio/whitehawk`
- **THEN** the first four entries show their own thumbnails and the fifth shows a placeholder,
  all at the same size
