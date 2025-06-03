'use client'

import 'swiper/css'
import 'swiper/css/effect-fade'

import Image from 'next/image'
import { memo } from 'react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

function NewsCarousel() {
  const news = [
    {
      image: '/images/news/thumb-01.jpg',
      alt: 'news-1',
    },
    {
      image: '/images/news/thumb-02.jpg',
      alt: 'news-2',
    },
    {
      image: '/images/news/thumb-03.jpg',
      alt: 'news-3',
    },
    {
      image: '/images/news/thumb-04.jpg',
      alt: 'news-4',
    },
  ]

  return (
    <Swiper
      className="w-full"
      spaceBetween={20}
      effect="fade"
      slidesPerView={'auto'}
      modules={[EffectFade, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {news.map(item => (
        <SwiperSlide key={item.image} className="w-full">
          <div className="h-[250px]">
            <Image
              src={item.image}
              alt={item.alt}
              width={2880}
              height={1664}
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default memo(NewsCarousel)
