## ADDED Requirements

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
interactive affordance, and SHALL NOT show a ring on mouse click. It SHALL be the only tab stop the
slot introduces.

The button SHALL add no border, corner radius, shadow, or background of its own. The undecorated
frame rule still holds: the only visual the button contributes is the focus ring.

#### Scenario: Pressed state is announced

- **WHEN** a screen reader user focuses the toggle
- **THEN** it is announced as a button with the slot's label and its pressed state

#### Scenario: Only the visible layer is exposed

- **WHEN** assistive technology reads the frame
- **THEN** only the visible layer's `alt` is available, and the hidden layer is `aria-hidden`

#### Scenario: Keyboard focus is visible

- **WHEN** a visitor tabs to the toggle
- **THEN** an `iron-orange` focus ring is visible around the frame

#### Scenario: Clicking shows no focus ring

- **WHEN** a visitor clicks the toggle with a pointer
- **THEN** the state changes and no focus ring appears

#### Scenario: The button adds no chrome

- **WHEN** an unfocused toggle renders
- **THEN** it looks exactly like a `single` artifact of the same width

## MODIFIED Requirements

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
