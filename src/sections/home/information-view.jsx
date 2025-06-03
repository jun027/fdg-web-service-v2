'use client'

import Image from 'next/image'
import { useState } from 'react'
import { IoArrowForward } from 'react-icons/io5'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const EVENT_LIST = [
  {
    date: '2/5',
    year: '2025',
    title: '補財庫祈福，開啟新年好運',
    description:
      '誠邀信眾參加補財庫祈福法會，點燈祈願、添財納福，讓新的一年財運順遂、事業昌隆。',
  },
  {
    date: '5/10',
    year: '2025',
    title: '宮廟締盟，共襄信仰傳承',
    description:
      '恆春郡福德宮與來山廟德宮締結友好宮廟，攜手推廣信仰文化，傳承地方民俗，共創善緣福德。',
  },
  {
    date: '8/10',
    year: '2025',
    title: '恆春搶孤，體驗傳統競技',
    description:
      '農曆七月十五，信眾搶孤魚塭登塔！挑戰極限，爭奪順風旗，感受百年民俗的震撼魅力。',
  },
]

export default function InformationView() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="px-4 py-10 lg:py-16 lg:px-0">
      <div className="max-w-[1440px] mx-auto px-0 lg:px-20 text-white">
        <div className="text-center space-y-4 lg:space-y-[10px] max-w-[1280px] mx-auto mb-12">
          <h2 className="mobile-fz-h1 lg:desktop-fz-h1">最新消息</h2>
          <p className="mobile-fz-h4 lg:desktop-fz-h3">
            一年之計在於春，補財庫迎新年！元月八號、九號，我們誠邀您參加天公生補財庫活動，一同祈求新的一年財運亨通、事事順遂。
          </p>
        </div>

        <div className="flex flex-col gap-12 lg:gap-16 lg:flex-row lg:items-start">
          <div className="relative lg:w-1/2 lg:mt-18">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              spaceBetween={20}
              slidesPerView={1}
              className="rounded-[16px] overflow-hidden"
              onSlideChange={swiper => {
                const realIndex = swiper.realIndex % 5
                setActiveIndex(realIndex)
              }}
            >
              {[1, 2, 3, 4, 5].map(number_ => (
                <SwiperSlide key={number_}>
                  <Image
                    src={`/images/information/information-0${number_}.png`}
                    alt={`輪播圖${number_}`}
                    width={1019}
                    height={680}
                    className="w-full h-auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-[14px]">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className={`w-[10px] h-[10px] lg:w-[12px] lg:h-[12px] rounded-full ${
                    activeIndex === index ? 'bg-white' : 'border border-white'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 mt-12 lg:mt-18 border-b border-white/50 divide-y divide-white/50 space-y-4">
            {EVENT_LIST.map((item, index) => (
              <div
                key={index}
                className="flex gap-x-6 items-start justify-between lg:py-6"
              >
                <div className="flex flex-col shrink-0">
                  <div className="relative pl-3">
                    <Image
                      src="/images/icons/rock-icon-01.png"
                      alt="rock"
                      width={57}
                      height={67}
                      className="w-[24px] h-[24px] absolute top-1 left-0 z-0"
                    />
                    <p className="relative z-10 desktop-fz-p">{item.date}</p>
                  </div>
                  <p className="desktop-fz-h3 pl-3 lg:-mt-4">{item.year}</p>
                </div>

                <div className="flex-1">
                  <p className="desktop-fz-h3 lg:desktop-fz-h2">{item.title}</p>
                  <p className="desktop-jf-h3 hidden lg:block">
                    {item.description}
                  </p>
                </div>

                <IoArrowForward className="text-[20px] mt-6" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="border border-white py-2 px-6 rounded-[8px] mobile-fz-h4 hover:bg-white hover:text-[#7D5F50] transition flex items-center gap-1">
            查看更多 &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  )
}
