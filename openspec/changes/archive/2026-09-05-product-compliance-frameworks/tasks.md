## 1. Chapter content

- [x] 1.1 Rewrite `src/content/product-compliance-frameworks.ts` as a typed `COMPLIANCE_FRAMEWORKS:
    ProductChapter`, following the two shipped chapters. Title "Compliance Frameworks", subtitle
      "Shared Language, Different Rules", the three masthead entries, and three blocks (Field Guide,
      Divergence, Later Observations) plus the field note, copied verbatim from the draft comments.
      Drop the trailing "Artifacts" table and "Captions" list, and the alternate heading "Structure
      Carries Meaning"; they are author notes. Confirm no em-dashes survive transcription.
- [x] 1.2 Import the six chapter assets in the same module and wire them into the four slots per the
      table in the spec, each at `width: 'lg'`, with the drafted captions and written alt text.
- [x] 1.3 Make moments 2 and 4 `pair` slots, each with the CMMC file first and the Essential 8 file
      second, neither `stacked`, so both render side by side at `md` and wider.
- [x] 1.4 Leave Later Observations as prose only, with no artifact slot.
- [x] 1.5 Place each artifact directly after the prose it illustrates in its block's `content` array.

## 2. Page and route

- [x] 2.1 Add `src/pages/portfolio/whitehawk/compliance-frameworks/index.tsx`: `CaseStudyLayout`
      wrapping `<ProductChapter chapter={COMPLIANCE_FRAMEWORKS} />`, no local state.
- [x] 2.2 In `src/App.tsx`, replace the `comply` route and import with
      `/portfolio/whitehawk/compliance-frameworks`.
- [x] 2.3 Delete `src/pages/portfolio/whitehawk/comply/index.tsx`.

## 3. Products grid entry

- [x] 3.1 In `src/content/products.ts`, change the third `PRODUCTS` entry to
      `{ id: 'compliance-frameworks', name: 'Compliance Frameworks', thumbnail: <imported thumbnail> }`
      using `frameworks_thumbnail.png`.
- [x] 3.2 Confirm the remaining two entries still render placeholders at the same dimensions.

## 4. Verify the capability held

- [x] 4.1 Confirm the diff touches no file under `src/components/portfolio/products/` and no type in
      `src/content/products.ts` beyond the `PRODUCTS` entry. If any shared component or type needed
      changing, stop and report it rather than editing it inside this change.

## 5. Checks

- [x] 5.1 Format and lint only the files this change touched: `pnpm exec oxfmt <paths>` and
      `pnpm exec eslint <paths>`. Do not run the repo-wide `pnpm run format` or `lint --fix`.
- [x] 5.2 `pnpm build` (`tsc -b && vite build`) passes.
- [x] 5.3 Load `/portfolio/whitehawk/compliance-frameworks` and check: six images render, all four
      captions are present and non-empty, the back link fires the water transition.
- [x] 5.4 Judge both pairs at desktop width. If either half of either pair is illegible at half width,
      set `stacked: true` on that slot.
- [x] 5.5 Judge the hero (moment 1) and the maturity columns (moment 3) at `lg`. Raise either to `xl`
      if it is not legible at published size.
- [x] 5.6 At a narrow viewport, confirm both pairs stack with CMMC on top and the page has no
      horizontal scroll. Check the same in dark mode.
- [x] 5.7 Confirm `/portfolio/whitehawk` shows the Compliance Frameworks thumbnail and that its entry
      navigates to the new route.
