'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function ImageTurn() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/cover/cover-background-01.png')",
      }}
    >
      <div className="relative w-full mx-auto max-w-[1440px]">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center">
          {[0, 1, 2, 3].map(index => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-[16px] h-[16px] rounded-full border-2 ${
                  activeIndex === index
                    ? 'bg-white border-white'
                    : 'border-white'
                }`}
              ></div>
              {index !== 3 && <div className="w-[2px] h-10 bg-white"></div>}
            </div>
          ))}
        </div>

        <div className="hidden lg:block">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            spaceBetween={20}
            slidesPerView={1}
            className="overflow-hidden"
            onSlideChange={swiper => {
              const realIndex = swiper.realIndex % 4
              setActiveIndex(realIndex)
            }}
          >
            {[1, 2, 3, 4].map(number_ => (
              <SwiperSlide key={number_}>
                <Image
                  src={`/images/cover/cover-d-0${number_}.png`}
                  alt={`電腦圖片${number_}`}
                  width={2880}
                  height={1880}
                  className="lg:w-[1440px] lg:h-[900px] object-cover mx-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="block lg:hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            spaceBetween={20}
            slidesPerView={1}
            className="overflow-hidden"
            onSlideChange={swiper => {
              const realIndex = swiper.realIndex % 4
              setActiveIndex(realIndex)
            }}
          >
            {[1, 2, 3, 4].map(number_ => (
              <SwiperSlide key={number_}>
                <Image
                  src={`/images/cover/cover-m-0${number_}.png`}
                  alt={`手機圖片${number_}`}
                  width={750}
                  height={1140}
                  className="w-full h-auto object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-4">
            {[0, 1, 2, 3].map(index => (
              <div
                key={index}
                className={`w-[10px] h-[10px] rounded-full ${
                  activeIndex === index
                    ? 'bg-[#5D4037]'
                    : 'bg-white border border-white'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
