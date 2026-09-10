## 1. The toggle slot kind

- [ ] 1.1 In `src/content/products.ts`, add the `toggle` variant to `ArtifactSlot` with `rest`,
      `active`, `label`, `caption`, and optional `width`, commented as two states of one screen
- [ ] 1.2 Run `pnpm run check` and confirm the four shipped content modules still type check, and
      that `ChapterArtifact` now fails exhaustiveness or falls through, whichever the code shape gives

## 2. The toggle component

- [ ] 2.1 Create `src/components/portfolio/products/ChapterArtifactToggle.tsx`: a button of type
      button wrapping two absolutely stacked frames, with visible state `latched || hovering`
- [ ] 2.2 Wire hover to preview only (`onPointerEnter`/`onPointerLeave`) and click plus Enter plus
      Space to latch, letting the native button supply the keyboard half
- [ ] 2.3 Set `aria-pressed` from the latch alone, never from hover; give the button its accessible
      name from `label`
- [ ] 2.4 Keep non-empty `alt` on both layers and set `aria-hidden` on whichever layer is not visible
- [ ] 2.5 Reset the button's default chrome to nothing; add only a `focus-visible` ring in
      `iron-orange`
- [ ] 2.6 Reserve the frame height so the swap cannot reflow the page, and cross-fade with the
      `--duration-interaction` and `--ease-out-cubic` tokens
- [ ] 2.7 Zero the transition under `prefers-reduced-motion: reduce`
- [ ] 2.8 Dispatch `kind === 'toggle'` to the new component from
      `src/components/portfolio/products/ChapterArtifact.tsx`, leaving `single` and `pair` untouched
- [ ] 2.9 Run `pnpm run check` and `pnpm run lint`

## 3. Content module

- [ ] 3.1 In `src/content/product-tprm-platform.ts`, replace the commented draft with an exported
      `TPRM_PLATFORM: ProductChapter`, importing all three chapter assets through `@/`
- [ ] 3.2 Set the title to Third Party Risk Management Platform and the subtitle to History Depends
      on Identity, and omit `masthead`
- [ ] 3.3 Add the three blocks in order: Specimen, Field Guide, Later Observations, with the drafted
      prose transferred verbatim including the "dissolved its third-party risk management team" clause
- [ ] 3.4 Add artifact 1 (`tprm_1.png`) as a `single` slot at `xl` inside the Specimen block, after
      its prose, carrying caption 1
- [ ] 3.5 Add artifact 2 as a `toggle` slot at `xl` inside the Field Guide block, with
      `tprm_2_rest.png` as rest and `tprm_2_hovered.png` as active, carrying caption 2
- [ ] 3.6 Write the toggle's `label` so it names the action and the Overall Grade series, not the
      chart's appearance
- [ ] 3.7 Write alt text for all three images describing interface elements, counts, and states only,
      naming no client, vendor, or ratings provider
- [ ] 3.8 Set `fieldNote` from the drafted field note with the `**Field note**:` prefix and its
      trailing space stripped
- [ ] 3.9 Confirm no commented copy, no artifact plan table, and no em dashes remain in the file

## 4. Page and route

- [ ] 4.1 Create `src/pages/portfolio/whitehawk/tprm-platform/index.tsx` composing `CaseStudyLayout`
      and `ProductChapter` with `TPRM_PLATFORM`, holding no logic
- [ ] 4.2 In `src/App.tsx`, swap the `client-b` import and route entry for
      `/portfolio/whitehawk/tprm-platform`
- [ ] 4.3 Delete `src/pages/portfolio/whitehawk/client-b/index.tsx` and its directory, now that
      nothing imports it

## 5. Products grid

- [ ] 5.1 In `src/content/products.ts`, import `tprm_thumbnail.png` and replace the `client-b` entry
      with `{ id: 'tprm-platform', name: 'Third Party Risk Management Platform', thumbnail: ... }`,
      keeping it fifth
- [ ] 5.2 Confirm no entry has `thumbnail: null` and the `null` branch in `WhiteHawkProducts` is left
      in place as the documented fallback
- [ ] 5.3 Check the grid at `lg` and below: the longest name now has four words and must not break
      the five-column layout

## 6. Verify

- [ ] 6.1 Run `pnpm run format` scoped to the files touched, then `pnpm run lint --fix`, then
      `pnpm run build`
- [ ] 6.2 In the browser, load `/portfolio/whitehawk/tprm-platform` and confirm block order, no
      masthead, and both artifacts with captions
- [ ] 6.3 Toggle artifact 2 with the mouse: hover previews, pointer-out returns to rest, click
      latches, hovering a latched toggle does not unlatch it, second click unlatches
- [ ] 6.4 Toggle artifact 2 with the keyboard: Tab reaches it with a visible `iron-orange` ring,
      Enter and Space both switch state, and a mouse click leaves no ring
- [ ] 6.5 Confirm `aria-pressed` tracks the latch and not hover, and that only the visible layer is
      exposed to the accessibility tree
- [ ] 6.6 Emulate a touch device with no hover and confirm tap latches and untaps
- [ ] 6.7 Confirm the frame height does not change on toggle, so nothing below it moves
- [ ] 6.8 Confirm the swap is instant under `prefers-reduced-motion: reduce`
- [ ] 6.9 Judge whether the chart at `xl` reads as large or as blurry, and whether the hover preview
      reads as a preview or a flicker; report both rather than silently changing the spec
- [ ] 6.10 Check the page at 320px, tablet, and desktop for horizontal page scroll
- [ ] 6.11 Check the chapter in dark mode: headings `iron-orange`, body `enamel`, captions `cream`
- [ ] 6.12 Confirm `/portfolio/whitehawk/client-b` renders the not-found page and does not redirect,
      and that the four earlier retired slugs still do the same
- [ ] 6.13 Confirm the products grid shows all five named with thumbnails and no placeholder, and
      that the fifth entry's water transition reaches the chapter
- [ ] 6.14 Confirm the four earlier chapters render unchanged, mastheads and artifacts intact
