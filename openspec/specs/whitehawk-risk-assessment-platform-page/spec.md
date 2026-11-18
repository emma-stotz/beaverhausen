# whitehawk-risk-assessment-platform-page Specification

## Purpose

The first tier 2 WhiteHawk product chapter: a case study of the 42-question risk assessment built
for an unnamed Australian consultancy, covering how section grouping beat one question per screen
and what survived an engagement that ended before the product reached a customer. Replaces the
former client-a stub page. It is also the chapter that carries the portfolio's leadership proof,
which is why it keeps a Provenance block that the rest of tier 2 drops.

## Requirements

### Requirement: The chapter resolves at its own route

`/portfolio/whitehawk/risk-assessment-platform` SHALL render the Risk Assessment Platform tier 2
chapter. The page component SHALL live at
`src/pages/portfolio/whitehawk/risk-assessment-platform/index.tsx` and SHALL be thin: it composes
`CaseStudyLayout` and `ProductChapter` and holds no logic.

#### Scenario: Route resolves

- **WHEN** a visitor navigates to `/portfolio/whitehawk/risk-assessment-platform`
- **THEN** the Risk Assessment Platform chapter renders, not a "coming soon" placeholder

#### Scenario: Reached from the products grid

- **WHEN** a visitor clicks the Risk Assessment Platform entry in the WhiteHawk products section
- **THEN** the water-fill transition fires and the chapter page renders

#### Scenario: Back link fires the water transition

- **WHEN** a visitor clicks the back link at the end of the chapter
- **THEN** the water-fill transition fires and `/portfolio/whitehawk` renders

### Requirement: This is the first tier 2 chapter

The chapter SHALL omit `masthead`. It SHALL have no hero container and no labelled Specimen /
Working Hypothesis / Provenance triple above its blocks. Its four sections SHALL be ordinary blocks,
so Specimen and Provenance render at the block heading scale rather than the masthead scale.

#### Scenario: No masthead renders

- **WHEN** a visitor loads the chapter
- **THEN** the first heading below the title is the Specimen block heading, with no hero artifact
  above it

#### Scenario: Specimen is a block, not a masthead entry

- **WHEN** the Specimen section renders
- **THEN** its heading uses the same scale as the Field Guide and Later Observations headings

### Requirement: Chapter copy lives in a typed content module

`src/content/product-risk-assessment-platform.ts` SHALL export `RISK_ASSESSMENT_PLATFORM` as a
`ProductChapter` rather than commented draft text. It SHALL carry the title "Risk Assessment
Platform", the subtitle "The Shape of Progress", four blocks in the order Specimen, Provenance,
Field Guide, Later Observations, and the closing field note about five to seven having been the right
number.

The artifact plan table and the drafted captions currently in that file's comments SHALL move into
the exported data as `ArtifactSlot` entries and their `caption` fields, and SHALL not remain as
comments.

#### Scenario: Content module has no commented-out copy

- **WHEN** the content module is inspected
- **THEN** the chapter text, captions, and artifact plan are in exported constants, not in `//`
  comments

#### Scenario: Title and subtitle are split

- **WHEN** the chapter renders its heading area
- **THEN** the title reads "Risk Assessment Platform" and the subtitle reads "The Shape of Progress"

#### Scenario: Field note closes the chapter

- **WHEN** a visitor scrolls to the end of the chapter
- **THEN** the field note about four and a half months being the most annoying way to be wrong
  renders last

### Requirement: Four blocks in a fixed order

The chapter SHALL render exactly four blocks, in this order:

| #   | Heading            | Carries                                                               |
| --- | ------------------ | --------------------------------------------------------------------- |
| 1   | Specimen           | The product, the client by domain, what made it hard, plus artifact 1 |
| 2   | Provenance         | The delivery estimate and the leadership proof                        |
| 3   | Field Guide        | Section grouping over one question per screen, plus artifact 2        |
| 4   | Later Observations | What survived, and the honest revision note                           |

No Working Hypothesis or Divergence block SHALL appear. Provenance appears as a block because this is
the chapter that carries the leadership proof, which is the one case the tier 2 template allows it.

#### Scenario: Block order is as listed

- **WHEN** a visitor loads the chapter
- **THEN** the headings Specimen, Provenance, Field Guide, and Later Observations appear in that order

#### Scenario: The dropped tier 1 blocks are absent

- **WHEN** the chapter renders
- **THEN** no Working Hypothesis and no Divergence heading appears

### Requirement: Two artifacts, mapped to their blocks

The chapter SHALL render two `single` artifact slots from the assets under
`src/assets/portfolio/case-studies/whitehawk/products/risk-assessment-platform/`:

| #   | Block       | File                                     | Shows                                                                                                                       |
| --- | ----------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 1   | Specimen    | `product-risk-assessment-platform_1.png` | The Technology (TC) section in one frame: stepper, weight badge, 6/7 answered, seven questions, two contributors, TC.7 open |
| 2   | Field Guide | `product-risk-assessment-platform_2.png` | The dashboard: questions answered, sections complete, five per-section progress bars                                        |

Artifact 1 SHALL sit inside the Specimen block after its prose. Artifact 2 SHALL sit inside the
Field Guide block. Provenance and Later Observations SHALL carry no artifact.

Both artifacts SHALL be imported as modules through the `@/` alias, not referenced by string path.

#### Scenario: Both artifacts are present

- **WHEN** a visitor loads the chapter
- **THEN** two images render, one in Specimen and one in Field Guide

#### Scenario: The sentence sits above its artifact

- **WHEN** the Specimen block renders
- **THEN** its paragraph renders above artifact 1, not below it

#### Scenario: Two blocks are prose only

- **WHEN** the Provenance or Later Observations block renders
- **THEN** it contains paragraphs and no figure elements

### Requirement: Both artifacts are legible at published size

Each artifact SHALL be sized so its on-screen text is readable rather than defaulting to the
narrowest width. Artifact 1 is a full section view 1318px wide and 2228px tall; artifact 2 is a
dashboard card 1318px wide and 347px tall. Both SHALL use the `xl` width so they render close to
native scale in the chapter column, and neither SHALL introduce horizontal page scrolling at any
viewport width.

Artifact 1's height is accepted rather than cropped: it is the whole section in one frame, which is
the point the Field Guide argues.

#### Scenario: Artifacts exceed the text column

- **WHEN** the chapter renders at a viewport wide enough for the full chapter column
- **THEN** both artifacts render wider than the surrounding paragraphs

#### Scenario: Question text is readable

- **WHEN** a visitor views artifact 1 on a desktop viewport
- **THEN** the question text and the "Last answered by" lines are legible without zooming

#### Scenario: No horizontal page scroll

- **WHEN** the chapter renders at any viewport width from 320px up
- **THEN** the page does not scroll horizontally

### Requirement: Every artifact carries a caption and alt text

Both artifacts SHALL render the caption drafted for them and SHALL carry non-empty `alt` text. No
caption SHALL be an empty string.

#### Scenario: Captions are present

- **WHEN** a visitor reads the chapter
- **THEN** each artifact has a visible, non-empty caption beneath it

#### Scenario: Caption 1 names the handoff

- **WHEN** artifact 1 renders
- **THEN** its caption says every answer records who gave it, so a section can change hands without
  being finished

#### Scenario: Caption 2 names the fixed denominator

- **WHEN** artifact 2 renders
- **THEN** its caption says progress here is a count, not an estimate

### Requirement: The client is not named, in copy or in alt text

The chapter SHALL describe the client by domain only, as an Australian consultancy. No client name,
logo, or identifying product surface SHALL appear in the copy, the captions, or the `alt` text. The
two artifacts SHALL be the anonymized views already in the repo, which carry no client marks and use
placeholder contributor names.

#### Scenario: No client identity in the rendered page

- **WHEN** the chapter's copy, captions, and alt text are inspected
- **THEN** the client is referred to only by domain and geography

#### Scenario: Alt text describes the interface, not the client

- **WHEN** artifact `alt` text is inspected
- **THEN** it names the interface elements and states, and no client or product brand

### Requirement: The engagement's end is one neutral clause

Later Observations SHALL state that the engagement ended following a leadership change, in one
clause, with no elaboration, no attribution, and no defense. The chapter SHALL make no survivor
claim about the product itself: what survived is the frontend architecture, not the product.

#### Scenario: One clause, then move on

- **WHEN** a visitor reads Later Observations
- **THEN** the leadership change is stated once and the paragraph continues to what survived

#### Scenario: The unshipped outcome is stated plainly

- **WHEN** a visitor reads Later Observations
- **THEN** the copy says the product never reached a real customer

### Requirement: Provenance carries the leadership numbers

The Provenance block SHALL state the concrete leadership proof: a delivery estimate for a
four-person team across three repositories, three scopes with confidence bands (full at eight to
eleven months, reduced at five to seven, lean at three to five), the reduced scope chosen, 164 tasks
across sprints and epics with named owners, a weekly client demo, and delivery of the reduced scope
in four and a half months.

#### Scenario: The numbers are visible

- **WHEN** a visitor reads Provenance
- **THEN** the three scope ranges, the task count, and the four and a half month delivery appear in
  the copy

#### Scenario: The estimate is framed as a tradeoff conversation

- **WHEN** a visitor reads Provenance
- **THEN** the copy says writing the options down made it a conversation about what to give up rather
  than a negotiation over a date

### Requirement: The template records that this is the leadership chapter

`src/content/products-template.md` SHALL be amended to describe tier 2 as it actually is. Its tier 2
description SHALL no longer say tier 2 uses exactly three blocks: it SHALL state that a tier 2
chapter MAY carry a Provenance block when it holds the leadership proof, that the block sits second
between Specimen and Field Guide, and that the word budget widens accordingly rather than staying at
250 to 350.

The Leadership proof section SHALL name Risk Assessment Platform rather than Cyber Risk Portfolio.
Cyber Risk Portfolio's Provenance describes sole ownership of the frontend and an inherited component
library, so it never carried the proof; no shipped chapter does. The one-chapter rule SHALL be kept,
and the chapter map SHALL be corrected to match: the leadership label moves off the Cyber Risk
Portfolio row and onto the tier 2 row for the 42-question assessment.

The tier 2 description SHALL also stop asserting a smaller title, since tier 2 shares the tier 1 type
scale, and SHALL stop asserting that a tier 2 chapter makes no survivor claim, since this chapter
claims the method survived even though the product did not ship.

#### Scenario: The template matches what shipped

- **WHEN** the tier 2 section of the template is read against this chapter
- **THEN** the template permits the four blocks this chapter renders, in the order it renders them

#### Scenario: The three-block claim is gone

- **WHEN** the template's tier 2 section is inspected
- **THEN** it no longer asserts that tier 2 uses only Specimen, Field Guide, and Later Observations

#### Scenario: Leadership proof points at the right chapter

- **WHEN** the template's Leadership proof section is read
- **THEN** it names Risk Assessment Platform, and Cyber Risk Portfolio is no longer labelled the
  leadership chapter anywhere in the file

#### Scenario: The type scale claim matches the renderer

- **WHEN** the template's tier 2 description is read against `ProductChapter.tsx`
- **THEN** neither asserts a smaller title for tier 2

#### Scenario: The survivor rule allows a method claim

- **WHEN** the template's tier 2 Later Observations guidance is read against this chapter's copy
- **THEN** the guidance permits a claim about what the method survived into while still barring a
  claim that the product shipped
