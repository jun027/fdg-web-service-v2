import Link from 'next/link'

import { ProgressStep } from '@/components/ui/progress-step'
import { PROGRESS_STEP_LIST } from '@/components/ui/progress-step/config'
import { PATHS } from '@/routes/path'

function DonateCompleteView() {
  return (
    <main className="main-background">
      <div className="max-w-[1026px] mx-auto px-4 flex flex-col gap-y-12 pt-32 pb-16">
        <div className="w-full max-w-[500px] mx-auto">
          <ProgressStep currentStepId="3" steps={PROGRESS_STEP_LIST} />
        </div>
        <div>
          <p className="desktop-jf-h3 text-primary-main sm:desktop-jf-h1">
            親愛的信眾，您好：
            <br />
            <br />
            感謝您對恆春郡福德宮的無私捐獻！您的善心與愛心不僅為我們的工作提供了寶貴的支持，也將為無數有需要的人帶來希望與幫助。每一筆捐款都是我們持續推動公益活動的重要動力，您的慷慨解囊讓我們更有信心完成使命。
            <br />
            我們承諾，這份愛心將在未來的日子裡，化作實際的行動，讓更多的弱勢族群受益。再次感謝您對我們的信任與支持，願福報與您同在，讓善的循環不斷延續。
            <br />
            <br />
            誠摯的祝福，「恆春郡福德宮」。
          </p>
        </div>
        <div className="w-full max-w-[820px] mx-auto">
          <Link
            href={PATHS.Home.path}
            className="block primary-button text-white desktop-jf-h3 text-center"
          >
            返回首頁
          </Link>
        </div>
      </div>
    </main>
  )
}

export default DonateCompleteView
