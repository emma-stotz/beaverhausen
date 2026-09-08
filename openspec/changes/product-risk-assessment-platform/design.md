## Context

Three tier 1 product chapters ship today. Each supplies a required `masthead` (Specimen, Working
Hypothesis, Provenance, plus a hero artifact) and its blocks below that. `ProductChapter` in
`src/content/products.ts` types this, and four components in
`src/components/portfolio/products/` render it.

Risk Assessment Platform is the first tier 2 chapter. Per `src/content/products-template.md`, tier 2
is shorter, single column, and carries no hero container. Its copy is drafted and marked complete in
the comments of `src/content/product-risk-assessment-platform.ts`, along with an artifact plan table
and two captions. Two assets and a thumbnail are already in the repo.

It replaces the `client-a` stub, following the same path `platform`, `engage`, and `comply` took when
their chapters shipped: delete the stub page, swap the router entry, let the old URL fall through.

Constraints that shaped this design:

- Every artifact needs a caption and must be legible at published size. Both are template
  non-negotiables, and `caption` is already enforced by the type.
- The client cannot be named. The two screenshots are already anonymized with placeholder
  contributor names and a neutral palette.
- The tier 2 copy carries a Provenance block, which the template's tier 2 shape does not currently
  allow. The content file is the newer decision, so the template moves.
- The template names Cyber Risk Portfolio as the leadership chapter. That chapter's Provenance is
  sole ownership and an inherited component library, so it never carried the proof and no shipped
  chapter does. This chapter is where the evidence actually is, and the template is corrected to say
  so.

## Goals / Non-Goals

**Goals:**

- Render the drafted chapter at `/portfolio/whitehawk/risk-assessment-platform` with both artifacts.
- Teach the existing renderer to run without a masthead, with no new component and no change to how
  tier 1 renders.
- Retire the `client-a` stub cleanly.
- Bring `products-template.md` back in line with what tier 2 actually is.

**Non-Goals:**

- No `tier` discriminator field.
- No second type scale for tier 2.
- No new component, block kind, or layout primitive.
- No touching the `client-b` stub.
- No rewriting the drafted copy. It moves from comments into typed constants, with only the
  mechanical edits noted below.

## Decisions

### Tier 2 is the absence of a masthead

`masthead` becomes optional on `ProductChapter`. `ProductChapter.tsx` guards the render:

```tsx
{chapter.masthead && <ChapterMasthead masthead={chapter.masthead} />}
```

`ChapterMasthead`'s prop type becomes `NonNullable<Chapter['masthead']>` so the guard does the
narrowing and the component keeps a non-optional prop.

That is the whole schema change. A tier 2 chapter is a title, blocks, and a field note, and `blocks`
already handles interleaved prose and artifacts, so Specimen and Provenance are ordinary blocks.

_Alternative considered:_ an explicit `tier?: 1 | 2` field. Rejected as a second source of truth for
the same fact. A `tier: 2` chapter that also supplied a masthead would be a contradiction the type
system would not catch, and the renderer would still have to branch on the masthead anyway.

_Alternative considered:_ a separate `Tier2Chapter` type and renderer. Rejected: the blocks, the
artifacts, the field note, and the back link are all identical, so a second renderer would be the
same file with one section removed.

### Tier 1 and tier 2 share the type scale

`BaseT1` title, `BaseT2` block headings, both tiers. The template asks for a smaller title, but the
missing masthead and the shorter page already read as lighter weight, and a second scale means every
type decision in the chapter components grows a branch. The difference in weight is structural.

_Alternative considered:_ dropping tier 2 to `BaseT2` title and `BaseT3` block headings. Rejected for
the branch cost, and because `BaseT3` is already the masthead subhead scale, so a tier 2 block
heading would visually rank below a tier 1 masthead entry that carries less content.

### Spacing needs no change

The masthead, blocks, and field note already share one `space-y-16` container with `mt-12` above it.
Removing one child from a `space-y` container leaves the remaining gaps intact, so the title-to-first
block gap and the block-to-block gaps come out right without a spacing rule for tier 2.

### Artifact 1 sits inside Specimen, after its prose

The draft's artifact plan labels artifact 1 "Masthead", but tier 2 has no masthead. Putting it inside
the Specimen block after the paragraph keeps the rule that a sentence sits directly above the
artifact it describes, and needs no schema field at all.

_Alternative considered:_ a top-level lead artifact slot above the first block. Rejected: it is a new
optional schema field to reproduce something a block already does, and it reintroduces a hero in
everything but name.

### Both artifacts use the `xl` width

Artifact 1 is 1318x2228, artifact 2 is 1318x347. The default `md` width is 768px, which scales
artifact 1's body text to roughly 58% and makes the question text and the "Last answered by" lines
unreadable. `xl` fills the chapter column at close to native scale.

The consequence is that artifact 1 renders roughly 2100px tall. That is accepted rather than cropped:
the whole section in one frame is exactly what the Field Guide block argues for, and a crop would cut
the point out of the evidence.

### Copy moves with three mechanical edits

The drafted copy transfers verbatim except:

1. The title splits into `title: 'Risk Assessment Platform'` and
   `subtitle: 'The Shape of Progress'`, matching the other three chapters.
2. The `**Field note**: ` prefix is stripped. `FieldNote` renders that label itself, and `Paragraph`
   only converts `*single asterisk*` markers to `<em>`, so `**double**` would render as stray
   asterisks.
3. The artifact plan table and the two captions move from comments into `ArtifactSlot` data.

Alt text is written fresh, since the draft has none. It describes interface elements and states only,
with no client or product brand.

### The retired URL falls through, no redirect

`/portfolio/whitehawk/client-a` gets no redirect, matching what `platform`, `engage`, and `comply`
already do. The stub was never a public URL anyone bookmarked, and a redirect from an internal
placeholder id to a real product name would outlive its usefulness immediately.

## Risks / Trade-offs

**Artifact 1 is a very tall image, roughly 2100px at `xl`.** → Legibility is the non-negotiable and
the height is the honest cost. Checked in the browser at desktop, tablet, and 320px during
implementation; if it reads as a dead scroll rather than as evidence, `lg` is the fallback and the
spec's width requirement is the thing to revisit.

**`masthead` going optional silently reclassifies any chapter that loses it.** → Only four chapters
exist and all three tier 1 modules keep their masthead. A chapter accidentally missing one renders
without its hero and three subheads, which is immediately visible on the page rather than a silent
wrong result.

**The chapter runs about 445 words against the tier 2 budget of 250 to 350.** → The Provenance block
accounts for the overage and the template is amended in the same change, so the budget and the page
agree when this lands. Worth watching if a second tier 2 chapter also wants Provenance, since two of
two would mean the tier 2 shape is really four blocks.

**The template named Cyber Risk Portfolio as the leadership chapter, but that chapter does not carry
leadership proof.** → Its Provenance describes sole ownership of the frontend and an inherited
component library, not a team, an estimate, or a standard others built against. No shipped chapter
carries it. So this is the only leadership chapter, not a second one, and the template's Leadership
proof section is corrected to point here in this change. The one-chapter rule still holds.

## Migration Plan

Ordered so every commit builds green, per the repo's one-reviewable-thing rule:

1. `masthead` optional in `src/content/products.ts`, with the `ProductChapter.tsx` and
   `ChapterMasthead.tsx` guard. Nothing consumes it yet; the three tier 1 chapters are untouched.
2. The content module: draft comments out, `RISK_ASSESSMENT_PLATFORM` in.
3. The new page component.
4. The router entry, swapping `client-a` for `risk-assessment-platform`.
5. Delete `src/pages/portfolio/whitehawk/client-a/index.tsx`, now that nothing imports it.
6. `PRODUCTS`: the fourth entry renamed, re-id'd, and given its thumbnail.
7. `products-template.md`.

Rollback is `git revert`. There is no data, no migration, and no build step outside `tsc -b && vite
build`.

## Open Questions

None blocking. The one thing to settle in the browser rather than on paper is whether artifact 1 at
`xl` reads as evidence or as a dead scroll.
