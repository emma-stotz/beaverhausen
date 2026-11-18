## Why

The WhiteHawk case study page is the primary landing point for most site visitors, but the flipbook
fills the viewport with no indication that anything follows. Five product extensions of the WhiteHawk
design system have no discovery surface; adding them below the flipbook turns a dead end into a
browsable catalogue.

## What Changes

- Add a products section below the flipbook on `/portfolio/whitehawk`, showing five entries with
  thumbnail placeholders and names.
- Add a scroll cue at the bottom of the flipbook viewport, matching the style of the existing scroll
  cue in `Hero` (`BaseT6` label + animated `iron-orange` line). The cue is not part of the products
  component -- it sits between the flipbook and the products section, in the position currently
  occupied by `CaseStudyNav`. This avoids per-breakpoint layout adjustments.
- Move `CaseStudyNav` (prev/next) to below the new products section.
- Add five stub routes under `/portfolio/whitehawk/` (e.g. `/portfolio/whitehawk/platform`) that
  render placeholder pages satisfying `TransitionLink` targets without a dead 404.
- Add a typed `PRODUCTS` array to `src/content/case-study-whitehawk.ts` as the data source.
- Use the existing `BaseCard` primitive (`src/components/primitives/BaseCard.tsx`) for product
  entries -- it provides border, background, blur, and shadow consistent with the design system.

## Non-goals

- Building out the individual product pages (content, layout, imagery).
- Swapping placeholder thumbnails for real assets.
- Finalising product names or copy.

## Capabilities

### New Capabilities

- `whitehawk-products-section`: Grid of five product entries below the WhiteHawk flipbook, each
  entry rendered as a `BaseCard` containing a thumbnail placeholder and name, linking to its own
  stub route. Preceded by a scroll cue (matching `Hero` style) that replaces `CaseStudyNav` at its
  current DOM position.
- `whitehawk-product-stub-pages`: Five placeholder pages at `/portfolio/whitehawk/<slug>`, wired
  into the router with the water-fill transition.

### Modified Capabilities

_(none -- no existing spec-level requirements are changing)_

## Impact

- `src/pages/portfolio/whitehawk/index.tsx` -- add scroll cue, products section, reorder
  `CaseStudyNav` to below products
- `src/content/case-study-whitehawk.ts` -- add `Product` type and `PRODUCTS` array
- `src/App.tsx` -- add five child routes under `/portfolio/whitehawk`
- New files: `src/pages/portfolio/whitehawk/<slug>/index.tsx` x5 (stub pages),
  `src/components/portfolio/whitehawk/WhiteHawkProducts.tsx` (products grid)
- Reuses `BaseCard` primitive and `Hero` scroll cue pattern; no new dependencies, no breaking
  changes
