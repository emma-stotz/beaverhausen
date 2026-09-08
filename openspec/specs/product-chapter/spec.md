# product-chapter Specification

## Purpose

Defines the reusable structure behind the product case study pages that sit beneath a brand case
study flipbook. A chapter is typed data rendered by one shared component set, so adding a product
page means writing a content module and a thin page rather than new layout code. Covers block order,
the masthead, how prose and artifacts interleave, artifact framing and captions, and the type and
color rules the pages share.

## Requirements

### Requirement: Chapter data is a typed schema, not markup

A product chapter SHALL be described by exported constants from a content module under
`src/content/`, typed against `ProductChapter` in `src/content/products.ts`. The shared components in
`src/components/portfolio/products/` SHALL render a chapter from that data alone, so adding a chapter
requires a content module and a thin page, not new layout code.

#### Scenario: A chapter renders from content only

- **WHEN** a content module exports a `ProductChapter` with its title, masthead, blocks, and field note
- **THEN** `<ProductChapter chapter={...} />` renders the full page without chapter-specific layout code

#### Scenario: TypeScript rejects a malformed chapter

- **WHEN** a content module omits a required field such as an artifact caption
- **THEN** `tsc -b` fails

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

### Requirement: Blocks interleave prose and artifacts

A block's `content` SHALL be an ordered array whose entries are either `{ kind: 'prose' }` or an
`ArtifactSlot`. Rendering SHALL preserve array order, so a sentence can sit directly above the
artifact it describes.

#### Scenario: A sentence sits above its artifact

- **WHEN** a block lists a prose entry immediately followed by an artifact
- **THEN** that paragraph renders directly above that artifact

#### Scenario: A block may have no artifacts

- **WHEN** a block's content contains only prose entries
- **THEN** the block renders its heading and paragraphs with no figure elements

### Requirement: Prose is capped, artifacts break out

Prose (title, subtitle, block headings, paragraphs, field note, and artifact captions) SHALL be
constrained to `max-w-3xl` and centered. Artifacts SHALL NOT be constrained to the text column: the
`width` scale resolves to `max-w-3xl`, `max-w-4xl`, and the full chapter column, defaulting to the
narrowest.

#### Scenario: A wide artifact exceeds the text column

- **WHEN** an artifact specifies a width above the default
- **THEN** it renders wider than the surrounding paragraphs

#### Scenario: Captions stay in the text column

- **WHEN** a full-width artifact renders
- **THEN** its caption is still capped at the prose width rather than spanning the artifact

### Requirement: Body copy reuses the existing case study prose components

Chapter paragraphs SHALL render through `Paragraph` and the closing aside through `FieldNote`, both
from `src/components/portfolio/case-studies/`. Both SHALL accept a `className` override so a chapter
can set its own text color without changing the default the flipbook relies on.

#### Scenario: Emphasis markers work in chapter copy

- **WHEN** a chapter paragraph wraps a phrase in `*asterisks*`
- **THEN** that phrase renders as `<em>`, the same as in the flipbook

#### Scenario: Flipbook rendering is unchanged

- **WHEN** `Paragraph` or `FieldNote` is used without a `className`
- **THEN** it renders `text-beaver`, exactly as before the override existed

### Requirement: Headings use AutoH

Chapter headings SHALL be emitted by `AutoH` inside `AutoHProvider`. No `<h1>` through `<h6>` tag
SHALL be hardcoded in the chapter components. The type scale SHALL descend down the page: `BaseT1`
for the title, `BaseT2` for block headings, `BaseT3` for masthead subheads.

#### Scenario: Heading levels descend correctly

- **WHEN** a chapter renders its title and its block headings
- **THEN** the title is one level above the block and masthead headings in the document outline

### Requirement: Artifacts render in the flipbook frame

Every artifact SHALL render inside a centered, `object-contain` frame that scales the image to the
slot's width without cropping it. The frame SHALL NOT add a border, rounded corners, a shadow, or any
other decoration of its own: these screenshots carry their own chrome, and a second frame around it
reads as a frame within a frame.

The frame SHALL NOT carry its own vertical margins. Every container that holds artifacts already
spaces its children, so margins on the figure double-space against them. Vertical rhythm belongs to
the container.

#### Scenario: Artifact is presented undecorated

- **WHEN** an artifact renders in a chapter
- **THEN** the image scales to the slot width with no border, corner radius, or shadow around it

#### Scenario: Spacing comes from the container

- **WHEN** an artifact renders between two paragraphs in a block
- **THEN** the gaps above and below it match the block's own spacing, with no extra margin from the
  figure

#### Scenario: Artifacts are not interactive

- **WHEN** a visitor clicks an artifact image
- **THEN** nothing happens; there is no lightbox, zoom, or link

### Requirement: Every artifact has a caption and alt text

Each artifact SHALL render a visible caption below its frame and SHALL carry non-empty `alt` text.
`caption` is a required field on every `ArtifactSlot`, so an artifact without one fails type checking.
A pair SHALL carry one caption for both halves, positioned below them.

#### Scenario: Caption is visible below the artifact

- **WHEN** an artifact renders
- **THEN** a caption is visible directly beneath its frame

#### Scenario: Pair carries a single shared caption

- **WHEN** a pair renders
- **THEN** exactly one caption appears, below both halves, at every viewport width

### Requirement: Pairs are side by side by default and can be stacked

A `pair` SHALL render its two artifacts side by side at `md` and wider and stacked below `md`, with
the first-listed artifact on top. Setting `stacked` SHALL keep them in one column at every width, for
pairs too dense to read at half width. Neither arrangement SHALL introduce horizontal page scrolling.

An artifact MAY carry its own `width`, which narrows it inside the slot. This is for a stacked pair
whose two halves want different widths; without it both halves inherit the slot's width.

#### Scenario: Pair is side by side on desktop

- **WHEN** a pair without `stacked` renders at `md` or wider
- **THEN** its two artifacts sit in two columns

#### Scenario: Stacked pair stays in one column

- **WHEN** a pair with `stacked` renders at any width
- **THEN** its two artifacts sit one above the other, first-listed on top, sharing one caption

#### Scenario: One half of a stacked pair is narrowed

- **WHEN** an artifact inside a slot specifies its own `width`
- **THEN** that image renders at that width, centered, while the other inherits the slot's width

### Requirement: Chapters render inside CaseStudyLayout with a back link

A product chapter page SHALL use `CaseStudyLayout` and SHALL link back to the parent case study using
`AppLink` or `TransitionLink`.

#### Scenario: Back link fires the water transition

- **WHEN** a visitor clicks the back link on a product chapter
- **THEN** the water-fill transition fires before the case study page renders

### Requirement: Colors come from theme tokens

Chapter components SHALL use Tailwind token utilities for all colors; no raw hex values SHALL appear.
In dark mode headings SHALL render `iron-orange`, body copy `enamel`, and captions `cream`.

#### Scenario: No raw hex in chapter components

- **WHEN** the shared chapter components are inspected
- **THEN** every color class references a `@theme` token
