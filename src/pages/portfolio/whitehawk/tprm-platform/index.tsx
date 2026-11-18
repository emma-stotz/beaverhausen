import { ProductChapter } from '@/components/portfolio/products/ProductChapter'
import { TPRM_PLATFORM } from '@/content/product-tprm-platform'
import { CaseStudyLayout } from '@/layouts/CaseStudyLayout'

export default function WhiteHawkTprmPlatformPage() {
  return (
    <CaseStudyLayout>
      <ProductChapter chapter={TPRM_PLATFORM} />
    </CaseStudyLayout>
  )
}
