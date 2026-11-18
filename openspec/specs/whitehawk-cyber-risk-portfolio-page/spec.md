# whitehawk-cyber-risk-portfolio-page Specification

## Purpose

The second WhiteHawk product chapter: a tier 1 case study of the Cyber Risk Portfolio product,
covering how one report reduces an arbitrary number of suppliers into the few places a company's
risk actually concentrates, and how it reuses the Cyber Risk Rating component library unchanged.
Replaces the former engage stub page.

## Requirements

### Requirement: The chapter resolves at its own route

`/portfolio/whitehawk/cyber-risk-portfolio` SHALL render the Cyber Risk Portfolio tier 1 chapter. The
page component SHALL live at `src/pages/portfolio/whitehawk/cyber-risk-portfolio/index.tsx` and SHALL
be thin: it composes `CaseStudyLayout` and `ProductChapter` and holds no logic.

#### Scenario: Route resolves

- **WHEN** a visitor navigates to `/portfolio/whitehawk/cyber-risk-portfolio`
- **THEN** the Cyber Risk Portfolio chapter renders, not a "coming soon" placeholder

#### Scenario: Reached from the products grid

- **WHEN** a visitor clicks the Cyber Risk Portfolio entry in the WhiteHawk products section
- **THEN** the water-fill transition fires and the chapter page renders

### Requirement: Chapter copy lives in a typed content module

`src/content/product-cyber-risk-portfolio.ts` SHALL export `CYBER_RISK_PORTFOLIO` as a
`ProductChapter` rather than commented draft text. It SHALL carry the title "Cyber Risk Portfolio",
the subtitle "Where Risk Concentrates", the three masthead entries, three blocks (Field Guide,
Divergence, Later Observations), and the closing field note.

#### Scenario: Content module has no commented-out copy

- **WHEN** the content module is inspected
- **THEN** the chapter text is in exported constants, not in `//` comments

#### Scenario: Title and subtitle are separate fields

- **WHEN** the chapter renders its heading area
- **THEN** "Cyber Risk Portfolio" renders as the title and "Where Risk Concentrates" as the subtitle

#### Scenario: Field note closes the chapter

- **WHEN** a visitor scrolls to the end of the chapter
- **THEN** the field note about the component library renders last

### Requirement: Five visual moments appear, mapped to their blocks

The chapter SHALL render five artifact slots across six image files, using the assets under
`src/assets/portfolio/case-studies/whitehawk/products/cyber-risk-portfolio/`:

| #   | Block              | Kind   | File(s)                                                                         |
| --- | ------------------ | ------ | ------------------------------------------------------------------------------- |
| 1   | Masthead hero      | single | `portfolio_report-exec_overview.png`                                            |
| 2   | Field Guide        | pair   | `cyber_risk_rating-component_lib.png` then `portfolio_report-component_lib.png` |
| 3   | Field Guide        | single | `portfolio_report-compliance_overview.png`                                      |
| 4   | Divergence         | single | `admin_portfolio-report_supplier-select-visible.png`                            |
| 5   | Later Observations | single | `portfolio_report-fin_impact_overview.png`                                      |

#### Scenario: Every artifact is present

- **WHEN** a visitor loads the chapter
- **THEN** six images render across the five moments, in the blocks listed above

#### Scenario: Each artifact sits below the prose it illustrates

- **WHEN** a block artifact renders
- **THEN** the paragraph immediately above it describes that artifact

### Requirement: The component library pair leads with the Cyber Risk Rating

Moment 2 SHALL be a `pair` whose first artifact is the Cyber Risk Rating gauge and whose second is
the portfolio gauge. It SHALL render side by side at `md` and wider, so the two data models can be
compared directly, and stack below `md` with the Cyber Risk Rating on top.

#### Scenario: Rating leads on desktop

- **WHEN** moment 2 renders at `md` or wider
- **THEN** the Cyber Risk Rating gauge sits left of the portfolio gauge

#### Scenario: Rating leads when stacked

- **WHEN** moment 2 renders below `md`
- **THEN** the Cyber Risk Rating gauge sits above the portfolio gauge, sharing one caption

### Requirement: Every artifact carries a caption and alt text

Each of the five moments SHALL render the caption drafted for it and SHALL carry non-empty alt text
on every image. No caption SHALL be an empty string. The pair SHALL carry one caption for both
halves.

#### Scenario: Captions are present

- **WHEN** a visitor reads the chapter
- **THEN** each of the five moments has a visible, non-empty caption beneath it

### Requirement: The chapter states its outcome numbers

The Later Observations block SHALL state the shipped numbers: 95 portfolio reports generated since
February 2024, standing in for 1,429 individual Cyber Risk Rating reports.

#### Scenario: Numbers are visible

- **WHEN** a visitor reads Later Observations
- **THEN** the report volume figures appear in the copy

### Requirement: The chapter needs no new shared components

The chapter SHALL be buildable from the existing `product-chapter` component set and schema. No new
component, prop, or schema field SHALL be added to support it, and no type in
`src/content/products.ts` SHALL change beyond the `PRODUCTS` entry. A styling change applied to the
frame for all chapters is not an exception to this: it is covered by a `product-chapter` delta rather
than driven by this chapter's needs.

#### Scenario: No new components or schema fields

- **WHEN** the diff for this change is inspected
- **THEN** it adds no component, prop, or field to the shared chapter set, and changes no type in the
  chapter schema

#### Scenario: Shared styling changes are specified separately

- **WHEN** a shared component's appearance changes alongside this chapter
- **THEN** that change is recorded as a `product-chapter` delta, not as a requirement of this page
