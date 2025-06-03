'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

import { getMeritInfoAPI } from '@/apis/hook/use-member'

import ProgressBar from './progress-bar'

function MeritCardsView() {
  const { data: meritInfo } = useQuery({
    queryKey: ['merit-info'],
    initialData: {
      member_name: '',
      member_level: 1,
      level_name: '',
      current_spent_amount: 0,
      threshold_amount: 0,
      vip_expiry_date: '1910-01-01',
    },
    queryFn: () => getMeritInfoAPI(),
  })

  const progress = useMemo(() => {
    return Math.min(
      Math.round(
        (meritInfo.current_spent_amount / meritInfo.threshold_amount) * 100,
      ),
      100,
    )
  }, [meritInfo.current_spent_amount, meritInfo.threshold_amount])

  const amountToNextLevel =
    meritInfo.threshold_amount - meritInfo.current_spent_amount

  return (
    <main>
      <div className="pb-16 flex flex-col gap-y-4 sm:gap-y-5">
        <div className="flex flex-col gap-y-5">
          <h2 className="text-primary-main desktop-jf-number text-center">
            您好！
          </h2>
          <p className="text-primary-main desktop-jf-h4 text-center">
            {meritInfo.level_name}
          </p>
        </div>
        <div className="flex flex-col gap-y-8">
          {/* Progress Bar */}
          <div className="gap-x-3 items-center hidden w-full max-w-[550px] mx-auto sm:flex sm:mt-10">
            <p className="text-primary-main desktop-jf-h3 w-[60px] text-right">
              Lv.{meritInfo.member_level}
            </p>
            <div className="flex-1">
              <ProgressBar
                progress={progress}
                currentAmount={meritInfo.current_spent_amount}
              />
            </div>
            <p className="text-primary-main desktop-jf-h3 w-[60px]">
              ${meritInfo.threshold_amount}
            </p>
          </div>

          {/* Merit Card */}
          <div className="relative max-w-[343px] mx-auto">
            {/* Background Image */}
            <Image
              src="/images/page/settings/merit-cards-01.png"
              alt={`VIP ${meritInfo.member_level} Merit Card`}
              width={702}
              height={456}
              className="aspect-[702/456] w-full"
              priority
            />

            <div className="absolute top-0 left-0 w-full h-full p-4">
              <div className="relative w-full h-full">
                {/* VIP Level */}
                <p className="absolute -top-3 left-0 desktop-fz-h2 text-white">
                  VIP {meritInfo.member_level}
                </p>

                {/* Progress Bar */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full sm:hidden">
                  <ProgressBar
                    progress={progress}
                    currentAmount={meritInfo.current_spent_amount}
                  />
                </div>

                {/* Target Amount */}
                <div className="absolute top-[60%] left-0 -translate-y-1/2 w-full sm:hidden">
                  <p className="text-primary-main mobile-jf-h5 text-right">
                    ${meritInfo.threshold_amount}
                  </p>
                </div>

                {/* Expiration Date */}
                <p className="absolute bottom-0 left-0 mobile-jf-h5 text-primary-main">
                  {meritInfo.vip_expiry_date} 到期
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Level Description */}
        <p className="mobile-jf-h5 text-primary-main sm:hidden">
          距離下一階福報等級僅差 {amountToNextLevel}{' '}
          元，升等後可享專署祈福與感謝回饋。
        </p>

        {/* Benefit Details Link */}
        <Link
          href="/benefits"
          className="mobile-jf-h5 text-primary-main underline underline-offset-2 sm:desktop-jf-h3 sm:text-center"
          aria-label="查看權益說明"
        >
          權益說明
        </Link>
      </div>
    </main>
  )
}

export default MeritCardsView
