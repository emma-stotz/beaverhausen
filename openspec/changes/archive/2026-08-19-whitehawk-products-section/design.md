## Context

The WhiteHawk case study page (`/portfolio/whitehawk`) consists of `CaseStudyLayout` wrapping a
`<main>` that contains two children: `WhiteHawkCaseStudy` (the flipbook + decorative images) and
`CaseStudyNav` (prev/next). The page scrolls natively -- no scroll-jacking, no `ScrollTrigger`
pins, no `overflow:hidden` containers. GSAP on this page is limited to the flipbook's 3D flip
timeline, triggered by button clicks only.

The `<main>` constrains to `max-w-7xl mx-auto`. The flipbook constrains itself to `max-w-3xl`
internally. `CaseStudyNav` constrains to `max-w-3xl`.

`BaseCard` (`src/components/primitives/BaseCard.tsx`) exists: `rounded-lg border border-beaver/10
bg-cream/80 shadow-sm backdrop-blur-sm dark:bg-dusk/80`.

The Hero scroll cue is an inline `<button>` with `BaseT6` label and an animated `iron-orange` line.
It is not a component -- the pattern will be replicated inline in the page.

## Goals / Non-Goals

**Goals:**

- Insert products grid and scroll cue with minimal structural churn to the WhiteHawk page
- Keep the products data in the same content file as chapters, following established conventions
- Make placeholder thumbnails trivially swappable (a single `src` field per product)
- Ensure all five product links go through `TransitionLink` for the water-fill transition

**Non-Goals:**

- Individual product page content or layout
- A reusable products grid primitive
- Any animation beyond what the Hero scroll cue already does

## Decisions

### Data shape: `PRODUCTS` array in `src/content/case-study-whitehawk.ts`

```ts
export interface Product {
  id: string // kebab-case slug, used as route segment
  name: string // display name -- placeholder until finalised
  thumbnail: string | null // import path or null for placeholder
}

export const PRODUCTS: Product[] = [
  { id: 'platform', name: 'Platform', thumbnail: null },
  { id: 'engage', name: 'Engage', thumbnail: null },
  { id: 'comply', name: 'Comply', thumbnail: null },
  { id: 'client-a', name: 'Client A', thumbnail: null }, // anonymised
  { id: 'client-b', name: 'Client B', thumbnail: null }, // anonymised
]
```

Follows the `CHAPTERS` / `CHAPTER_COPY` pattern in the same file: a named typed array export.
`thumbnail: null` signals "use placeholder" -- swapping to a real asset is one field change.

**Alternatives considered:**

- Separate `src/content/products-whitehawk.ts`: unnecessary split for five items that are
  logically part of the same case study.
- `thumbnail` as an imported SVG/PNG at the content layer: forces asset imports into content files.
  Keeping it as a path string or null lets `WhiteHawkProducts` own the rendering logic and the
  placeholder fallback.

### Component: `WhiteHawkProducts.tsx` (products grid only)

A new component at `src/components/portfolio/whitehawk/WhiteHawkProducts.tsx`. It renders the grid
of five `BaseCard` entries. Each card wraps an `AppLink` to `/portfolio/whitehawk/<id>`.

The scroll cue is NOT in this component. It is inlined in the page (`index.tsx`) at the position
currently held by `CaseStudyNav`, so it inherits all of `CaseStudyNav`'s spacing without further
adjustment.

**Alternatives considered:**

- Inlining the grid in the page: the page would exceed "pages are thin". Five cards with
  placeholder logic warrants extraction.
- Including the scroll cue in `WhiteHawkProducts`: the cue belongs between flipbook and products,
  and keeping it in the page co-locates it with its siblings for easy reordering.

### Page structure after this change

```
CaseStudyLayout
  <main max-w-7xl>
    WhiteHawkCaseStudy        (unchanged)
    <button> scroll cue       (new, inline, matching Hero pattern)
    WhiteHawkProducts         (new)
    CaseStudyNav              (moved below products)
```

The scroll cue `<button>` sits where `CaseStudyNav` currently sits, so existing responsive margins
and padding apply without adjustment.

### Routing: five flat sibling routes

Five new routes added to the root `createBrowserRouter` array in `App.tsx` as flat siblings of
`/portfolio/whitehawk`:

```ts
{ path: '/portfolio/whitehawk/platform',  element: <WhiteHawkProductPage name="Platform" /> },
{ path: '/portfolio/whitehawk/engage',    element: <WhiteHawkProductPage name="Engage" /> },
// etc.
```

A single stub component (`WhiteHawkProductPage`) takes a `name` prop and renders a placeholder.

**Alternatives considered:**

- Nested routes under `/portfolio/whitehawk`: React Router nested routes require a parent route to
  render `<Outlet>`, which would change the existing WhiteHawk page. Flat routes require zero
  changes to the parent.
- Dynamic route `/portfolio/whitehawk/:product`: avoids listing five routes but requires a lookup
  - 404 handling for unknown slugs. Overkill for five known pages.

### Scroll cue: inline `<button>`, Hero pattern

Reuse Hero's markup verbatim: `BaseT6` "scroll" label + `iron-orange` animated line. Omit Hero's
`opacity` fade (the cue is always visible here). Clicking scrolls to the products section via
`document.getElementById('whitehawk-products')?.scrollIntoView({ behavior: 'smooth' })`.

## Risks / Trade-offs

- **Placeholder names ("Client A", "Client B") in source** -- these are clearly marked as
  placeholders in the data file; they will need updating before the page goes public. Not a
  technical risk, just a content reminder.
- **Thumbnail placeholder visual** -- a grey box with `aspect-video` will do. If the viewport
  width is narrow the grid collapses gracefully with responsive `grid-cols`.
- **Flat routing adds boilerplate** -- five near-identical route entries and five stub files. The
  alternative (dynamic route) adds complexity for no present gain.

## Open Questions

_(none -- all ambiguities resolved by the audit and user clarifications)_
