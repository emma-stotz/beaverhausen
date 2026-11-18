import { CaseStudyNav } from '@/components/portfolio/case-studies/CaseStudyNav'
import { WhiteHawkProducts } from '@/components/portfolio/case-studies/whitehawk/products/WhiteHawkProducts'
import { WhiteHawkCaseStudy } from '@/components/portfolio/case-studies/whitehawk/WhiteHawkCaseStudy'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { CaseStudyLayout } from '@/layouts/CaseStudyLayout'

export default function WhiteHawkPortfolioPage() {
  return (
    <CaseStudyLayout>
      <main className="mx-auto min-h-screen max-w-7xl">
        <WhiteHawkCaseStudy />

        <div className="flex flex-col items-center gap-2 py-4">
          <button
            className="flex flex-col items-center gap-2 rounded-md p-1"
            onClick={() =>
              document
                .getElementById('whitehawk-products')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            aria-label="Scroll to products"
          >
            <BaseT6 className="text-beaver uppercase antialiased dark:text-cream">
              scroll
            </BaseT6>
            <div className="h-6 w-px origin-top bg-iron-orange lg:h-10 dark:bg-cream" />
          </button>
        </div>

        <WhiteHawkProducts />

        <CaseStudyNav currentHref="/portfolio/whitehawk" />
      </main>
    </CaseStudyLayout>
  )
}
