import type { ProductChapter } from '@/content/products'

import technologySection from '@/assets/portfolio/case-studies/whitehawk/products/risk-assessment-platform/product-risk-assessment-platform_1.png'
import assessmentDashboard from '@/assets/portfolio/case-studies/whitehawk/products/risk-assessment-platform/product-risk-assessment-platform_2.png'

// Tier 2: no masthead, so Specimen and Provenance are blocks. Provenance is here
// rather than in a tier 1 chapter because this is where the leadership proof is.
export const RISK_ASSESSMENT_PLATFORM: ProductChapter = {
  title: 'Risk Assessment Platform',
  subtitle: 'The Shape of Progress',

  blocks: [
    {
      heading: 'Specimen',
      content: [
        {
          kind: 'prose',
          text: 'An Australian consultancy wanted to make cyber risk assessment accessible to small and mid-sized businesses: 42 required questions with plain-language descriptions, a weighted score, and a report with tailored recommendations. The assessment was built for people without a security background, and every question is a chance to decide this is not worth finishing. I designed and built the answering experience.',
        },
        {
          kind: 'single',
          artifact: {
            src: technologySection,
            alt: 'One assessment section in a single view: a five-step stepper, a section header with a weight badge and a 6 of 7 answered count, seven questions each with a plain-language explanation, a per-question line naming who answered it and when, and one question still unanswered',
          },
          caption:
            'Seven questions, two contributors, one still open. Every answer records who gave it, so a section can change hands without being finished.',
          width: 'xl',
        },
      ],
    },

    {
      heading: 'Provenance',
      content: [
        {
          kind: 'prose',
          text: 'I wrote the delivery estimate for a four-person team working across three repositories. I gave it three scopes with confidence bands and explicit tradeoffs: full scope at eight to eleven months, reduced at five to seven, lean at three to five. We landed on the reduced scope and targeted the lower end of its range. Writing the options down made that a conversation about what we would give up rather than a negotiation over a date. The plan became 164 tasks across sprints and epics with named owners. I ran the client demo every week. We delivered the reduced scope in four and a half months.',
        },
      ],
    },

    {
      heading: 'Field Guide',
      content: [
        {
          kind: 'prose',
          text: 'One question per screen was the original request. I grouped them by section instead: a short lead-in followed by four scored categories, five sections total with a stepper.',
        },
        {
          kind: 'prose',
          text: 'Seeing a section together teaches you its pattern, so the second question is easier than the first. One question at a time hides that shape, and forty-two screens with no visible end is where people give up. Sections are also a unit a person can take. With several people from one organization contributing and only the account owner able to submit, "you take Technology" is a real handoff; a single question is not.',
        },
        {
          kind: 'prose',
          text: 'Autosave is what made that grouping safe. Every answer persists as it is given and records who gave it. The section boundary could follow the subject matter instead of the persistence model. Had saving happened at the section turn, its length would have been a question of how much work someone was being asked to risk.',
        },
        {
          kind: 'single',
          artifact: {
            src: assessmentDashboard,
            alt: 'Assessment dashboard: an in-progress status, 39 of 42 questions answered, 2 of 5 sections complete, and a progress bar for each of the five sections with its own answered count',
          },
          caption:
            'Every business answers all 42, so the denominator never moves. Progress here is a count, not an estimate.',
          width: 'xl',
        },
      ],
    },

    {
      heading: 'Later Observations',
      content: [
        {
          kind: 'prose',
          text: 'The engagement ended following a leadership change, so the product never reached a real customer. What survived is underneath it. This was the first repository whose frontend architecture I would defend: external dependencies behind interfaces, and four boundaries that had only ever been convention turned into lint errors, so the rules held without anyone having to remember them. I wrote it up after the engagement ended. The frontend I started next was built against it, and the rules have been improved on since.',
        },
      ],
    },
  ],

  fieldNote:
    'I still think five to seven was the right number. It was delivered in four and a half months, which is the most annoying way to be wrong.',
}
