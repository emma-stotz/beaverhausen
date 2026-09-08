## 1. Data

- [x] 1.1 Add `Product` interface and `PRODUCTS` array (5 entries, `thumbnail: null`) to
      `src/content/case-study-whitehawk.ts`

## 2. Products Grid Component

- [x] 2.1 Create `src/components/portfolio/whitehawk/WhiteHawkProducts.tsx` -- renders a responsive
      grid of five `BaseCard` entries, each wrapping an `AppLink` to
      `/portfolio/whitehawk/<id>`, with a thumbnail area (placeholder grey rect when
      `thumbnail` is null, `<img>` when non-null) and product name via `AutoH` inside
      `AutoHProvider`
- [x] 2.2 Add `id="whitehawk-products"` to the section wrapper inside `WhiteHawkProducts` so
      the scroll cue can target it

## 3. WhiteHawk Page Composition

- [x] 3.1 In `src/pages/portfolio/whitehawk/index.tsx`, add the inline scroll cue `<button>`
      between `WhiteHawkCaseStudy` and `WhiteHawkProducts` -- matching Hero markup (`BaseT6`
      "scroll" label + animated `iron-orange` line), clicking smooth-scrolls to
      `#whitehawk-products`
- [x] 3.2 Add `<WhiteHawkProducts />` below the scroll cue
- [x] 3.3 Move `<CaseStudyNav />` to below `<WhiteHawkProducts />`

## 4. Stub Pages

- [x] 4.1 Create `src/pages/portfolio/whitehawk/platform/index.tsx` -- stub page with product name
      heading and an `AppLink` back to `/portfolio/whitehawk`
- [x] 4.2 Create `src/pages/portfolio/whitehawk/engage/index.tsx` (same pattern)
- [x] 4.3 Create `src/pages/portfolio/whitehawk/comply/index.tsx` (same pattern)
- [x] 4.4 Create `src/pages/portfolio/whitehawk/client-a/index.tsx` (same pattern)
- [x] 4.5 Create `src/pages/portfolio/whitehawk/client-b/index.tsx` (same pattern)

## 5. Routing

- [x] 5.1 In `src/App.tsx`, add five flat route entries under the root router array:
      `/portfolio/whitehawk/platform`, `/portfolio/whitehawk/engage`,
      `/portfolio/whitehawk/comply`, `/portfolio/whitehawk/client-a`,
      `/portfolio/whitehawk/client-b`, each pointing to its stub page component

## 6. Formatting and Verification

- [x] 6.1 Run `oxfmt --write` and resolve any lint/format issues
- [x] 6.2 Run `tsc -b` and confirm zero type errors
- [x] 6.3 Smoke-test locally: confirmed `/portfolio/whitehawk`, `/portfolio/whitehawk/platform`,
      and `/portfolio/whitehawk/client-a` resolve with 200 via dev server. Visual verification
      (grid rendering, scroll cue, transition animation) needs manual browser check -- no browser
      tooling available in this environment
