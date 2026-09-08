## ADDED Requirements

### Requirement: The chapter resolves at its own route

`/portfolio/whitehawk/cyber-risk-rating` SHALL render the Cyber Risk Rating tier 1 chapter. The page
component SHALL live at `src/pages/portfolio/whitehawk/cyber-risk-rating/index.tsx` and SHALL be
thin: it composes `CaseStudyLayout` and `ProductChapter` and holds no logic.

#### Scenario: Route resolves

- **WHEN** a visitor navigates to `/portfolio/whitehawk/cyber-risk-rating`
- **THEN** the Cyber Risk Rating chapter renders, not a "coming soon" placeholder

#### Scenario: Reached from the products grid

- **WHEN** a visitor clicks the Cyber Risk Rating entry in the WhiteHawk products section
- **THEN** the water-fill transition fires and the chapter page renders

### Requirement: Chapter copy lives in a typed content module

`src/content/product-cyber-risk-rating.ts` SHALL export `CYBER_RISK_RATING` as a `ProductChapter`
rather than commented draft text. It SHALL carry the title "Cyber Risk Rating", the subtitle "One
Model, Two Views", the three masthead entries, three blocks (Field Guide, Divergence, Later
Observations), and the closing field note.

#### Scenario: Content module has no commented-out copy

- **WHEN** the content module is inspected
- **THEN** the chapter text is in exported constants, not in `//` comments

#### Scenario: Field note closes the chapter

- **WHEN** a visitor scrolls to the end of the chapter
- **THEN** the field note about the sort-order argument renders last

### Requirement: Seven artifacts appear, mapped to their blocks

The chapter SHALL render seven artifacts, each a `single` slot at `lg` width, using the files under
`src/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/`:

| #   | Block              | File                                                 |
| --- | ------------------ | ---------------------------------------------------- |
| 1   | Masthead hero      | `cyber-risk-scorecard_hero.png`                      |
| 2   | Field Guide        | `report-state-model.svg`                             |
| 3   | Field Guide        | `admin_cyber-risk-scorecard_analyst-grid.png`        |
| 4   | Field Guide        | `admin_cyber-risk-scorecard_risk-vectors.png`        |
| 5   | Field Guide        | `cyber-risk-scorecard_risk-vector-analysis.png`      |
| 6   | Divergence         | `cyber-risk-scorecard_compliance-grid-collapsed.png` |
| 7   | Later Observations | `cyber-risk-scorecard_info-icon.png`                 |

#### Scenario: Every artifact is present

- **WHEN** a visitor loads the chapter
- **THEN** seven images render, in the blocks listed above

#### Scenario: Each artifact sits below the sentence it illustrates

- **WHEN** a Field Guide artifact renders
- **THEN** the paragraph immediately above it describes that artifact

### Requirement: Every artifact carries a caption and alt text

Each of the seven artifacts SHALL render a caption and non-empty alt text. No caption SHALL be an
empty string.

#### Scenario: Captions are present

- **WHEN** a visitor reads the chapter
- **THEN** each of the seven artifacts has a visible, non-empty caption beneath it

### Requirement: The chapter states its outcome numbers

The Later Observations block SHALL state the shipped numbers: 73 customers over four years, 64,589
supplier reports generated, 64,285 delivered.

#### Scenario: Numbers are visible

- **WHEN** a visitor reads Later Observations
- **THEN** the report volume figures appear in the copy

### Requirement: The vector count is stated as nineteen

Copy, captions, and alt text SHALL refer to nineteen source risk vectors distilled into seven
client-facing groupings. No text SHALL claim twenty vectors.

#### Scenario: No stale vector count

- **WHEN** the chapter's copy, captions, and alt text are inspected
- **THEN** they say nineteen, and "twenty" does not appear
