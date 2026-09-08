## Why

The `client-a` stub is the fourth entry in the WhiteHawk products grid and currently resolves to a
"coming soon" page. Its chapter copy is written and marked complete in
`src/content/product-risk-assessment-platform.ts`, and both artifacts are in the repo. This is the
first tier 2 product, so it is also where the shared chapter renderer learns to run without a
masthead.

## What Changes

- Add the Risk Assessment Platform tier 2 chapter at `/portfolio/whitehawk/risk-assessment-platform`,
  built from the drafted copy and the two assets under
  `src/assets/portfolio/case-studies/whitehawk/products/risk-assessment-platform/`.
- Make `masthead` optional on `ProductChapter`. A chapter without one renders its blocks directly
  under the title. Tier 1 keeps the same type scale, so tier 2 reads as lighter through structure
  rather than through smaller headings.
- Render four blocks: Specimen, Provenance, Field Guide, Later Observations. Artifact 1 sits inside
  Specimen after its prose, artifact 2 inside Field Guide.
- Retire the `client-a` stub: delete its page, replace its router entry, and let
  `/portfolio/whitehawk/client-a` fall through to the not-found page rather than redirect. This
  follows the precedent set when `platform`, `engage`, and `comply` were retired.
- Rename the fourth `PRODUCTS` entry to `Risk Assessment Platform` with id
  `risk-assessment-platform` and its real thumbnail.
- Amend `src/content/products-template.md`: tier 2 may carry a Provenance block, and its word budget
  widens when it does.

Before, tier 1 only:

```ts
export interface ProductChapter {
  masthead: { specimen: string; hypothesis: string; provenance: string; hero: ArtifactSlot }
  blocks: Array<ChapterBlock>
}
```

After, tier 2 is the absence of a masthead:

```ts
export interface ProductChapter {
  // Tier 1 only. A chapter without one is tier 2: its blocks start under the title.
  masthead?: { specimen: string; hypothesis: string; provenance: string; hero: ArtifactSlot }
  blocks: Array<ChapterBlock>
}
```

## Capabilities

### New Capabilities

- `whitehawk-risk-assessment-platform-page`: The first tier 2 product chapter. Covers its route,
  its typed content module, its four blocks, and the two artifacts mapped to them.

### Modified Capabilities

- `product-chapter`: `masthead` becomes optional, which makes tier 2 renderable by the existing
  component set. Tier 1 block order and the masthead requirement both need restating to say the
  masthead is conditional.
- `whitehawk-products-section`: the fourth entry is now a named product with a real thumbnail
  rather than a `Client A` placeholder, so only the fifth entry stays `null`.
- `whitehawk-product-stub-pages`: one stub remains, not two. `/portfolio/whitehawk/client-a` joins
  the retired URLs that fall through to not-found.

## Non-goals

- No tier field, no `tier: 1 | 2` discriminator. Tier 2 is inferred from the absent masthead.
- No smaller type scale for tier 2. `BaseT1` title and `BaseT2` block headings stay as they are.
- No new component. `ChapterBlock` and `ChapterArtifact` already cover everything this page needs.
- No change to the `client-b` stub. The TPRM platform chapter is a separate change.
- No edits to the drafted copy beyond lifting it out of comments into typed constants.
- No lightbox, zoom, or interaction on the artifacts.

## Impact

Schema and shared renderer:

- `src/content/products.ts`: `masthead` optional; `PRODUCTS` fourth entry replaced.
- `src/components/portfolio/products/ProductChapter.tsx`: guard the masthead render.

New files:

- `src/content/product-risk-assessment-platform.ts`: replaces its own commented draft.
- `src/pages/portfolio/whitehawk/risk-assessment-platform/index.tsx`.

Removed:

- `src/pages/portfolio/whitehawk/client-a/index.tsx`.

Routing:

- `src/App.tsx`: `client-a` route and import swapped for `risk-assessment-platform`.

Docs:

- `src/content/products-template.md`: tier 2 section amended.

No new dependencies. The three shipped tier 1 chapters render unchanged, since they all still
supply a masthead.
