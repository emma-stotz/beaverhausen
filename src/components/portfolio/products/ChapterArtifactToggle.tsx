import { useState } from 'react'

import type { Artifact } from '@/content/products'

// One layer of the stack. Both layers sit in the same grid cell, so the frame
// reserves the taller of the two and toggling cannot reflow the page.
function Layer({
  artifact,
  visible,
}: {
  artifact: Artifact
  visible: boolean
}) {
  return (
    <img
      src={artifact.src}
      alt={artifact.alt}
      aria-hidden={!visible}
      className={`pointer-events-none col-start-1 row-start-1 w-full object-contain transition-opacity duration-(--duration-interaction) ease-out-cubic motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}

// Two states of one screen. Hover previews `active`; click, Enter, or Space
// latches it. `aria-pressed` tracks the latch alone: hover is presentational,
// and announcing a pressed state because a pointer crossed the frame would be
// a lie.
export function ChapterArtifactToggle({
  rest,
  active,
  label,
}: {
  rest: Artifact
  active: Artifact
  label: string
}) {
  const [latched, setLatched] = useState(false)
  const [hovering, setHovering] = useState(false)

  // Latch wins over hover-out, so a visitor who clicks to hold the state does
  // not lose it when the pointer drifts off the frame.
  const showActive = latched || hovering

  // Touch and pen fire a phantom enter/leave around a tap. Previewing on mouse
  // only leaves those inputs purely latch-driven, which is the intent.
  function previewOn(pointerType: string) {
    if (pointerType === 'mouse') setHovering(true)
  }

  // No background or border of its own: the undecorated frame rule is why these
  // screenshots read as evidence. The focus ring is the one visual it
  // contributes. `rounded-2xl` is there only to shape that ring, since an outline
  // follows border-radius; with nothing painted behind it the radius is
  // otherwise invisible.
  //
  // Deliberately no `outline-none` base: that sets outline-style: none, which
  // the focus-visible width utility does not restore, so the ring would never
  // paint. Chrome only rings :focus-visible, so a mouse click still leaves none.
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={latched}
      onClick={() => setLatched((held) => !held)}
      onPointerEnter={(e) => previewOn(e.pointerType)}
      onPointerLeave={() => setHovering(false)}
      className="block w-full cursor-pointer rounded-2xl bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-iron-orange"
    >
      <span className="grid">
        <Layer artifact={rest} visible={!showActive} />
        <Layer artifact={active} visible={showActive} />
      </span>
    </button>
  )
}
