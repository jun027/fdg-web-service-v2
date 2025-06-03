import Image from 'next/image'

import { SpecialParagraph } from '@/components/common/special-paragraph'

import { SwiperContainer } from '.'
import { DONATE_WAYS, NOTES } from './config/context'

function ProjectsView({ projects }) {
  return (
    <main>
      <div className="flex flex-col gap-y-6 pb-6 sm:pb-20">
        <div>
          <picture>
            <source
              srcSet="/images/page/projects/thumb-01.png"
              media="(min-width:640px)"
            />
            <Image
              style={{
                width: '100%',
              }}
              src="/images/page/projects/thumb-01-m.png"
              alt="thumb-01"
              width={750}
              height={330}
            />
          </picture>
        </div>

        <div className="flex flex-col gap-y-6 sm:gap-y-12 xl:gap-y-24">
          <div className="w-full max-w-[1280px] mx-auto px-4 flex flex-col items-center sm:gap-y-4">
            <h1 className="text-primary-main desktop-fz-h2 relative sm:desktop-fz-h1">
              <span className="absolute top-[-24px] left-[-32px] z-0 inline-block w-[57px] aspect-[57/67] rotate-z-[350deg] sm:w-20 sm:top-[-16px] sm:left-[-24px]">
                <Image
                  src="/images/icons/rock-icon-01.png"
                  alt="logo"
                  fill
                  placeholder="empty"
                  className="image scale-75"
                />
              </span>
              <span className="relative z-10">慈善募資</span>
            </h1>
            <p className="text-primary-main mobile-jf-h4 text-center sm:desktop-jf-h1">
              您的每一份捐款，都將成為溫暖與正能量的傳遞。無論是用於關懷弱勢、推動教育、支持醫療或保育環境，每一筆善款都能在需要的綻放光芒。
            </p>
          </div>

          <SwiperContainer list={projects} />

          <div className="w-full max-w-[1280px] mx-auto px-4">
            <div className="flex flex-row gap-x-2 mb-2">
              <div className="relative w-[34px] aspect-[44/51] sm:w-[50px]">
                <Image
                  src="/images/icons/sword-02.png"
                  alt="logo"
                  fill
                  placeholder="empty"
                  className="image scale-75"
                />
              </div>
              <h3 className="text-primary-main desktop-jf-h1 sm:desktop-jf-number">
                注意事項
              </h3>
            </div>

            <div className="text-primary-main desktop-jf-h3 sm:pl-14">
              凝聚一份愛心，點亮更多希望
              <br />
              您的每一份捐款，都將成為溫暖與正能量的傳遞。無論是用於關懷弱勢、推動教育、支持醫療或保育環境，每一筆善款都能在需要的角落綻放光芒。
              <br />
              讓這份愛，持續傳遞：
              <SpecialParagraph
                type="dot"
                text="您的捐款，將替受助者帶來實質的幫助與心靈的支持"
              />
              <SpecialParagraph
                type="dot"
                text="每一次分享與投入，都能引發更多善的循環"
              />
              <br className="sm:hidden" />
              捐款方式：
              <br />
              <SpecialParagraph type="dot" text={DONATE_WAYS.online} />
              <br className="sm:hidden" />
              注意事項：
              <br />
              <SpecialParagraph
                type="number"
                prefix="1."
                text={NOTES.number1.text}
              />
              <SpecialParagraph
                type="number"
                prefix="2."
                text={NOTES.number2.text}
              />
              <SpecialParagraph
                type="number"
                prefix="3."
                text={NOTES.number3.text}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProjectsView
