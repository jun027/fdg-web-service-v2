'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import { maindeityData } from './constants/maindeity-data'

export default function MainDeityDesktop() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="bg-[#5D4037]">
      <div className="relative w-full h-[907px] max-w-[1440px] mx-auto overflow-x-auto">
        {maindeityData.map((item, index) => {
          const isActive = index === activeIndex
          const baseLeft = index * 180
          const translateX = index < activeIndex ? '-600px' : '0px'

          return (
            <div
              key={index}
              onClick={() =>
                setActiveIndex(previous =>
                  previous === index ? undefined : index,
                )
              }
              className={clsx(
                'absolute top-0 w-[899px] h-[907px] transition-all duration-500 ease-in-out cursor-pointer',
              )}
              style={{
                left: `${baseLeft}px`,
                transform: `translateX(${translateX})`,
                zIndex: maindeityData.length - index,
              }}
            >
              <Image
                src={item.image.desktop}
                alt={item.title}
                width={1881}
                height={1735}
                className={clsx(
                  'w-full h-full select-none pointer-events-none transition-all duration-300',
                  !isActive && 'blur-[2.5px]',
                )}
              />

              {isActive && (
                <div className="absolute left-20 bottom-10 z-10 text-white pointer-events-none transition-opacity duration-500">
                  <h2 className="desktop-fz-h1 [text-shadow:0px_1px_2.3px_rgba(0,0,0,0.8)]">
                    {item.title}
                    {item.subtitle && `｜${item.subtitle}`}
                  </h2>
                  <p className="desktop-jf-h1 w-[494px] [text-shadow:0px_1px_2.3px_rgba(0,0,0,0.8)]">
                    {item.description}
                  </p>
                </div>
              )}

              {!isActive && (
                <div className="absolute inset-0 flex items-center justify-end pr-24 pointer-events-none">
                  <div className="text-white desktop-fz-h1 writing-vertical-rl">
                    {item.title}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
