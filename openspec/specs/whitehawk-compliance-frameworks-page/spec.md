# whitehawk-compliance-frameworks-page Specification

## Purpose

The third WhiteHawk product chapter and the last of the tier 1 set: a case study of the guided
CMMC and Australian Essential 8 assessments, arguing that the interaction vocabulary generalized
across two standards while the framework model deliberately did not. Replaces the former comply stub
page. It is also the first chapter that grew the shared product-chapter capability rather than
fitting it.

## Requirements

### Requirement: The chapter resolves at its own route

`/portfolio/whitehawk/compliance-frameworks` SHALL render the Compliance Frameworks tier 1 chapter.
The page component SHALL live at
`src/pages/portfolio/whitehawk/compliance-frameworks/index.tsx` and SHALL be thin: it composes
`CaseStudyLayout` and `ProductChapter` and holds no logic.

#### Scenario: Route resolves

- **WHEN** a visitor navigates to `/portfolio/whitehawk/compliance-frameworks`
- **THEN** the Compliance Frameworks chapter renders, not a "coming soon" placeholder

#### Scenario: Reached from the products grid

- **WHEN** a visitor clicks the Compliance Frameworks entry in the WhiteHawk products section
- **THEN** the water-fill transition fires and the chapter page renders

### Requirement: Chapter copy lives in a typed content module

`src/content/product-compliance-frameworks.ts` SHALL export `COMPLIANCE_FRAMEWORKS` as a
`ProductChapter` rather than commented draft text. It SHALL carry the title "Compliance Frameworks",
the subtitle "Shared Language, Different Rules", the three masthead entries, three blocks (Field
Guide, Divergence, Later Observations), and the closing field note.

#### Scenario: Content module has no commented-out copy

- **WHEN** the content module is inspected
- **THEN** the chapter text is in exported constants, not in `//` comments

#### Scenario: The alternate heading is dropped

- **WHEN** the chapter renders its heading area
- **THEN** the subtitle reads "Shared Language, Different Rules" and "Structure Carries Meaning" does
  not appear

#### Scenario: Field note closes the chapter

- **WHEN** a visitor scrolls to the end of the chapter
- **THEN** the field note about the next framework being the first one not built renders last

### Requirement: Four visual moments appear, mapped to their blocks

The chapter SHALL render four artifact slots across six image files, using the assets under
`src/assets/portfolio/case-studies/whitehawk/products/compliance-frameworks/`:

| #   | Block         | Kind   | File(s)                                               |
| --- | ------------- | ------ | ----------------------------------------------------- |
| 1   | Masthead hero | single | `frameworks_hero.png`                                 |
| 2   | Field Guide   | pair   | `frameworks_2_cmmc.png` then `frameworks_2_au-e8.png` |
| 3   | Field Guide   | single | `frameworks_3.png`                                    |
| 4   | Divergence    | pair   | `frameworks_4_cmmc.png` then `frameworks_4_au-e8.png` |

Later Observations carries no artifact.

#### Scenario: Every artifact is present

- **WHEN** a visitor loads the chapter
- **THEN** six images render across the four moments, in the blocks listed above

#### Scenario: Later Observations is prose only

- **WHEN** the Later Observations block renders
- **THEN** it contains paragraphs and no figure elements

### Requirement: Both pairs lead with CMMC

Moments 2 and 4 SHALL each be a `pair` whose first artifact is the CMMC view and whose second is the
Essential 8 view, so the same framework occupies the same position in both. Moment 2 SHALL be
`stacked` in an `xl` slot with its CMMC half narrowed to `lg`; moment 4 SHALL render side by side in
an `xl` slot.

#### Scenario: CMMC leads in both pairs

- **WHEN** a visitor reads moment 2 or moment 4
- **THEN** the CMMC view precedes the Essential 8 view

#### Scenario: The Field Guide pair stacks

- **WHEN** moment 2 renders at any width
- **THEN** its two images sit one above the other, the CMMC half narrower than the Essential 8 half,
  sharing one caption

#### Scenario: The Divergence pair compares side by side

- **WHEN** moment 4 renders at `md` or wider
- **THEN** the two controls sit in two columns for direct comparison

### Requirement: The masthead hero follows the copy

The chapter SHALL set `heroBelow`. Its hero is a full-page view tall enough that leading with it would
push the three masthead entries off the screen.

#### Scenario: Copy precedes the hero

- **WHEN** a visitor loads the chapter
- **THEN** Specimen, Working Hypothesis, and Provenance render above the hero artifact

### Requirement: Every artifact carries a caption and alt text

Each of the four moments SHALL render the caption drafted for it and SHALL carry non-empty alt text
on every image. No caption SHALL be an empty string. Each pair SHALL carry one caption for both
halves.

#### Scenario: Captions are present

- **WHEN** a visitor reads the chapter
- **THEN** each of the four moments has a visible, non-empty caption beneath it

### Requirement: The chapter states its outcome numbers

The Later Observations block SHALL state what shipped: Essential 8 live in full, CMMC live at Level 1
with Levels 2 and 3 modeled, 14 further frameworks planned, and the assessments shipping with every
account, 162 at the time of writing. It SHALL also state plainly that completion rates are not yet
measured.

#### Scenario: Numbers are visible

- **WHEN** a visitor reads Later Observations
- **THEN** the account and framework counts appear in the copy

#### Scenario: The unmeasured outcome is not dressed up

- **WHEN** a visitor reads the account count
- **THEN** the copy says how many accounts have the assessments, not how many completed one

### Requirement: The chapter grew the shared capability rather than fitting it

This chapter SHALL add exactly two optional schema fields, `masthead.heroBelow` and
`Artifact.width`, both recorded as a `product-chapter` delta. Unlike the two chapters before it, it
could not be built from the existing component set alone. Both fields SHALL be absent from the
earlier chapters, which SHALL continue to render unchanged. No new component SHALL be added, and no
existing type SHALL change shape.

#### Scenario: The additions are optional and opt-in

- **WHEN** a chapter omits `heroBelow` and per-artifact `width`
- **THEN** it renders exactly as it did before those fields existed

#### Scenario: Capability changes are specified, not folded in

- **WHEN** a shared component or the chapter schema changes alongside this chapter
- **THEN** that change is recorded as a `product-chapter` delta, not as a requirement of this page
