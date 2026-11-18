## ADDED Requirements

### Requirement: Products section renders below the flipbook

The WhiteHawk page SHALL render a products section below the flipbook (`WhiteHawkCaseStudy`) and
above `CaseStudyNav`. The section SHALL display exactly five product entries sourced from `PRODUCTS`
in `src/content/case-study-whitehawk.ts`.

#### Scenario: Products section is present in document flow

- **WHEN** a visitor loads `/portfolio/whitehawk`
- **THEN** a grid of five product entries is visible below the flipbook content

#### Scenario: Each entry shows a name and thumbnail area

- **WHEN** the products section is rendered
- **THEN** each of the five entries shows the product name and a thumbnail area (image or
  placeholder rectangle)

### Requirement: Product entries link to individual product pages

Each product entry SHALL link to `/portfolio/whitehawk/<id>` via `TransitionLink` (or `AppLink`)
so the water-fill transition fires on navigation.

#### Scenario: Clicking a product entry navigates with transition

- **WHEN** a visitor clicks a product entry
- **THEN** the water-fill page transition fires and the visitor is taken to
  `/portfolio/whitehawk/<id>`

#### Scenario: Middle-click or right-click opens the URL directly

- **WHEN** a visitor middle-clicks or right-clicks a product entry
- **THEN** the browser opens `/portfolio/whitehawk/<id>` in a new tab without triggering the
  water-fill transition

### Requirement: Thumbnail placeholder is trivially swappable

A product entry with `thumbnail: null` SHALL render a styled placeholder rectangle. Setting
`thumbnail` to a non-null path SHALL render that image with identical dimensions.

#### Scenario: Null thumbnail renders a placeholder

- **WHEN** a product's `thumbnail` field is `null`
- **THEN** the entry renders a grey/muted rectangle in place of the image

#### Scenario: Non-null thumbnail renders the image

- **WHEN** a product's `thumbnail` field is a non-null path
- **THEN** the entry renders an `<img>` with `src` set to that path

### Requirement: Scroll cue is visible above the products section

A scroll cue SHALL be rendered between the flipbook and the products section. It SHALL match the
visual style of the Hero scroll cue: a `BaseT6` "scroll" label above an animated `iron-orange`
vertical line. It SHALL occupy the DOM position previously held by `CaseStudyNav`.

#### Scenario: Scroll cue is visible on page load

- **WHEN** a visitor loads `/portfolio/whitehawk`
- **THEN** a "scroll" label and animated line are visible at the bottom of the flipbook area

#### Scenario: Clicking the scroll cue scrolls to the products section

- **WHEN** a visitor clicks the scroll cue button
- **THEN** the page smooth-scrolls to the products section

### Requirement: CaseStudyNav moves below the products section

`CaseStudyNav` SHALL render after `WhiteHawkProducts` in document order, not between the flipbook
and the products section.

#### Scenario: Nav is below products

- **WHEN** a visitor loads `/portfolio/whitehawk`
- **THEN** the prev/next navigation appears below all five product entries
