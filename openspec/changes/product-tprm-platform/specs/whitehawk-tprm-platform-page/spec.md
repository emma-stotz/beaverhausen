## ADDED Requirements

### Requirement: The chapter resolves at its own route

`/portfolio/whitehawk/tprm-platform` SHALL render the Third Party Risk Management Platform tier 2
chapter. The page component SHALL live at `src/pages/portfolio/whitehawk/tprm-platform/index.tsx` and
SHALL be thin: it composes `CaseStudyLayout` and `ProductChapter` and holds no logic.

#### Scenario: Route resolves

- **WHEN** a visitor navigates to `/portfolio/whitehawk/tprm-platform`
- **THEN** the Third Party Risk Management Platform chapter renders, not a "coming soon" placeholder

#### Scenario: Reached from the products grid

- **WHEN** a visitor clicks the Third Party Risk Management Platform entry in the products section
- **THEN** the water-fill transition fires and the chapter page renders

#### Scenario: Back link fires the water transition

- **WHEN** a visitor clicks the back link at the end of the chapter
- **THEN** the water-fill transition fires and `/portfolio/whitehawk` renders

### Requirement: The last stub becomes the last chapter

This chapter SHALL replace the `client-b` stub, which SHALL be deleted. With it gone, all five
`PRODUCTS` entries SHALL resolve to real chapters and no product route SHALL render a placeholder.

#### Scenario: No placeholder product route remains

- **WHEN** a visitor visits each of the five product URLs in `PRODUCTS`
- **THEN** each renders a chapter, and none renders "coming soon"

#### Scenario: The retired stub URL falls through

- **WHEN** a visitor navigates to `/portfolio/whitehawk/client-b`
- **THEN** the not-found page renders, with no redirect to the new chapter

### Requirement: It is a tier 2 chapter with three blocks

The chapter SHALL omit `masthead`. It SHALL render exactly three blocks, in this order:

| #   | Heading            | Carries                                                                            |
| --- | ------------------ | ---------------------------------------------------------------------------------- |
| 1   | Specimen           | The client by domain, the vendor population, the identity problem, plus artifact 1 |
| 2   | Field Guide        | The inquiry lifecycle, the daily risk record, the chart, plus artifact 2           |
| 3   | Later Observations | What shipped, why it ended, and the feature that was next                          |

No Working Hypothesis, Provenance, or Divergence block SHALL appear. Provenance stays in Risk
Assessment Platform: leadership proof belongs to one chapter, and the ownership sentence this chapter
needs sits inside its Field Guide instead.

#### Scenario: No masthead renders

- **WHEN** a visitor loads the chapter
- **THEN** the first heading below the title is the Specimen block heading, with no hero above it

#### Scenario: Block order is as listed

- **WHEN** a visitor loads the chapter
- **THEN** the headings Specimen, Field Guide, and Later Observations appear in that order

#### Scenario: No Provenance block appears

- **WHEN** the chapter renders
- **THEN** no Provenance heading appears, and the leadership chapter is still Risk Assessment Platform

### Requirement: Chapter copy lives in a typed content module

`src/content/product-tprm-platform.ts` SHALL export `TPRM_PLATFORM` as a `ProductChapter` rather than
commented draft text. It SHALL carry the title "Third Party Risk Management Platform", the subtitle
"History Depends on Identity", the three blocks, and the closing field note about identity being the
interesting work.

The artifact plan table and the drafted captions currently in that file's comments SHALL move into
the exported data and SHALL not remain as comments.

#### Scenario: Content module has no commented-out copy

- **WHEN** the content module is inspected
- **THEN** the chapter text, captions, and artifact plan are in exported constants, not in `//`
  comments

#### Scenario: Title and subtitle are split

- **WHEN** the chapter renders its heading area
- **THEN** the title reads "Third Party Risk Management Platform" and the subtitle reads "History
  Depends on Identity"

#### Scenario: Field note closes the chapter

- **WHEN** a visitor scrolls to the end of the chapter
- **THEN** the field note about ten thousand records sounding like a scale problem renders last

### Requirement: Two artifacts, one of them a toggle

The chapter SHALL render two artifact slots from the assets under
`src/assets/portfolio/case-studies/whitehawk/products/tprm-platform/`:

| #   | Block       | Kind   | File(s)                                 | Shows                                                                                                                                 |
| --- | ----------- | ------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Specimen    | single | `tprm_1.png`                            | Third Party Onboarding Status: 10,671 inquiries, six status counts with DUPLICATE at 1,037, inherent risk tiers, and the vendor table |
| 2   | Field Guide | toggle | `tprm_2_rest.png`, `tprm_2_hovered.png` | Performance Over Time: ten series over twelve months at rest, then Overall Grade isolated with its month-by-month values              |

Artifact 1 SHALL sit inside the Specimen block after its prose. Artifact 2 SHALL be the `toggle`
slot, with `tprm_2_rest.png` as `rest` and `tprm_2_hovered.png` as `active`, inside the Field Guide
block. Later Observations SHALL carry no artifact.

The artifact plan in the draft names the second file `tprm_2_hover.png`. The file in the repo is
`tprm_2_hovered.png`, and that is the name to use.

Both artifacts SHALL be imported as modules through the `@/` alias, not referenced by string path.

#### Scenario: Both artifacts are present

- **WHEN** a visitor loads the chapter
- **THEN** one `single` artifact renders in Specimen and one `toggle` renders in Field Guide

#### Scenario: The toggle carries the two chart states

- **WHEN** a visitor toggles artifact 2
- **THEN** the resting chart is replaced in place by the same chart with Overall Grade isolated

#### Scenario: Later Observations is prose only

- **WHEN** the Later Observations block renders
- **THEN** it contains paragraphs and no figure elements

### Requirement: The toggle's label says what it does

The `toggle` slot's `label` SHALL describe the action, not either image, so a screen reader user
learns what pressing the button changes. It SHALL name the series that gets isolated, since that is
the argument the caption makes.

#### Scenario: Label names the action

- **WHEN** a screen reader user focuses artifact 2
- **THEN** the announced name says that pressing isolates the Overall Grade series, rather than
  describing the chart's appearance

### Requirement: Both artifacts are legible at published size

Artifact 1 is 1420 by 933; the two chart states are each 1063 by 393. Both slots SHALL use the `xl`
width so the small type in the status counts, the vendor table, and the chart legend stays readable,
and neither SHALL introduce horizontal page scrolling at any viewport width.

The chart renders slightly above its native width at `xl`. That is accepted: upscaling a chart costs
a little sharpness, where downscaling would cost legend legibility, and the legend is what the block
is about.

#### Scenario: Artifacts exceed the text column

- **WHEN** the chapter renders at a viewport wide enough for the full chapter column
- **THEN** both artifacts render wider than the surrounding paragraphs

#### Scenario: Small type is readable

- **WHEN** a visitor views the chapter on a desktop viewport
- **THEN** the six status counts in artifact 1 and the ten legend labels in artifact 2 are legible
  without zooming

#### Scenario: No horizontal page scroll

- **WHEN** the chapter renders at any viewport width from 320px up
- **THEN** the page does not scroll horizontally

### Requirement: Every artifact carries a caption and alt text

Artifact 1 and the toggle SHALL each render the caption drafted for them. The toggle SHALL carry
non-empty `alt` on both of its layers, describing the resting chart and the isolated series
respectively. No caption SHALL be an empty string.

#### Scenario: Captions are present

- **WHEN** a visitor reads the chapter
- **THEN** each artifact has a visible, non-empty caption beneath it

#### Scenario: Caption 1 names the duplicate count

- **WHEN** artifact 1 renders
- **THEN** its caption says 10,671 requests to monitor a vendor, 1,037 of them a vendor already being
  monitored

#### Scenario: Caption 2 describes the state change

- **WHEN** artifact 2 renders
- **THEN** its caption says ten series at fifteen percent, and one name in the legend brings one line
  forward

### Requirement: The client is not named, in copy or in alt text

The chapter SHALL describe the client as a global technology company and the ratings vendor as a
security ratings provider, naming neither. No client name, logo, or identifying surface SHALL appear
in the copy, the captions, the `alt` text, or the toggle's `label`. The vendor names visible in
artifact 1 SHALL be the anonymized placeholders already in the asset.

#### Scenario: No client identity in the rendered page

- **WHEN** the chapter's copy, captions, alt text, and label are inspected
- **THEN** the client is referred to only by domain and scale, and the ratings provider is unnamed

#### Scenario: Alt text describes the interface, not the client

- **WHEN** artifact `alt` text is inspected
- **THEN** it names interface elements, counts, and states, and no client or product brand

### Requirement: The chapter states its outcome plainly

Later Observations SHALL say that the API was delivered and used in production while the frontend
stayed an internal analyst tool, that the engagement ended when the client dissolved its third-party
risk management team a year in, and that the internal frontend was never instrumented so there are no
adoption numbers. It SHALL name the audit surface as the feature that was next.

The absent metric SHALL be stated as absent rather than replaced with a softer number.

#### Scenario: The unmeasured outcome is not dressed up

- **WHEN** a visitor reads Later Observations
- **THEN** the copy says the frontend was not instrumented and there are no usage numbers to report

#### Scenario: The ending is one clause

- **WHEN** a visitor reads Later Observations
- **THEN** the engagement's end is stated once, with no elaboration or defense

#### Scenario: The next feature is named

- **WHEN** a visitor reads Later Observations
- **THEN** the audit surface is named as what would be built next
