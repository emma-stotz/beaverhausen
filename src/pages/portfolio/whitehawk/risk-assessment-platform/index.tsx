import { ProductChapter } from '@/components/portfolio/products/ProductChapter'
import { RISK_ASSESSMENT_PLATFORM } from '@/content/product-risk-assessment-platform'
import { CaseStudyLayout } from '@/layouts/CaseStudyLayout'

export default function WhiteHawkRiskAssessmentPlatformPage() {
  return (
    <CaseStudyLayout>
      <ProductChapter chapter={RISK_ASSESSMENT_PLATFORM} />
    </CaseStudyLayout>
  )
}
