## Why

`client-b` is the last stub in the WhiteHawk products grid. Its chapter copy is written and marked
complete in `src/content/product-tprm-platform.ts`, and all four assets are in the repo. Shipping it
retires the stub concept entirely: every one of the five products becomes a real chapter.

It also needs something the shared renderer cannot do. One artifact is a twelve-month chart of ten
overlapping series whose point is that the legend is a control, not a key. That only reads as two
states, so the chapter needs an artifact a visitor can toggle.

## What Changes

- Add the Third Party Risk Management Platform tier 2 chapter at
  `/portfolio/whitehawk/tprm-platform`, three blocks (Specimen, Field Guide, Later Observations) and
  two artifacts, from the assets under
  `src/assets/portfolio/case-studies/whitehawk/products/tprm-platform/`.
- Add a third `ArtifactSlot` kind, `toggle`, carrying a `rest` and an `active` artifact under one
  caption. It renders as a `<button>` wrapping the frame: hover shows `active`, click or Enter or
  Space latches it, and `aria-pressed` reflects the latched state. This is the first interactive
  artifact, so `product-chapter` has to stop asserting that artifacts are inert.
- Retire the `client-b` stub: delete its page, replace its router entry, and let
  `/portfolio/whitehawk/client-b` fall through to the not-found page. Same as `platform`, `engage`,
  `comply`, and `client-a` before it.
- Rename the fifth `PRODUCTS` entry to `Third Party Risk Management Platform` with id
  `tprm-platform` and its thumbnail. No entry keeps `thumbnail: null`, so the placeholder branch in
  `WhiteHawkProducts` becomes dead but stays as the schema's documented fallback.
- **BREAKING** for `whitehawk-product-stub-pages`: with `client-b` gone there are no stub pages left.
  The capability retires. `not-found-page` already owns retired-URL fall-through and picks up the two
  client slugs.

Before, two inert slot kinds:

```ts
export type ArtifactSlot =
  | {
      kind: 'single'
      artifact: Artifact
      caption: string
      width?: ArtifactWidth
    }
  | {
      kind: 'pair'
      artifacts: [Artifact, Artifact]
      caption: string
      width?: ArtifactWidth
      stacked?: boolean
    }
```

After, a third kind that is a control:

```ts
export type ArtifactSlot =
  | {
      kind: 'single'
      artifact: Artifact
      caption: string
      width?: ArtifactWidth
    }
  | {
      kind: 'pair'
      artifacts: [Artifact, Artifact]
      caption: string
      width?: ArtifactWidth
      stacked?: boolean
    }
  // Two states of one screen. Hover previews `active`; click or Enter latches it.
  | {
      kind: 'toggle'
      rest: Artifact
      active: Artifact
      caption: string
      width?: ArtifactWidth
      label: string
    }
```

## Capabilities

### New Capabilities

- `whitehawk-tprm-platform-page`: The fifth and last WhiteHawk product chapter. Covers its route,
  its typed content module, its three blocks, its two artifacts, and the toggle artifact's content.

### Modified Capabilities

- `product-chapter`: gains the `toggle` slot kind and its interaction, focus, and accessibility
  contract. "Artifacts are not interactive" and "Every artifact has a caption and alt text" both need
  restating, since one slot kind is now a control with two image layers under one caption.
- `whitehawk-products-section`: the fifth entry is a named product with a thumbnail, so no entry is a
  placeholder any more.
- `whitehawk-product-stub-pages`: retired. Both requirements are removed because no stub route
  remains.
- `not-found-page`: its retired-product-URL scenario picks up `/portfolio/whitehawk/client-a` and
  `/portfolio/whitehawk/client-b` alongside the three it already lists.

## Non-goals

- No edits to `src/content/products-template.md`. The chapter ships as drafted at 432 words against
  the template's 250 to 350, and its closing clause keeps the draft's wording rather than the one the
  template prescribes. Both drifts are recorded in design.md as known and deliberate.
- No tap-to-zoom, lightbox, or pan on any artifact. The toggle swaps two states and does nothing
  else.
- No Provenance block. Leadership proof stays in Risk Assessment Platform, one chapter, as the
  template requires.
- No retrofitting `toggle` onto existing chapters. The four shipped chapters keep `single` and
  `pair`.
- No removal of the `thumbnail: null` placeholder branch, even though nothing exercises it now.

## Impact

Schema and shared renderer:

- `src/content/products.ts`: `ArtifactSlot` gains the `toggle` variant; `PRODUCTS` fifth entry
  replaced.
- `src/components/portfolio/products/ChapterArtifact.tsx`: dispatches the new kind.
- New `src/components/portfolio/products/ChapterArtifactToggle.tsx`: the button, the two stacked
  layers, the hover and latch state. The first stateful component in this directory.

New files:

- `src/content/product-tprm-platform.ts`: replaces its own commented draft.
- `src/pages/portfolio/whitehawk/tprm-platform/index.tsx`.

Removed:

- `src/pages/portfolio/whitehawk/client-b/index.tsx`.
- `openspec/specs/whitehawk-product-stub-pages/spec.md`, at sync time.

Routing:

- `src/App.tsx`: `client-b` route and import swapped for `tprm-platform`.

No new dependencies. The four shipped chapters render unchanged: they use neither the new slot kind
nor anything it touches.
