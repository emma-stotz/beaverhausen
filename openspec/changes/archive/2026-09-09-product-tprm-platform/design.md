## Context

Four product chapters ship today: three tier 1 with mastheads, one tier 2 without. `ArtifactSlot`
has two kinds, `single` and `pair`, and every artifact is inert by spec: no lightbox, no zoom, no
link. `ChapterArtifact` is a pure function of its slot.

Third Party Risk Management Platform is the fifth and last chapter, and the second tier 2. Its copy
is drafted and marked complete in the comments of `src/content/product-tprm-platform.ts`. All four
assets are in the repo.

Two things make it different from the chapter before it:

- One artifact is a state change, not a screen. The Field Guide argues that a legend of ten
  overlapping series "isn't a key: it is a control." A single frame cannot make that argument, and
  two frames side by side turn a state change into a comparison of two things.
- It retires the last stub. `whitehawk-product-stub-pages` has nothing left to describe.

Constraints that shaped this design:

- The two chart assets are pixel-identical in size, 1063 by 393, so they can be stacked in one box
  with no letterboxing.
- The client cannot be named. Artifact 1's vendor rows are already anonymized placeholders.
- Hover alone is not an interaction. Touch has no hover and an inert `<img>` has nothing to focus,
  so a hover-only swap would hide the block's whole argument from phone and keyboard visitors.

## Goals / Non-Goals

**Goals:**

- Render the drafted chapter at `/portfolio/whitehawk/tprm-platform` with both artifacts.
- Add one artifact kind that works from hover, pointer, and keyboard, with a correct accessibility
  tree.
- Retire the `client-b` stub and the stub capability with it, without losing the retired-URL
  behaviour.

**Non-Goals:**

- No edits to `products-template.md`. See the two recorded drifts below.
- No zoom, pan, or lightbox on any artifact.
- No Provenance block.
- No retrofitting `toggle` onto the four shipped chapters.
- No rewriting the drafted copy beyond the mechanical edits noted below.

## Decisions

### The toggle is a third slot kind, not a flag on `single`

`ArtifactSlot` is already a discriminated union, so a third member is the idiomatic move and
TypeScript enforces that `rest`, `active`, and `label` arrive together:

```ts
| { kind: 'toggle'; rest: Artifact; active: Artifact; caption: string; width?: ArtifactWidth; label: string }
```

_Alternative considered:_ an optional `hover?: Artifact` on `Artifact`, keeping `kind: 'single'`.
Rejected. It reads as a smaller diff but it is a worse type: `label` would have to be optional too,
so a content author could write a hover state with no accessible name and still typecheck. The
rendering also genuinely differs (a button, two layers, state), so the discriminant is carrying real
information rather than decoration.

### Latch plus hover, with latch winning

Visible state is `latched || hovering`. Hover previews without committing; click, Enter, and Space
commit. That combination is what makes one control work for three input models without any input
detection:

- Mouse: hover previews, and a click holds it for a longer look.
- Touch: no hover fires, so tap-to-latch is the whole interaction.
- Keyboard: a native `<button>` gives Enter and Space for free.

Latch winning over hover-out matters. Without it, a visitor who clicks to hold the state loses it the
moment the pointer drifts off, which reads as a bug.

_Alternative considered:_ `@media (hover: hover)` for the swap and both states stacked where hover is
unavailable. Rejected in favour of the toggle: stacking turns the state change back into a
side-by-side comparison, which is the thing the toggle exists to avoid, and it gives phone visitors a
different artifact from everyone else.

_Alternative considered:_ hover only. Rejected. It hides the block's argument from every touch and
keyboard visitor.

### The button wraps the frame, and the hidden layer is `aria-hidden`

A `<button>` around the frame is the smallest correct control: it brings keyboard activation, the
disabled-free default, and `aria-pressed` semantics without a `tabindex` on an image.

The accessibility tree needs care, because two `<img>` layers in one box would otherwise offer a
screen reader two competing descriptions of one frame. So:

- The button's accessible name comes from `label`, describing what pressing does.
- Both layers keep non-empty `alt`, per the existing caption-and-alt requirement.
- The layer that is not visible is `aria-hidden`, so exactly one description is live at a time.

`aria-pressed` tracks the latch only, not hover. Hover is presentational; announcing a pressed state
because a pointer passed over the frame would be a lie.

### The button contributes no chrome but the focus ring

The undecorated-frame rule is the reason these screenshots read as evidence rather than as UI. A
button default would add a background and a border, so it is reset to nothing. The one visual it does
add is a `focus-visible` ring in `iron-orange`, which is the system's single accent for interactive
affordances and the repo's rule for keyboard feedback.

### Both artifacts at `xl`, accepting a slight upscale on the chart

Artifact 1 is 1420 wide and downscales to about 86% in the chapter column, which the previous chapter
proved legible. The chart is 1063 wide and renders slightly above native at `xl`.

Upscaling a raster chart costs some sharpness. Downscaling it to `lg` would cost legend legibility,
and the legend is the entire point of the block. Legibility is the template non-negotiable, so the
chart takes the softness. Worth a look in the browser during apply; if it reads as blurry rather than
large, `lg` and a sharper asset is the fix, not a spec change.

### Copy moves with three mechanical edits

The drafted copy transfers verbatim except:

1. The title splits into `title` and `subtitle`, matching the other four chapters.
2. The `**Field note**:` prefix and its trailing space are stripped, since `FieldNote` renders that
   label itself and `Paragraph` only converts `*single asterisk*` markers.
3. The artifact plan table and both captions move from comments into slot data.

The draft's plan names the second chart file `tprm_2_hover.png`; the repo has `tprm_2_hovered.png`.
The repo wins. Alt text and the toggle `label` are written fresh, since the draft has neither.

### The stub capability is removed, not emptied

`client-b` was the last stub, so `whitehawk-product-stub-pages` would describe zero routes. Its one
durable behaviour, retired URLs falling through instead of redirecting, already lives in
`not-found-page`, which gains `client-a` and `client-b` in the same change. Removing the capability
and moving nothing is the honest result.

Its requirement name had also gone stale: the previous change left it titled "Five stub routes exist"
while its body described one. Removing it settles that too, which is tidier than the rename it would
otherwise need.

## Risks / Trade-offs

**A toggle artifact is a tab stop inside prose.** → One per chapter, with a label that says what it
does, which is better than the alternative of content only some visitors can reach. It is the only
tab stop the slot adds.

**Hover previewing without latching may read as a flicker on a trackpad.** → The cross-fade uses the
existing 0.4s interaction token rather than an instant swap, so a pointer crossing the frame reads as
a soft change rather than a flash, and `prefers-reduced-motion` removes it entirely. Worth watching
in the browser.

**The chart upscales at `xl`.** → Accepted for legend legibility, flagged for a browser check. The
fallback is a higher-resolution asset, not a narrower slot.

**`ChapterArtifact` stops being a pure function of its slot.** → State is local to the new component
and the other two kinds stay pure. The React Compiler is active, so the new component avoids
mutation-across-render patterns and keeps handlers stable.

**The chapter runs 432 words against the tier 2 budget of 250 to 350, and its Field Guide is 226
against 120 to 160.** → Shipping as drafted, template unchanged, by decision. Recorded so the drift
is deliberate rather than forgotten: the template now understates tier 2 in two places, and the next
tier 2 chapter is where to settle whether 432 is the real ceiling or this chapter is long.

**The closing clause is more specific than the template prescribes.** → The template's framing rule
offers "following a restructure on the client side" for this chapter; the copy says the client
dissolved its third-party risk management team. Shipping the draft's wording by decision. A global
technology company winding down a function is not identifying, and the specific reason closes the
question a vaguer one invites. The template's framing-rule bullet is now out of step with what
shipped.

**The `thumbnail: null` branch becomes unreachable.** → Kept deliberately as the documented fallback
for the next product added before its thumbnail exists. Dead code with a stated purpose beats a
field that has to be widened again later.

## Migration Plan

Ordered so every commit builds green, per the repo's one-reviewable-thing rule:

1. The `toggle` variant on `ArtifactSlot`. Nothing constructs one yet.
2. `ChapterArtifactToggle.tsx`, plus the dispatch in `ChapterArtifact`. The union is exhaustive
   again.
3. The content module: draft comments out, `TPRM_PLATFORM` in.
4. The new page component.
5. The router entry, swapping `client-b` for `tprm-platform`.
6. Delete `src/pages/portfolio/whitehawk/client-b/index.tsx`, now that nothing imports it.
7. `PRODUCTS`: the fifth entry renamed, re-id'd, and given its thumbnail.

Steps 1 and 2 could be one commit, but splitting them keeps the type change reviewable on its own.
Rollback is `git revert`. There is no data and no migration outside `tsc -b && vite build`.

## Open Questions

None blocking. Two things to settle in the browser rather than on paper: whether the chart's slight
upscale at `xl` reads as large or as blurry, and whether the hover preview feels like a preview or a
flicker when a pointer crosses the frame.
