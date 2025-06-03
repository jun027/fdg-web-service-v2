'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import { maindeityData } from './constants/maindeity-data'

export default function MainDeityMobile() {
  const [activeIndex, setActiveIndex] = useState()

  const handleToggle = index => {
    setActiveIndex(activeIndex === index ? undefined : index)
  }

  const collapsedHeight = 161
  const expandedHeight = 528

  return (
    <div className="bg-[#5D4037]">
      <div className="relative w-full mx-auto">
        {maindeityData.map((item, index) => {
          const isActive = activeIndex === index
          return (
            <div
              key={index}
              className={clsx(
                'relative w-full overflow-hidden transition-all duration-500 cursor-pointer',
              )}
              onClick={() => handleToggle(index)}
              style={{
                marginTop:
                  index === 0
                    ? 0
                    : isActive
                      ? '-144px'
                      : `-${expandedHeight - collapsedHeight}px`,
                zIndex: maindeityData.length - index,
              }}
            >
              <Image
                src={item.image.mobile}
                alt={item.title}
                width={830}
                height={1142}
                className=" w-full h-full object-cover select-none pointer-events-none"
              />

              <div
                className={clsx(
                  'absolute left-0 right-0 bottom-0 px-6 sm:px-10 md:px-12 text-white',
                  { 'h-30': !isActive, 'h-auto': isActive },
                )}
                style={{
                  transition: 'height 0.5s ease',
                }}
              >
                <h2 className="mobile-fz-h1 -mt-4 sm:-mt-16">{item.title}</h2>

                {item.subtitle && (
                  <h3 className={clsx('mobile-fz-h1', { '-mt-8': !isActive })}>
                    {item.subtitle}
                  </h3>
                )}
                {isActive && (
                  <p className="mobile-jf-h4 pb-20 sm:pb-28 md:pb-36">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
