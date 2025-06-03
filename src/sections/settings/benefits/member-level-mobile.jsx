'use client'

import 'swiper/css'

import clsx from 'clsx'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import ClientOnlyView from '@/components/common/client-only/client-only-view'

import BenefitsCard from './benefits-card'
import { BENEFITS_CONFIG } from './config'

function MemberLevelMobile({ type = 'primary', id = 'section' }) {
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
          {BENEFITS_CONFIG.map(item => {
            return (
              <SwiperSlide key={item.level} className="!w-[340px]">
                <BenefitsCard
                  level={item.level}
                  name={item.name}
                  discount={item.discount}
                  description={item.description}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div
          className={clsx(
            'swiperPagination flex justify-center gap-x-2 [&>*]:!w-3 [&>*]:!h-3 [&>*]:!rounded-full [&>*]:!border-[1px] [&>*]:!bg-transparent [&>*]:!cursor-pointer [&>*]:!opacity-100 [&>*.swiper-pagination-bullet-active]:!opacity-100',
            swiperPaginationClassName[type],
          )}
        />
      </div>
    </ClientOnlyView>
  )
}

export default MemberLevelMobile
