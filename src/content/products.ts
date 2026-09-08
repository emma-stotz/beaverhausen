import frameworksThumb from '@/assets/portfolio/case-studies/whitehawk/products/compliance-frameworks/frameworks_thumbnail.png'
import portfolioReportThumb from '@/assets/portfolio/case-studies/whitehawk/products/cyber-risk-portfolio/portfolio_report-thumbnail.png'
import cyberRiskRatingThumb from '@/assets/portfolio/case-studies/whitehawk/products/cyber-risk-rating/cyber-risk-scorecard_thumbnail.png'

export interface Product {
  id: string
  name: string
  thumbnail: string | null
}

export const PRODUCTS: Array<Product> = [
  {
    id: 'cyber-risk-rating',
    name: 'Cyber Risk Rating',
    thumbnail: cyberRiskRatingThumb,
  },
  {
    id: 'cyber-risk-portfolio',
    name: 'Cyber Risk Portfolio',
    thumbnail: portfolioReportThumb,
  },
  {
    id: 'compliance-frameworks',
    name: 'Compliance Frameworks',
    thumbnail: frameworksThumb,
  },
  { id: 'client-a', name: 'Client A', thumbnail: null },
  { id: 'client-b', name: 'Client B', thumbnail: null },
]

// Schema for a product chapter page. Chapters are data; components/portfolio/products
// renders them, so a new chapter is a content module plus a thin page.

export interface Artifact {
  src: string
  alt: string
  // Narrows this image inside its slot. Useful in a stacked pair whose two
  // halves want different widths.
  width?: ArtifactWidth
}

// The flipbook artifact frame is max-w-md. Dense screenshots need more room.
export type ArtifactWidth = 'md' | 'lg' | 'xl'

// `caption` is required on every slot: every artifact gets a caption is a template
// non-negotiable, enforced by the type rather than by review.
export type ArtifactSlot =
  | {
      kind: 'single'
      artifact: Artifact
      caption: string
      width?: ArtifactWidth
    }
  | {
      kind: 'pair'
      artifacts: [Artifact, Artifact]
      caption: string
      width?: ArtifactWidth
      // Side by side at md and wider by default; set when the two are too dense
      // to read at half width.
      stacked?: boolean
    }

export type BlockContent = { kind: 'prose'; text: string } | ArtifactSlot

export interface ChapterBlock {
  heading: string
  content: Array<BlockContent>
}

export interface ProductChapter {
  title: string
  subtitle?: string
  // Tier 1 only. A chapter that omits it is tier 2: its blocks start under the
  // title, with no hero and no Specimen/Hypothesis/Provenance triple. A tier 2
  // chapter that needs a Specimen or Provenance section writes it as a block.
  masthead?: {
    specimen: string
    hypothesis: string
    provenance: string
    hero: ArtifactSlot
    // A tall hero pushes the copy off the screen. Set to put the three entries
    // first and the hero after them.
    heroBelow?: boolean
  }
  blocks: Array<ChapterBlock>
  fieldNote: string
}
