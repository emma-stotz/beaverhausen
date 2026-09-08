import '@/components/portfolio/portfolio-parallax.css'

import { useEffect, useRef, useState } from 'react'

import dawnCloudBg from '@/assets/landscape/dawn-clouds-bg.svg'
import duskCloudBg from '@/assets/landscape/dusk-clouds-bg.svg'
import parallaxLandscape from '@/assets/portfolio/landscape-all.svg'
import { LandmarkScene } from '@/components/portfolio/LandmarkScene'
import { SCENES } from '@/components/portfolio/Scenes.config'
import { AutoHProvider } from '@/components/primitives/AutoHProvider'
import { gsap } from '@/deps/gsap'

const SCENE_WIDTH = 3342
const SCENE_HEIGHT = 866

export function PortfolioParallax() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth)

  const showLandscape =
    viewportWidth >= 1536 || (viewportWidth >= 640 && viewportWidth < 768)
  const sceneCount = SCENES.length + (showLandscape ? 1 : 0)
  const landscapeOffset = showLandscape ? 1 : 0

  const scrollHeight = viewportWidth < 1024 ? 3000 : 6000
  const portfolioScrollHeight = sceneCount * scrollHeight
  const usingKeyboard = useRef(false)

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onKey = () => {
      usingKeyboard.current = true
    }
    const onPointer = () => {
      usingKeyboard.current = false
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
    }
  }, [])

  const scrollToHitAreaCenter = (target: HTMLElement) => {
    const panelWidth = window.innerHeight * 0.6 * (SCENE_WIDTH / SCENE_HEIGHT)
    const totalPanorama = panelWidth * sceneCount - window.innerWidth
    if (totalPanorama <= 0) return
    const { left, right } = target.getBoundingClientRect()
    const deltaX = (left + right) / 2 - window.innerWidth / 2
    const maxScroll = portfolioScrollHeight - window.innerHeight
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    gsap.to(window, {
      scrollTo: Math.max(
        0,
        window.scrollY + (deltaX / totalPanorama) * maxScroll,
      ),
      duration: prefersReducedMotion ? 0 : 0.8,
      ease: 'power2.inOut',
    })
  }

  return (
    <div
      className="portfolio-parallax-scroll"
      style={{ height: portfolioScrollHeight }}
    >
      <div
        className="portfolio-parallax sticky top-0 h-screen w-full overflow-clip"
        style={{ '--scene-count': sceneCount } as React.CSSProperties}
      >
        <div
          className="portfolio-parallax-pan-slow absolute inset-0 bg-bottom bg-repeat-x dark:hidden"
          style={{
            backgroundImage: `url(${dawnCloudBg})`,
            backgroundSize: 'var(--panel-width) auto',
            width: 'var(--panorama-width)',
          }}
        />
        <div
          className="portfolio-parallax-pan-slow absolute inset-0 bg-bottom bg-repeat-x not-dark:hidden"
          style={{
            backgroundImage: `url(${duskCloudBg})`,
            backgroundSize: 'var(--panel-width) auto',
            width: 'var(--panorama-width)',
          }}
        />

        <div
          className="portfolio-parallax-pan absolute inset-0"
          style={{ width: 'var(--panorama-width)' }}
        >
          {showLandscape && (
            <div
              className="absolute inset-y-0 bg-bottom bg-no-repeat"
              style={{
                backgroundImage: `url(${parallaxLandscape})`,
                backgroundSize: 'var(--panel-width) auto',
                backgroundPosition: 'left bottom',
                left: 0,
                width: 'var(--panel-width)',
              }}
            />
          )}
          {SCENES.map((scene, i) => (
            <div
              key={scene.id}
              className="absolute inset-y-0 bg-bottom bg-no-repeat"
              style={{
                backgroundImage: `url(${scene.scene})`,
                backgroundSize: 'var(--panel-width) auto',
                backgroundPosition: 'left bottom',
                left: `calc(${i + landscapeOffset} * (var(--panel-width)))`,
                width: 'var(--panel-width)',
              }}
            />
          ))}
        </div>

        <div
          className="portfolio-parallax-pan absolute bottom-0"
          style={{ width: 'var(--panorama-width)' }}
        >
          {SCENES.map((scene, i) => (
            <div
              key={scene.id}
              className="absolute bottom-0"
              style={{
                left: `calc(${i + landscapeOffset} * var(--panel-width))`,
                width: 'var(--panel-width)',
              }}
              onFocus={(e) => {
                if (usingKeyboard.current) scrollToHitAreaCenter(e.target)
              }}
            >
              <AutoHProvider>
                <LandmarkScene scene={scene} />
              </AutoHProvider>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
