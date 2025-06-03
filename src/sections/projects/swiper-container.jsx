'use client'

import 'swiper/css'

import clsx from 'clsx'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import ClientOnlyView from '@/components/common/client-only/client-only-view'
import { DonateCard } from '@/components/ui/donate-card'
import {
  MONTHLY_DONATION_TEXT,
  MONTHLY_DONATION_TYPE,
  SINGLE_DONATION_TEXT,
  SINGLE_DONATION_TYPE,
} from '@/constants/projects'
import { PATHS } from '@/routes/path'

function SwiperContainer({ list = [], type = 'primary', id = 'section' }) {
  const swiperPaginationClassName = {
    primary:
      '[&>*]:!border-primary-main [&>*.swiper-pagination-bullet-active]:!bg-primary-main',
    secondary:
      '[&>*]:!border-secondary-notion [&>*.swiper-pagination-bullet-active]:!bg-secondary-notion',
  }

  return (
    <ClientOnlyView>
      <div id={id} className="flex flex-col gap-y-6">
        <Swiper
          className="w-full xl:w-[1272px] xl:mx-auto"
          spaceBetween={20}
          slidesPerView={'auto'}
          modules={[Pagination]}
          pagination={{
            el: `#${id} .swiperPagination`,
            clickable: true,
          }}
          breakpoints={{
            200: {
              centeredSlides: true,
            },
            640: {
              centeredSlides: true,
            },
            1280: {
              centeredSlides: false,
            },
          }}
        >
          {list.map((item, index) => {
            const hasMonthlyDonation = item.fundraise_plan_list.some(
              plan => plan.type === MONTHLY_DONATION_TYPE,
            )

            let minDonateAmount = 0
            minDonateAmount = hasMonthlyDonation
              ? item.fundraise_plan_list.reduce((min, plan) => {
                  if (plan.type === MONTHLY_DONATION_TYPE) {
                    return Math.min(min, plan.amount)
                  }
                  return min
                }, Infinity)
              : item.fundraise_plan_list.reduce((min, plan) => {
                  return Math.min(min, plan.amount)
                }, Infinity)

            const progress =
              item.total_amount / item.limit_amount < 0.1
                ? 0
                : Math.floor((item.total_amount / item.limit_amount) * 10) / 10

            return (
              <SwiperSlide key={index} className="!w-[302px]">
                <DonateCard
                  id={`donate-card-${index}`}
                  title={item.name}
                  imageData={{
                    src: `/images/projects/thumbnail/${item.id}.webp`,
                    alt: item.name,
                    width: 270,
                    height: 170,
                  }}
                  donatedCount={item.sub_peoples}
                  donateType={
                    hasMonthlyDonation
                      ? MONTHLY_DONATION_TYPE
                      : SINGLE_DONATION_TYPE
                  }
                  totalAmount={item.total_amount}
                  donateAmount={minDonateAmount}
                  progress={progress}
                  buttonData={{
                    text:
                      item.buttonTextType === MONTHLY_DONATION_TYPE
                        ? MONTHLY_DONATION_TEXT
                        : SINGLE_DONATION_TEXT,
                    href: `${PATHS.Projects.path}/${item.id}`,
                  }}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div
          className={clsx(
            'swiperPagination flex justify-center gap-x-3 [&>*]:!w-3 [&>*]:!h-3 [&>*]:!rounded-full [&>*]:!border-[1px] [&>*]:!bg-transparent [&>*]:!cursor-pointer [&>*]:!opacity-100 [&>*.swiper-pagination-bullet-active]:!opacity-100',
            swiperPaginationClassName[type],
          )}
        />
      </div>
    </ClientOnlyView>
  )
}

export default SwiperContainer
