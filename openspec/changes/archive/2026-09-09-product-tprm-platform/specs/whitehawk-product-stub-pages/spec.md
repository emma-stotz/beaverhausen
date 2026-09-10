## REMOVED Requirements

### Requirement: Five stub routes exist under `/portfolio/whitehawk/`

**Reason**: No stub route remains. This capability existed so the products grid's links had real
destinations while chapters were still being written. All five products now ship as chapters at
`cyber-risk-rating`, `cyber-risk-portfolio`, `compliance-frameworks`, `risk-assessment-platform`, and
`tprm-platform`, and `client-b` was the last stub. A capability describing zero routes is worse than
no capability, and the requirement's name had already gone stale: it said five while its body
described one.

**Migration**: The behaviour that outlives the stubs is retired URLs falling through rather than
redirecting, and that already belongs to `not-found-page`, whose retired-product-URL requirement
picks up `client-a` and `client-b` in this same change. Nothing else needs to move.
`openspec/specs/whitehawk-product-stub-pages/spec.md` is deleted at sync time. Per-chapter routes are
specified by each chapter's own capability, so no route loses coverage.

### Requirement: Stub pages use the water-fill transition

**Reason**: There is no stub page left to navigate away from. The rule itself is not being relaxed:
it was a restatement of a project-wide convention, and every surviving page is covered by its own
capability's back-link requirement.

**Migration**: Each product chapter capability already requires its back link to use `AppLink` or
`TransitionLink` and to fire the water-fill transition, and `product-chapter` requires it for
chapters generally. No coverage is lost.
