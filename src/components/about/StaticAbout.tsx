import '@/components/about/static-about.css'

import beaverSwimmingGlide from '@/assets/about/beaver-swimming-glide.svg'
// import beaverSwimmingPull from '@/assets/about/beaver-swimming-pull.svg'
import underwaterRiverbed from '@/assets/about/underwater-riverbed.svg'
import { DownloadResumeButton } from '@/components/DownloadResumeButton'
import { AutoH } from '@/components/primitives/AutoH'
import { AutoHProvider } from '@/components/primitives/AutoHProvider'
import { BaseT1 } from '@/components/primitives/BaseT1'
import { BaseT3 } from '@/components/primitives/BaseT3'
import { BaseT4 } from '@/components/primitives/BaseT4'
import { BaseT6 } from '@/components/primitives/BaseT6'
import { Button } from '@/components/primitives/Button'
import { EDUCATION, EXPERIENCE, PROFILE, SKILLS } from '@/content/about'
import { useTransition } from '@/context/TransitionContext'

export function StaticAbout() {
  const { transitionTo } = useTransition()

  return (
    <div className="relative mb-32 h-full w-full overflow-clip bg-gradient-to-b from-water from-5% via-water-dark via-50% to-dusk to-150% px-8 pb-14 lg:px-0 lg:pb-0 dark:from-0% dark:via-10% dark:to-80%">
      <div
        className="pointer-events-none absolute inset-0 h-full bg-scroll bg-bottom-left bg-repeat-x"
        style={{
          backgroundImage: `url(${underwaterRiverbed})`,
          backgroundSize: 'auto calc(13% + 0.5px)',
        }}
      />

      <div
        className="beaver-swim-in-right pointer-events-none absolute inset-0 hidden size-full bg-scroll bg-top-right bg-no-repeat md:flex"
        style={{
          backgroundImage: `url(${beaverSwimmingGlide})`,
          backgroundSize: 'auto calc(15%)',
        }}
      />

      <div
        className="beaver-swim-in-left pointer-events-none absolute inset-0 hidden size-full bg-scroll bg-top-left bg-no-repeat md:flex"
        style={{
          backgroundImage: `url(${beaverSwimmingGlide})`,
          backgroundSize: 'auto calc(15%)',
        }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col gap-10 rounded-md md:px-4 md:backdrop-blur">
        <div className="header-fade-in z-raised flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <AutoH className="about-fade-in">
            <BaseT1 className="text-beaver-dark">About</BaseT1>
          </AutoH>

          <div className="button-fade-in">
            <DownloadResumeButton variant="ghost" />
          </div>
        </div>

        <section aria-label="Profile" className="flex flex-col gap-6">
          <p>
            <BaseT4 className="leading-[1.9] text-cream italic">
              {PROFILE}
            </BaseT4>
          </p>
        </section>

        <AutoHProvider>
          <section aria-label="Skills" className="flex flex-col gap-4">
            <AutoH>
              <BaseT6 className="font-bold text-beaver-dark uppercase dark:text-iron-orange">
                Skills
              </BaseT6>
            </AutoH>
            <div className="columns-1 gap-x-8 sm:columns-2">
              {SKILLS.map(({ label }) => (
                <div
                  key={label}
                  className="mb-1.5 flex break-inside-avoid gap-x-2"
                >
                  <span className="shrink-0 text-cream select-none">—</span>
                  <BaseT4 className="text-cream">{label}</BaseT4>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Experience" className="flex flex-col gap-8">
            <AutoH>
              <BaseT6 className="font-bold text-beaver-dark uppercase dark:text-iron-orange">
                Experience
              </BaseT6>
            </AutoH>
            {EXPERIENCE.map((job) => (
              <div key={job.company} className="flex flex-col gap-4">
                <div className="flex flex-col gap-0.5">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                    <BaseT3 variant="display" className="text-cream">
                      {job.company}
                    </BaseT3>
                    <BaseT6 className="shrink-0 text-cream/80 uppercase">
                      {job.dates}
                    </BaseT6>
                  </div>
                  <BaseT6 className="text-cream/80 uppercase">
                    {job.location}
                  </BaseT6>
                </div>
                {job.roles.map((role) => (
                  <div
                    key={role.title}
                    className="mx-4 flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <BaseT4 className="text-enamel">{role.title}</BaseT4>
                    {job.roles.length > 1 && (
                      <BaseT6 className="shrink-0 text-cream/60 uppercase">
                        {role.dates}
                      </BaseT6>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </section>

          <section aria-label="Education" className="flex flex-col gap-4">
            <AutoH>
              <BaseT6 className="font-bold text-beaver-dark uppercase dark:text-iron-orange">
                Education
              </BaseT6>
            </AutoH>
            {EDUCATION.map((item) => (
              <div
                key={item.school}
                className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
              >
                <div className="flex flex-col gap-0.5">
                  <BaseT3 variant="display" className="text-cream">
                    {item.school}
                  </BaseT3>
                  <BaseT4 className="mx-4 text-enamel">{item.degree}</BaseT4>
                  {item.note && (
                    <BaseT6 className="mx-4 text-cream/80 uppercase">
                      {item.note}
                    </BaseT6>
                  )}
                </div>
                <BaseT6 className="shrink-0 text-cream/80 uppercase">
                  {item.year}
                </BaseT6>
              </div>
            ))}
          </section>
        </AutoHProvider>

        <div className="z-raised flex flex-col items-start gap-6">
          <p>
            <BaseT3
              variant="display"
              className="leading-[1.8] text-water italic"
            >
              The beaverhausen doesn&apos;t build itself.
            </BaseT3>
          </p>

          <Button
            variant="ghost"
            onClick={() => transitionTo('/portfolio/whitehawk')}
          >
            View my work
          </Button>
        </div>
      </div>
    </div>
  )
}
