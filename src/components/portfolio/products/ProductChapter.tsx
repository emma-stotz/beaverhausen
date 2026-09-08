import type { ProductChapter as Chapter } from '@/content/products'

import { FieldNote } from '@/components/portfolio/case-studies/FieldNote'
import { ChapterBlock } from '@/components/portfolio/products/ChapterBlock'
import { ChapterMasthead } from '@/components/portfolio/products/ChapterMasthead'
import { AppLink } from '@/components/primitives/AppLink'
import { AutoH } from '@/components/primitives/AutoH'
import { AutoHProvider } from '@/components/primitives/AutoHProvider'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT6 } from '@/components/primitives/BaseT6'

export function ProductChapter({ chapter }: { chapter: Chapter }) {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-32">
      <div className="mx-auto max-w-3xl">
        <AutoH>
          <BaseT1 className="text-beaver-dark antialiased dark:text-iron-orange">
            {chapter.title}
          </BaseT1>
        </AutoH>
        {chapter.subtitle && (
          <BaseT6 className="text-beaver uppercase dark:text-enamel">
            {chapter.subtitle}
          </BaseT6>
        )}
      </div>

      <AutoHProvider>
        <div className="mt-12 flex flex-col space-y-16">
          {chapter.masthead && <ChapterMasthead masthead={chapter.masthead} />}

          {chapter.blocks.map((block) => (
            <ChapterBlock key={block.heading} block={block} />
          ))}

          <div className="mx-auto w-full max-w-3xl">
            <FieldNote
              text={chapter.fieldNote}
              className="text-beaver dark:text-enamel"
            />
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <AppLink to="/portfolio/whitehawk" className="mt-8 inline-block">
            Back to WhiteHawk
          </AppLink>
        </div>
      </AutoHProvider>
    </main>
  )
}
