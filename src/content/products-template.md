# Product Case Study Template

For the product chapters sitting beneath the WhiteHawk brand flipbook.

Portfolio weighting: product design engineering, with one chapter carrying leadership proof.

---

## Section names

The flipbook's field-note register carries down into the product chapters.

| Tier 1                 | What the block does                                         |
| ---------------------- | ----------------------------------------------------------- |
| **Specimen**           | The product, who uses it, what makes it hard                |
| **Working Hypothesis** | Your claim about how this class of problem should be solved |
| **Provenance**         | What you owned, what you inherited, what was someone else's |
| **Field Guide**        | The reusable method                                         |
| **Divergence**         | The trade-off, the constraint, or the argument you lost     |
| **Later Observations** | What shipped, and what you would change                     |
| **Field note**         | The closing aside, matching the flipbook                    |

Tier 2 uses three: **Specimen**, **Field Guide**, **Later Observations**. It adds **Provenance** in the one chapter that carries the leadership proof.

**Field Guide means the same thing everywhere:** the reusable method, whatever in this chapter would transfer to another company's codebase. In Cyber Risk Rating that is the translation rules; in Portfolio it will be the component architecture and tokens; in a tier 2 exploration it is the form architecture or the IA. The name holds because the job holds.

Where tier 2 drops Provenance, its Specimen block absorbs one sentence of ownership. Where it keeps Provenance, Specimen stays about the product and the ownership sentence is unnecessary.

Six quiet nouns is the ceiling.

---

## Full template (tier 1)

### Block 0: Title

`[Product name]: [the claim, not the category]`

Not "Cyber Risk Portfolio." Closer to "Cyber Risk Portfolio: One Language, Many Companies." The title says what the work argued, the way "Shaping the Agentic Experience" does. `<BaseT1>`.

---

### Block 1: Masthead stack

Three small-subhead paragraphs in a left column, one hero artifact on the right. 50 to 65 words each. `<BaseT3>`.

**1a. Specimen.** The product in two sentences: who uses it, what they are trying to do, and the one thing that makes it hard. Skip company background; the flipbook above already did that.

> If a user opens this and it works, what just got easier for them?

**1b. Working hypothesis.** Your point of view on how this class of problem should be solved. One claim someone could disagree with. This is the slot her "logic before aesthetics" fills, and it does the most hiring work on the page.

For your weighting, the claim should live at the seam between design and build: a component's states are a design problem before they are an engineering one; a data-dense report is a typography problem before it is a virtualization problem.

> What did you believe about this problem that the last person to touch it did not?

**1c. Provenance.** What you owned, stated as decisions rather than tasks. Stack, surfaces touched, rough duration, team size. Be concrete about the boundary: what was yours, what was someone else's.

Keep the "we" of the flipbook where the work was shared and use "I" only where the decision was yours alone. The contrast is what makes the "I" credible.

**Hero artifact:** the highest-signal single image. A real screen, not a moodboard.
**Caption:** one line naming what to look at.

---

### Block 2: Field guide

Large heading. Full width, `<BaseT2>`.

Two paragraphs, 90 to 120 words. The reusable-thinking block: the token decision, the component architecture, the state model, the naming scheme. Whatever here would transfer to a different company's codebase.

**Artifacts:** two to three, legible at published size. If a board or spec is too dense to read, crop into it or rebuild a clean version. A cropped detail that can be read beats a full board that cannot.

**Caption pattern:** what it is, then the decision it encodes.
Example shape: "Seven color tokens with defined roles. Teal moved from decorative headline accent to primary interactive color in dark mode."

> What would you hand a new engineer on day one so they could extend this without asking you?

---

### Block 3: Divergence

Large heading. Full width, `<BaseT2>`.

The constraint, the edge case, or the thing that broke. Name what you rejected and what it cost. Her page asserts a "sweet spot" without defending it; that is the weakest paragraph she wrote and the easiest one to beat.

Good candidates: an accessibility requirement that changed a component API, a performance ceiling that killed the first approach, a migration constraint that forced a shim, a state you did not know existed until production.

**Artifacts:** the state matrix, the edge-case grid, the before and after. One well-built states table does more for you than five workshop photos.

> What did this cost, and what did you give up to pay it?

---

### Block 4: Later observations

Large heading. Full width, `<BaseT2>`.

Two short paragraphs, 70 to 100 words.

First: what shipped and what changed. One number, even a small one: components consolidated, bundle size, time to build a new page, support ticket volume, report generation time.

Second: the honest revision note. Your flipbook already does this well in Chapter 4 ("that's not a failure, exactly"). Keep that register.

**Artifact:** a flow diagram, architecture sketch, or system map. Black and white, legible, generous whitespace.

**Field note:** close with one, matching the flipbook. One or two sentences, the aside that would not survive an interview but is true.

---

## Short template (tier 2)

250 to 350 words, or up to 450 in the chapter that carries Provenance. Three blocks, four with Provenance, one or two artifacts. Visually distinct from tier 1 so a reader knows immediately it is a different weight: no hero container, no masthead, single column. The type scale stays the same as tier 1, since the missing masthead and the shorter page already read as lighter weight and a second scale would rank a tier 2 block heading below a tier 1 masthead subhead that carries less content.

**Block A: Specimen** 60 to 80 words. The problem, the client by domain only, and the one thing that made it hard. Close with the one-clause status line from the framing rule above.

**Block A2: Provenance** One chapter only, and only for the leadership proof. 100 to 140 words. Same job as tier 1 Provenance, so see that block. It sits second, between Specimen and Field guide, so the reader has the product before the delivery story.

**Block B: Field guide** 120 to 160 words. One design or architecture problem, worked through properly. For the 42-question assessment that is form architecture: conditional branching, save and resume, validation timing, progress that stays honest when the path length varies. For the TPRM platform it is information architecture and how you made a sprawling scope decidable.

**Artifact:** one or two, legible, captioned. A flow, a state model, a form architecture diagram, or a screen rebuilt with the client's marks and identifying details removed. Never a screenshot of a client's branded UI as it shipped.

**Block C: Later observations** 60 to 80 words. What the reasoning was good for regardless of the outcome. No survivor claim about the product, since it did not ship; a claim about what the method survived into is fair and is different. Say what you would build differently now, which is true and costs nothing.

---

## Non-negotiables

1. **Every artifact gets a caption.** Skimmers read headings and captions only. Free ground.
2. **Every artifact is legible at published size.** If a reviewer cannot read it, crop in or rebuild it.
3. **One number per tier 1 chapter.** A case study with no outcome describes a plan.
4. **One thing you got wrong, per tier 1 chapter.** An actual revision, not a humblebrag.
5. **Consistent grid.** You are selling systems thinking; the page layout is a work sample whether you intend it or not.
6. **No em-dashes.** Colons, semicolons, or restructure.

---

## Proof checklist for design engineering weighting

Across the three tier 1 chapters, at least one should show each of these.

- [ ] A component API or prop signature, with the reasoning for the shape
- [ ] A states matrix: default, hover, focus, active, disabled, loading, error, empty
- [ ] A token or naming decision and what it replaced
- [ ] An accessibility decision that changed the design, not just an audit result
- [ ] A performance or bundle constraint that changed an approach
- [ ] A migration or refactor with before and after architecture
- [ ] Code and Figma shown side by side on the same component

## Leadership proof

Concentrated in Risk Assessment Platform, in a Provenance block. The claim to make there is a standard you set that other people built against and that held after you stopped touching it: the boundaries that became lint errors so the rules held without anyone remembering them, and the frontend you started next that was built against them. The delivery estimate belongs in the same block, since scoping a four-person team across three repositories and writing down the tradeoffs is the part that reads as leadership rather than as seniority.

Keep it to one chapter. Two-plus years of leadership presented across five chapters invites the reader to do the math; presented in one, it reads as range. It landing in a tier 2 chapter rather than a tier 1 one is fine: that is where the evidence actually is, and the tier 1 chapters are carrying the design engineering weighting.

---

## Chapter map

Two tiers. The shipped products with numbers get the full template; the unshipped client work gets a short form. Labeling the difference is better than padding the short ones to match.

### Tier 1: full chapters (450 to 600 words, four to six artifacts)

| #   | Product                                 | Role in the portfolio                                                                                                                                                           | Numbers | Stub to replace |
| --- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------- |
| 1   | Cyber Risk Rating                       | **Craft chapter.** Single-company risk report: data density, information hierarchy, score legibility, states for incomplete data. Home for the states matrix and component API. | Yes     | platform        |
| 2   | Cyber Risk Portfolio                    | **System chapter.** One report's language scaled to many companies. Proof that tokens and components transfer across surfaces.                                                  | Yes     | engage          |
| 3   | Maturity Roadmap (CMMC and Essential 8) | **Constraint chapter.** Two compliance standards through one component set. What generalized, what refused to, where you special-cased.                                         | Yes     | comply          |

### Tier 2: short explorations (250 to 350 words, one or two artifacts; up to 450 with Provenance)

| #   | Product                              | Role in the portfolio                                                                                                                                                           | Notes                                       | Stub to replace |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | --------------- |
| 4   | 42-question risk assessment          | **The leadership chapter.** Form architecture: section grouping, autosave, contributor handoff, progress that stays honest. Carries the leadership proof in a Provenance block. | External client, do not name. Did not ship. | client-a        |
| 5   | Third-party risk management platform | IA and systems problem. Carries the scope-and-stakeholder signal. A year into development, so there is real depth to show.                                                      | External client, do not name. Did not ship. | client-b        |

**Naming rule for tier 2:** describe the client by domain, not identity. "An enterprise client in [sector]" or just "a client engagement." No logo, no colors that identify them, no screenshots with their marks. Details that effectively identify the client (company-scale layoffs, recognizable product surfaces) are naming by another route; leave them out.

**Framing rule for unshipped work.** Both engagements ended for reasons outside the work, so give one neutral clause rather than an unexplained gap. A gap invites the reader to fill it in; a short exogenous reason closes the question.

- Third-party risk management platform: "The engagement ended a year into development, following a restructure on the client side."
- 42-question risk assessment: "The engagement ended following a leadership change." Deliberately ambiguous about whose. True either way, and WhiteHawk's internal business does not belong on a page about WhiteHawk.

One clause, then move on. No elaboration, no attribution, no defense. If asked in an interview, answer plainly there.

---
