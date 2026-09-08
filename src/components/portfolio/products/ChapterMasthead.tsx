import type { ProductChapter } from '@/content/products'

import { Paragraph } from '@/components/portfolio/case-studies/Paragraph'
import { ChapterArtifact } from '@/components/portfolio/products/ChapterArtifact'
import { AutoH } from '@/components/primitives/AutoH'
import { BaseT3 } from '@/components/primitives/BaseT3'

function MastheadEntry({ heading, text }: { heading: string; text: string }) {
  return (
    <div className="flex flex-col space-y-2">
      <AutoH>
        <BaseT3 className="text-beaver-dark antialiased dark:text-iron-orange">
          {heading}
        </BaseT3>
      </AutoH>
      <Paragraph text={text} className="text-beaver dark:text-enamel" />
    </div>
  )
}

export function ChapterMasthead({
  masthead,
}: {
  masthead: NonNullable<ProductChapter['masthead']>
}) {
  const copy = (
    <div className="mx-auto flex max-w-3xl flex-col space-y-6">
      <MastheadEntry heading="Specimen" text={masthead.specimen} />
      <MastheadEntry heading="Working Hypothesis" text={masthead.hypothesis} />
      <MastheadEntry heading="Provenance" text={masthead.provenance} />
    </div>
  )

  return (
    <section className="grid items-start gap-8">
      {masthead.heroBelow ? (
        <>
          {copy}
          <ChapterArtifact slot={masthead.hero} />
        </>
      ) : (
        <>
          <ChapterArtifact slot={masthead.hero} />
          {copy}
        </>
      )}
    </section>
  )
}
