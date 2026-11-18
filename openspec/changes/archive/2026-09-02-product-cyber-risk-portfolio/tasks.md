## 1. Chapter content

- [x] 1.1 Rewrite `src/content/product-cyber-risk-portfolio.ts` as a typed `CYBER_RISK_PORTFOLIO:
    ProductChapter`, following `src/content/product-cyber-risk-rating.ts`. Title "Cyber Risk
      Portfolio", subtitle "Where Risk Concentrates", the three masthead entries, and three blocks
      (Field Guide, Divergence, Later Observations) plus the field note, copied verbatim from the
      draft comments. Drop the trailing "Artifact plan" and "Captions" sections; they are author
      notes. Confirm no em-dashes survive transcription.
- [x] 1.2 Import the six chapter assets in the same module and wire them into the five slots per the
      table in the spec, each at `width: 'lg'`, with the drafted captions and written alt text.
- [x] 1.3 Make moment 2 a `pair` with `cyber_risk_rating-component_lib.png` first and
      `portfolio_report-component_lib.png` second, without `stacked`, so it renders side by side at
      `md` and wider.
- [x] 1.4 Place each artifact directly after the sentence it illustrates in its block's `content`
      array.

## 2. Page and route

- [x] 2.1 Add `src/pages/portfolio/whitehawk/cyber-risk-portfolio/index.tsx`: `CaseStudyLayout`
      wrapping `<ProductChapter chapter={CYBER_RISK_PORTFOLIO} />`, no local state.
- [x] 2.2 In `src/App.tsx`, replace the `engage` route and import with
      `/portfolio/whitehawk/cyber-risk-portfolio`.
- [x] 2.3 Delete `src/pages/portfolio/whitehawk/engage/index.tsx`.

## 3. Products grid entry

- [x] 3.1 In `src/content/products.ts`, change the second `PRODUCTS` entry to
      `{ id: 'cyber-risk-portfolio', name: 'Cyber Risk Portfolio', thumbnail: <imported thumbnail> }`
      using `portfolio_report-thumbnail.png`.
- [x] 3.2 Confirm the remaining three entries still render placeholders at the same dimensions.

## 4. Verify the capability held

- [x] 4.1 Confirm the diff touches no file under `src/components/portfolio/products/` and no type in
      `src/content/products.ts` beyond the `PRODUCTS` entry. If any shared component or type needed
      changing, stop and report it rather than editing it inside this change.

## 5. Checks

- [x] 5.1 Format and lint only the files this change touched: `pnpm exec oxfmt <paths>` and
      `pnpm exec eslint <paths>`. Do not run the repo-wide `pnpm run format` or `lint --fix`.
- [x] 5.2 `pnpm build` (`tsc -b && vite build`) passes.
- [x] 5.3 Load `/portfolio/whitehawk/cyber-risk-portfolio` and check: six images render, all five
      captions are present and non-empty, the back link fires the water transition.
- [x] 5.4 Judge moment 2 at desktop width. If either half of the pair is illegible at half width, set
      `stacked: true` on that slot.
- [x] 5.5 Judge the supplier selection table (moment 4) and the cumulative annual risk bar (moment 5)
      at `lg`. Raise either to `xl` if it is not legible at published size.
- [x] 5.6 At a narrow viewport, confirm the pair stacks with the Cyber Risk Rating gauge on top and
      the page has no horizontal scroll. Check the same in dark mode.
- [x] 5.7 Confirm `/portfolio/whitehawk` shows the Cyber Risk Portfolio thumbnail and that its entry
      navigates to the new route.
