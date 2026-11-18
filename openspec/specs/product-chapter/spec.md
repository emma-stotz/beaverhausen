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
reads as a frame within a frame. A `toggle` slot's button SHALL respect this too, contributing only
its `focus-visible` ring.

The frame SHALL NOT carry its own vertical margins. Every container that holds artifacts already
spaces its children, so margins on the figure double-space against them. Vertical rhythm belongs to
the container.

No artifact SHALL carry a lightbox, a zoom, a pan, or a link. A `single` or `pair` artifact SHALL
ignore clicks entirely. A `toggle` artifact SHALL respond to hover, click, and keyboard by swapping
between its two states and SHALL do nothing else: no navigation, no overlay, no scaling.

#### Scenario: Artifact is presented undecorated

- **WHEN** an artifact renders in a chapter
- **THEN** the image scales to the slot width with no border, corner radius, or shadow around it

#### Scenario: Spacing comes from the container

- **WHEN** an artifact renders between two paragraphs in a block
- **THEN** the gaps above and below it match the block's own spacing, with no extra margin from the
  figure

#### Scenario: Single and pair artifacts ignore clicks

- **WHEN** a visitor clicks a `single` or `pair` artifact
- **THEN** nothing happens; there is no lightbox, zoom, or link

#### Scenario: Clicking a toggle only swaps its state

- **WHEN** a visitor clicks a `toggle` artifact
- **THEN** the visible state changes and nothing else happens: no lightbox, no zoom, no navigation

### Requirement: Every artifact has a caption and alt text

Each artifact SHALL render a visible caption below its frame and SHALL carry non-empty `alt` text.
`caption` is a required field on every `ArtifactSlot`, so an artifact without one fails type checking.
A `pair` SHALL carry one caption for both halves, positioned below them. A `toggle` SHALL carry one
caption for both states, positioned below the frame, and non-empty `alt` on each of its two layers.

#### Scenario: Caption is visible below the artifact

- **WHEN** an artifact renders
- **THEN** a caption is visible directly beneath its frame

#### Scenario: Pair carries a single shared caption

- **WHEN** a pair renders
- **THEN** exactly one caption appears, below both halves, at every viewport width

#### Scenario: Toggle carries a single shared caption

- **WHEN** a toggle renders and the visitor changes its state
- **THEN** the same one caption stays below the frame, unchanged by the state

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

### Requirement: A toggle slot shows two states of one screen

`ArtifactSlot` SHALL accept a third kind, `toggle`, carrying a `rest` artifact, an `active` artifact,
a required `label`, one shared `caption`, and an optional `width`. It exists for a screen whose point
is a state change: a resting view and the same view responding to input, where showing only one loses
the argument and showing both side by side loses the comparison.

Both artifacts SHALL render in the same frame, occupying the same box, so the two states register as
one screen changing rather than two screens. The frame SHALL reserve the taller of the two so the
swap does not reflow the page.

A `toggle` SHALL NOT be used for two different screens. That is what `pair` is for.

#### Scenario: Both states occupy one frame

- **WHEN** a `toggle` slot renders
- **THEN** the two artifacts sit in the same box at the same size, with one visible at a time

#### Scenario: The swap does not reflow the page

- **WHEN** the visible state changes
- **THEN** the frame's height does not change and no content below it moves

#### Scenario: One caption for both states

- **WHEN** a `toggle` slot renders
- **THEN** exactly one caption appears below the frame, describing the state change rather than
  either state alone

#### Scenario: TypeScript rejects a toggle without a label

- **WHEN** a content module writes a `toggle` slot with no `label`
- **THEN** `tsc -b` fails

### Requirement: A toggle artifact responds to hover, pointer, and keyboard

The `toggle` frame SHALL be wrapped in a `<button type="button">` so every input can reach it. Its
behaviour SHALL be:

- Hovering the button SHALL show `active` and leaving SHALL return to `rest`. Hover is a preview and
  SHALL NOT change the latched state.
- Clicking or tapping SHALL latch: `active` stays visible after the pointer leaves. Clicking again
  SHALL unlatch.
- Enter and Space SHALL toggle the latch, which a native `<button>` provides.
- The visible state SHALL be `active` when the slot is latched or hovered, and `rest` otherwise, so a
  latched slot does not flicker back to rest when a pointer passes over it.

The cross-fade SHALL use the existing `--duration-interaction` and `--ease-out-cubic` tokens. Under
`prefers-reduced-motion: reduce` the swap SHALL be immediate, with no transition.

#### Scenario: Hover previews without latching

- **WHEN** a visitor hovers the toggle and then moves the pointer away without clicking
- **THEN** `active` appears while hovering and `rest` returns afterwards

#### Scenario: Tap latches on a touch device

- **WHEN** a visitor taps the toggle on a device with no hover
- **THEN** `active` becomes visible and stays visible until tapped again

#### Scenario: Keyboard toggles the latch

- **WHEN** a visitor focuses the toggle and presses Enter or Space
- **THEN** the visible state changes, and pressing again changes it back

#### Scenario: Hovering a latched toggle does not unlatch it

- **WHEN** a visitor has latched the toggle and then hovers it and leaves
- **THEN** `active` stays visible throughout

#### Scenario: Reduced motion removes the fade

- **WHEN** a visitor with `prefers-reduced-motion: reduce` toggles the slot
- **THEN** the state changes immediately with no cross-fade

### Requirement: A toggle artifact is announced and focusable

The button SHALL carry `aria-pressed` reflecting the latched state, and an accessible name from the
slot's `label`, which SHALL say what toggling does rather than describing either image. Both image
layers SHALL keep non-empty `alt` text, and the layer that is not visible SHALL be `aria-hidden` so
assistive technology is never offered two competing descriptions of one frame.

The button SHALL show a visible `focus-visible` ring in `iron-orange`, matching every other
interactive affordance. A click that moves focus to the button SHALL NOT paint a ring, which is what
`focus-visible` gives for free. A click on a button that already carries the ring, because a visitor
tabbed to it first, SHALL keep it: focus has not moved, and blinking the ring off would be a worse
answer than leaving it. The button SHALL be the only tab stop the slot introduces.

The button SHALL add no border, shadow, or background of its own. It MAY set a corner radius, whose
only effect is to shape that ring, since an outline follows `border-radius` and nothing is painted
behind it for a radius to clip. The undecorated frame rule still holds: the only visual the button
contributes is the focus ring.

The ring cannot be made to hug the artwork inside the frame. These screenshots carry their own
transparent padding for a baked-in drop shadow, so the button's box is wider than the visible card by
however much padding that asset happens to have. The radius is therefore chosen to read as
deliberately rounded rather than to match any one asset's corner.

#### Scenario: Pressed state is announced

- **WHEN** a screen reader user focuses the toggle
- **THEN** it is announced as a button with the slot's label and its pressed state

#### Scenario: Only the visible layer is exposed

- **WHEN** assistive technology reads the frame
- **THEN** only the visible layer's `alt` is available, and the hidden layer is `aria-hidden`

#### Scenario: Keyboard focus is visible

- **WHEN** a visitor tabs to the toggle
- **THEN** an `iron-orange` focus ring is visible around the frame, with rounded corners

#### Scenario: A click that moves focus shows no ring

- **WHEN** a visitor clicks the toggle with a pointer, without having tabbed to it first
- **THEN** the state changes and no focus ring appears

#### Scenario: A click keeps a ring the keyboard already earned

- **WHEN** a visitor tabs to the toggle, so the ring is showing, and then clicks it
- **THEN** the state changes and the ring stays, because focus never moved

#### Scenario: The button adds no chrome

- **WHEN** an unfocused toggle renders
- **THEN** it looks exactly like a `single` artifact of the same width, its corner radius invisible
  with nothing painted behind it

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
