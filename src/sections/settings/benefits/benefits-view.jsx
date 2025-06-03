import Link from 'next/link'

import { SpecialParagraph } from '@/components/common/special-paragraph'
import { BreadcrumbsContainer } from '@/components/ui/breadcrumbs'
import { PATHS } from '@/routes/path'

import { MemberLevelDesktop, MemberLevelMobile } from '.'

function BenefitsView() {
  return (
    <main className="main-background min-h-screen overflow-hidden">
      <div className="w-full aspect-[375/220] bg-[url(/images/page/settings/thumb-01-m.png)] bg-no-repeat bg-center bg-cover sm:bg-[url(/images/page/settings/thumb-01.png)] sm:aspect-[2880/654]" />

      <div className="max-w-[1280px] py-12 mx-auto w-full flex flex-col gap-y-9 sm:gap-y-12">
        <div className="flex flex-col gap-y-9 px-4">
          {/* Breadcrumbs */}
          <BreadcrumbsContainer />

          {/* 權益使用說明 */}
          <div className="w-full flex flex-col gap-y-3">
            <h2 className="text-primary-main desktop-jf-h2">
              一、權益使用說明：
            </h2>
            <div className="text-primary-main mobile-jf-h5">
              <SpecialParagraph
                type="dot"
                text="會員資格及折扣權益不轉讓他人。"
              />
              <SpecialParagraph
                type="dot"
                text="會員折扣僅限會員本人使用，消費時須完成會員登入即可享受會員優惠。"
              />
              <SpecialParagraph
                type="dot"
                text="若會員年度累積消費達更高等級門檻，系統將自動升級會員資格，享受更高等級會員權益。"
              />
              <p>
                會員資格以一年週期進行調整，每年結算日（例如：每年12月31日）將根據會員該年度的累積消費金額重新認定等級，若未達原有等級標準，則自動降一級，並依據新等級提供對應權益
              </p>
            </div>
          </div>
          <p className="w-full">
            <span className="desktop-jf-h3 text-primary-main">名稱解析：</span>
            <br />
            <span className="mobile-jf-h5 text-primary-main">
              以善為念，福德庇佑。成為善信，展開與恆春福德宮的 美好緣分。
            </span>
          </p>

          {/* 注意事項 */}
          <div className="w-full flex flex-col gap-y-3">
            <h2 className="text-primary-main desktop-jf-h2">二、注意事項：</h2>
            <div className="text-primary-main mobile-jf-h5">
              <SpecialParagraph
                type="dot"
                text="本宮保有隨時調整或終止本會員制度及權益內容之權利，調整將於官網公告，不另行通知。"
              />
              <SpecialParagraph
                type="dot"
                text="若有相關問題，歡迎透過官網或其他聯繫方式洽詢。"
              />
            </div>
          </div>
        </div>

        {/* Swiper for mobile */}
        <div className="block lg:hidden">
          <MemberLevelMobile />
        </div>

        {/* Member level for desktop */}
        <div className="hidden px-4 lg:block">
          <div className="w-full flex flex-col gap-y-3">
            <h2 className="text-primary-main desktop-jf-h2">三、會員等級：</h2>
            <MemberLevelDesktop />
          </div>
        </div>

        {/* Button */}
        <div className="px-4">
          <div className="w-full max-w-[250px] mx-auto flex justify-center">
            <Link
              href={PATHS.Settings.child.MeritCards.path}
              className="inline-block text-center primary-button text-white desktop-jf-h3"
            >
              回上一頁
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default BenefitsView
