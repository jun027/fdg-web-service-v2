'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { memo, useMemo } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CATEGORY_TYPE } from './config/category-type'
import NewsCard, { NEWS_CARD_TYPE } from './news-card'

function NewsBlocks({ id = 'new-blocks', list = [] }) {
  const newsDataList = useMemo(() => {
    return list.filter(item => item.type === CATEGORY_TYPE.News.id).slice(0, 3)
  }, [list])

  const eventDataList = useMemo(() => {
    return list.filter(item => item.type === CATEGORY_TYPE.Event.id).slice(0, 1)
  }, [list])

  const relatedDataList = useMemo(() => {
    return list
      .filter(item => item.type === CATEGORY_TYPE.Related.id)
      .slice(0, 4)
  }, [list])

  return (
    <div id={id} className="flex flex-col gap-y-5">
      <Swiper
        className="w-full xl:w-[1272px] xl:mx-auto"
        spaceBetween={20}
        // slidesPerView={'auto'}
        modules={[Pagination]}
        pagination={{
          el: `#${id} .swiperPagination`,
          clickable: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        <SwiperSlide>
          <h2 className="relative text-primary-main desktop-fz-h2 pl-4">
            <Image
              src={'/images/icons/rock-icon-02.png'}
              alt="rock-icon-02"
              width={144}
              height={143}
              className="absolute top-0 left-0 aspect-square w-10"
            />
            <span className="relative z-10">最新消息</span>
          </h2>
          <div className="flex flex-col gap-y-3 p-1">
            {newsDataList.map((item, index) => (
              <NewsCard
                key={item.id}
                title={item.title}
                imageUrl={item.previewImage}
                height={index === 0 ? '270px' : '120px'}
              />
            ))}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <h2 className="relative text-primary-main desktop-fz-h2 pl-4">
            <Image
              src={'/images/icons/rock-icon-02.png'}
              alt="rock-icon-02"
              width={144}
              height={143}
              className="absolute top-0 left-0 aspect-square w-10"
            />
            <span className="relative z-10">限時活動</span>
          </h2>
          <div className="flex flex-col gap-y-3 p-1">
            {eventDataList.map(item => (
              <NewsCard
                key={item.id}
                title={item.title}
                imageUrl={item.previewImage}
                height="534px"
              />
            ))}
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <h2 className="relative text-primary-main desktop-fz-h2 pl-4">
            <Image
              src={'/images/icons/rock-icon-02.png'}
              alt="rock-icon-02"
              width={144}
              height={143}
              className="absolute top-0 left-0 aspect-square w-10"
            />
            <span className="relative z-10">相關新聞</span>
          </h2>
          <div className="flex flex-col gap-y-3 p-1">
            {relatedDataList.map(item => (
              <NewsCard
                key={item.id}
                title={item.title}
                imageUrl={item.previewImage}
                height="124px"
              />
            ))}
          </div>
        </SwiperSlide>
      </Swiper>
      <div
        className={clsx(
          'swiperPagination flex justify-center gap-x-3 [&>*]:!w-3 [&>*]:!h-3 [&>*]:!rounded-full [&>*]:!bg-[#D9D9D9] [&>*]:!mx-0 [&>*]:!cursor-pointer [&>*]:!opacity-100 [&>*.swiper-pagination-bullet-active]:!opacity-100',
          '[&>*]:!border-primary-main [&>*.swiper-pagination-bullet-active]:!bg-primary-main',
        )}
      />
    </div>
  )
}

export default memo(NewsBlocks)
