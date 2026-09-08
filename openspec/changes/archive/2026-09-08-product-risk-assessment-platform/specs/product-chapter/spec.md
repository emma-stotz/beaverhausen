## ADDED Requirements

### Requirement: A chapter without a masthead is tier 2

`masthead` SHALL be optional on `ProductChapter`. A chapter that omits it is a tier 2 chapter and
SHALL render, in order: the title, an optional subtitle, each block in array order, the closing
field note, and a link back to the case study. No masthead element, no hero container, and no
labelled Specimen / Working Hypothesis / Provenance triple SHALL render.

Tier 2 SHALL reuse the tier 1 type scale unchanged: `BaseT1` for the title, `BaseT2` for block
headings. The weight difference between tiers comes from structure and length, not from a second
type scale. Everything already sits in one centered column, so no layout change is needed to make
tier 2 single column.

Tier 2 SHALL introduce no new component and no new block kind. Its blocks are ordinary
`ChapterBlock` entries, so a Specimen or Provenance block in tier 2 is a block heading plus prose,
not a masthead entry.

#### Scenario: Blocks start under the title

- **WHEN** a chapter omitting `masthead` renders
- **THEN** its first block heading follows the title and subtitle directly, with no masthead above it

#### Scenario: No hero container appears

- **WHEN** a tier 2 chapter renders
- **THEN** no hero artifact frame renders outside a block, and no `figure` sits above the first block
  heading

#### Scenario: Type scale matches tier 1

- **WHEN** a tier 2 chapter renders its title and block headings
- **THEN** the title uses `BaseT1` and the block headings use `BaseT2`, the same as a tier 1 chapter

#### Scenario: Tier 1 chapters are unaffected

- **WHEN** any chapter that supplies a `masthead` renders
- **THEN** it renders exactly as it did before `masthead` became optional

#### Scenario: TypeScript accepts a chapter with no masthead

- **WHEN** a content module exports a `ProductChapter` with a title, blocks, and a field note but no
  `masthead`
- **THEN** `tsc -b` succeeds

## MODIFIED Requirements

### Requirement: Tier 1 block order

A tier 1 chapter is one whose data supplies a `masthead`. It SHALL render, in order: the title, an
optional subtitle, the masthead, each block in array order, the closing field note, and a link back
to the case study. Each block SHALL render its heading followed by its content in array order.

The masthead, the blocks, and the field note SHALL share one spaced container, so the gap before the
field note does not depend on whether the last block happened to end with an artifact. The back link
sits outside that container. A tier 2 chapter SHALL use the same container and the same spacing, with
the masthead simply absent from it, so the gap between the title and the first block matches the gap
between blocks.

#### Scenario: Page order follows the template

- **WHEN** a visitor loads a tier 1 product chapter
- **THEN** title, masthead, blocks, and field note appear in that order

#### Scenario: Subtitle is optional

- **WHEN** a chapter omits `subtitle`
- **THEN** no subtitle element renders and the masthead follows the title directly

#### Scenario: The field note is spaced like a block

- **WHEN** a chapter's last block ends with a paragraph rather than an artifact
- **THEN** the gap before the field note matches the gap between blocks

#### Scenario: Spacing does not collapse without a masthead

- **WHEN** a tier 2 chapter renders
- **THEN** the gaps between its blocks and before its field note match a tier 1 chapter's

### Requirement: The masthead carries three fixed subheads and a hero artifact

When a chapter supplies a `masthead`, that masthead SHALL render three labelled entries in this
order: Specimen, Working Hypothesis, Provenance. The three labels are fixed by the tier 1 template
and are not content fields. `masthead.hero` SHALL be an `ArtifactSlot`, so the hero takes the same
width scale and caption treatment as every other artifact.

The hero SHALL render before the three entries by default. Setting `masthead.heroBelow` SHALL render
it after them instead, for a hero tall enough that leading with it pushes the copy off the screen.

A chapter MAY omit `masthead` entirely, in which case none of the above renders. The three labels
remain tier 1 only: a tier 2 chapter that needs a Specimen or Provenance section SHALL express it as
a block, so its heading sits at the block scale rather than the masthead scale.

#### Scenario: Subheads are present and ordered

- **WHEN** the masthead renders
- **THEN** the headings Specimen, Working Hypothesis, and Provenance appear above their paragraphs, in
  that order

#### Scenario: Hero uses the shared artifact treatment

- **WHEN** the masthead hero specifies a `width`
- **THEN** it renders at that width, in the same frame and with the same caption styling as artifacts
  inside blocks

#### Scenario: Hero leads by default

- **WHEN** a chapter omits `heroBelow`
- **THEN** the hero renders above the three entries

#### Scenario: A tall hero follows the copy

- **WHEN** a chapter sets `heroBelow`
- **THEN** the three entries render first and the hero after them, at every width

#### Scenario: Omitting the masthead omits the triple

- **WHEN** a chapter has no `masthead`
- **THEN** no Specimen, Working Hypothesis, or Provenance masthead entry renders, and no hero artifact
  renders outside a block
