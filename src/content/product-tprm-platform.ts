// # Third Party Risk Management Platform: History Depends on Identity

// Tier 2 chapter.
// Status: complete

// ---

// ## Specimen

// A global technology company monitored more than 10,000 third-party vendors through a security ratings provider. We were hired to build an API for their development team. We built the platform on top of it for our analysts, who produced a monthly report of every vendor rated F so that mitigation could be aimed rather than spread. Before any of that reporting mattered, the system had to answer a more basic question: when two records point to the same company, which one is the system actually watching?

// ## Field Guide

// Incoming records started as inquiries. The backend compared each one against the provider data and assigned a status: Pending, Duplicate, Missing Data, Nonexistent, Other Error, or Complete. Potential duplicates were flagged for analyst review, where multiple records could be linked to one canonical entity. An inquiry could only be marked Complete once it resolved to a provider match. Only then did a company enter the monitored population. I co-designed that intermediate API with our lead backend developer, including the resources, lifecycle, request and response shapes, and naming. He implemented it; I wrote the documentation and built the analyst interface against it.

// Once identity was stable, the system stored a new risk record for every monitored entity each day, keeping up to twelve months of history. That supported the monthly question the analysts actually needed to answer: which third parties have an F, which ones are new, and is that population getting better or worse?

// One vendor's history is ten grades at once: an overall rating plus nine risk domains, twelve months back. Plotted the obvious way, that is ten lines crossing each other on a five-step axis, and nobody can read it. The chart keeps the full history visible, but the legend does the real work. It isn't a key: it is a control. Hovering a legend item isolates the series you actually want to inspect.

// ## Later Observations

// The API was delivered and used in production; the frontend remained an internal analyst tool while we planned to offer it to the client later. The client dissolved its third-party risk management team a year into the engagement, which brought it to an end. We did not instrument the internal frontend for adoption, so there are no usage numbers to report.

// The next planned feature was an audit surface. By then the problem had shifted from cleaning provider data to making the API itself inspectable: what was called, what came back, and where something failed. I would still build that next.

// **Field note**: ten thousand records sounds like a scale problem. Most of the interesting work was identity.

// ---

// ## Artifact plan

// | # | Block | Artifact | Status | File |
// |---|-------|----------|--------|------|
// | 1 | Specimen | Onboarding Status Summary: 10,671 inquiries, six statuses, DUPLICATE at 1,037 | Have | tprm_1.png |
// | 2 | Field Guide | Performance Over Time, interactive: resting state swaps to Overall Grade hovered | Have | tprm_2_rest.png, tprm_2_hover.png |

// ### Captions

// 1. *10,671 requests to monitor a vendor. 1,037 of them were a vendor already being monitored.*
// 2. *Ten series at fifteen percent. One name in the legend brings one line forward.*

// ---
