// # Risk Assessment Platform: The Shape of Progress

// Tier 2 chapter plus a Provenance block carrying the leadership proof. Roughly 445 words.
// Status: complete
 
// ---
 
// ## Specimen 

// An Australian consultancy wanted to make cyber risk assessment accessible to small and mid-sized businesses: 42 required questions with plain-language descriptions, a weighted score, and a report with tailored recommendations. The assessment was built for people without a security background, and every question is a chance to decide this is not worth finishing. I designed and built the answering experience.
 
// ## Provenance

// I wrote the delivery estimate for a four-person team working across three repositories. I gave it three scopes with confidence bands and explicit tradeoffs: full scope at eight to eleven months, reduced at five to seven, lean at three to five. We landed on the reduced scope and targeted the lower end of its range. Writing the options down made that a conversation about what we would give up rather than a negotiation over a date. The plan became 164 tasks across sprints and epics with named owners. I ran the client demo every week. We delivered the reduced scope in four and a half months.
 
// ## Field Guide
 
// One question per screen was the original request. I grouped them by section instead: a short lead-in followed by four scored categories, five sections total with a stepper.

// Seeing a section together teaches you its pattern, so the second question is easier than the first. One question at a time hides that shape, and forty-two screens with no visible end is where people give up. Sections are also a unit a person can take. With several people from one organization contributing and only the account owner able to submit, "you take Technology" is a real handoff; a single question is not.

// Autosave is what made that grouping safe. Every answer persists as it is given and records who gave it. The section boundary could follow the subject matter instead of the persistence model. Had saving happened at the section turn, its length would have been a question of how much work someone was being asked to risk.
 
// ## Later Observations
 
// The engagement ended following a leadership change, so the product never reached a real customer. What survived is underneath it. This was the first repository whose frontend architecture I would defend: external dependencies behind interfaces, and four boundaries that had only ever been convention turned into lint errors, so the rules held without anyone having to remember them. I wrote it up after the engagement ended. The frontend I started next was built against it, and the rules have been improved on since.

// **Field note**: I still think five to seven was the right number. It was delivered in four and a half months, which is the most annoying way to be wrong.

// ---
 
// ## Artifact plan

// | # | Block | Artifact | Status | File |
// |---|-------|----------|--------|------|
// | 1 | Masthead | Technology (TC) section in one frame: stepper, section header with weight badge and 6/7 answered, all seven questions, two contributors, TC.7 open | Have | product-risk-assessment-platform_1.png |
// | 2 | Field Guide | Dashboard: questions answered, sections complete, five per-section progress bars | Have | product-risk-assessment-platform_2.png |

// ### Captions

// 1. *Seven questions, two contributors, one still open. Every answer records who gave it, so a section can change hands without being finished.*
// 2. *Every business answers all 42, so the denominator never moves. Progress here is a count, not an estimate.*
// ---