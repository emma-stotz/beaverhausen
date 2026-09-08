## 1. Make the masthead optional

- [x] 1.1 In `src/content/products.ts`, change `masthead` on `ProductChapter` to optional and comment
      it as tier 1 only, with a chapter that omits it being tier 2
- [x] 1.2 In `src/components/portfolio/products/ChapterMasthead.tsx`, change the prop type to
      `NonNullable<ProductChapter['masthead']>`
- [x] 1.3 In `src/components/portfolio/products/ProductChapter.tsx`, guard the masthead render with
      `{chapter.masthead && ...}`
- [x] 1.4 Run `pnpm run check` and confirm the three tier 1 content modules still type check
      unchanged

## 2. Content module

- [x] 2.1 In `src/content/product-risk-assessment-platform.ts`, replace the commented draft with an
      exported `RISK_ASSESSMENT_PLATFORM: ProductChapter`, importing both assets through `@/`
- [x] 2.2 Set `title: 'Risk Assessment Platform'` and `subtitle: 'The Shape of Progress'`, and omit
      `masthead`
- [x] 2.3 Add the four blocks in order: Specimen, Provenance, Field Guide, Later Observations, with
      the drafted prose transferred verbatim
- [x] 2.4 Add artifact 1 (`product-risk-assessment-platform_1.png`) as a `single` slot at `xl` inside
      the Specimen block, after its prose, carrying caption 1
- [x] 2.5 Add artifact 2 (`product-risk-assessment-platform_2.png`) as a `single` slot at `xl` inside
      the Field Guide block, carrying caption 2
- [x] 2.6 Write alt text for both artifacts describing interface elements and states only, naming no
      client or product brand
- [x] 2.7 Set `fieldNote` from the drafted field note with the `**Field note**:` prefix and its
      trailing space stripped, since `FieldNote` renders that label itself
- [x] 2.8 Confirm no commented copy, no artifact plan table, and no em dashes remain in the file

## 3. Page and route

- [x] 3.1 Create `src/pages/portfolio/whitehawk/risk-assessment-platform/index.tsx` composing
      `CaseStudyLayout` and `ProductChapter` with `RISK_ASSESSMENT_PLATFORM`, holding no logic
- [x] 3.2 In `src/App.tsx`, swap the `client-a` import and route entry for
      `/portfolio/whitehawk/risk-assessment-platform`
- [x] 3.3 Delete `src/pages/portfolio/whitehawk/client-a/index.tsx` and its directory, now that
      nothing imports it

## 4. Products grid

- [x] 4.1 In `src/content/products.ts`, import
      `product-risk-assessment-platform_thumbnail.png` and replace the `client-a` entry with
      `{ id: 'risk-assessment-platform', name: 'Risk Assessment Platform', thumbnail: ... }`, keeping
      it fourth
- [x] 4.2 Confirm `client-b` stays the only `thumbnail: null` entry and the grid still shows five
      entries

## 5. Template (done ahead of apply)

- [x] 5.1 In `src/content/products-template.md`, amend the tier 2 section so it no longer asserts
      three blocks, a smaller title, or that tier 2 makes no survivor claim; add the Provenance block
      description and widen the word budget to 450 for the chapter that carries it
- [x] 5.2 Update the "Tier 2 uses three" line and the "drops Provenance" line under Section names
- [x] 5.3 Point the Leadership proof section at Risk Assessment Platform, since Cyber Risk
      Portfolio's Provenance is sole ownership plus an inherited component library and never carried
      the proof; keep the one-chapter rule
- [x] 5.4 Move the leadership label off the Cyber Risk Portfolio row in the tier 1 chapter map and
      onto the tier 2 row for the 42-question assessment

## 6. Verify

- [x] 6.1 Run `pnpm run format`, then `pnpm run lint --fix`, then `pnpm run build`
- [x] 6.2 In the browser, load `/portfolio/whitehawk/risk-assessment-platform` and confirm block
      order, no masthead, no hero above the first block, and both artifacts with captions
- [x] 6.3 Confirm artifact 1's question text and "Last answered by" lines are legible at desktop
      width; if `xl` reads as a dead scroll rather than evidence, note it and revisit the width
      requirement in the spec before changing it
- [x] 6.4 Check the page at 320px, tablet, and desktop for horizontal page scroll
- [x] 6.5 Check the chapter in dark mode: headings `iron-orange`, body `enamel`, captions `cream`
- [x] 6.6 Confirm `/portfolio/whitehawk/client-a` renders the not-found page and does not redirect
- [x] 6.7 Confirm the products grid shows `Risk Assessment Platform` fourth with its thumbnail, and
      that clicking it fires the water transition into the chapter
- [x] 6.8 Confirm the three tier 1 chapters render unchanged, mastheads and heroes intact
