import type { ReactNode } from 'react'

import '@/components/landing/scroll-reveal.css'

import type { LineProps } from '@/util/scrollSections'

import { BaseT3 } from '@/components/primitives/BaseT3'

type Props = {
  lines: Array<string>
  className?: string
  variant?: LineProps['variant']
  persistLast?: boolean
  renderText?: (lineIndex: number) => ReactNode
  getLineProps?: (lineIndex: number) => LineProps
}

export function ScrollRevealText({
  lines,
  className = '',
  variant = 'body',
  persistLast = false,
  renderText,
  getLineProps,
}: Props) {
  return (
    <div className="relative w-full">
      {lines.map((line, i) => {
        const perLine = getLineProps?.(i) ?? {}
        const lineVariant = perLine.variant ?? variant
        const lineClassName = perLine.className ?? className
        const isLast = i === lines.length - 1
        const persists = persistLast && isLast
        const content = renderText ? renderText(i) : line

        return (
          <div
            key={i}
            className="flex h-screen w-full items-center justify-center"
          >
            <div className="mx-auto flex size-full max-w-2xl items-start justify-center text-center">
              <span
                className={`flex h-[48svh] items-end sm:h-[55svh] md:h-[40svh] ${persists ? 'reveal--persist' : 'reveal'}`}
              >
                <BaseT3 className={lineClassName} variant={lineVariant}>
                  {content}
                </BaseT3>
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
