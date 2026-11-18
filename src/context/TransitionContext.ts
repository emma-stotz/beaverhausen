import type { TransitionState } from '@/hooks/usePageTransition'

import { createDependency } from '@/util/dependency'

interface TransitionContextValue {
  transitionTo: (path: string) => void
  state: TransitionState
}

const { Context: TransitionContext, useDependency: useTransition } =
  createDependency<TransitionContextValue>('TransitionContext')

export { TransitionContext, useTransition }
