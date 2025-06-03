'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { historyData } from './constants/history-data'

export default function HistoryViewMobile() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [rotateDeg, setRotateDeg] = useState(0)

  const handleScroll = event => {
    const scrollTop = event.target.scrollTop
    const height = event.target.clientHeight
    const scrollHeight = event.target.scrollHeight
    const maxScroll = scrollHeight - height

    const index = Math.round(scrollTop / height)
    setActiveIndex(index)

    const scrollPercent = scrollTop / maxScroll
    const degree = scrollPercent * 180
    setRotateDeg(degree)
  }

  const dotPositions = [
    { top: '85%', left: '50%' },
    { top: '75%', left: '75%' },
    { top: '50%', left: '85%' },
    { top: '25%', left: '75%' },
    { top: '14%', left: '50%' },
  ]

  return (
    <div
      className="relative overflow-x-hidden bg-cover bg-no-repeat w-full min-h-screen"
      style={{
        backgroundImage: "url('/images/cover/history-background-m.png')",
      }}
    >
      <div className="sticky top-0 h-screen z-50 overflow-hidden">
        <div
          className="h-screen overflow-y-scroll snap-y snap-mandatory flex justify-center"
          onScroll={handleScroll}
        >
          <div className="w-full max-w-[320px]">
            {historyData.map((item, index) => (
              <div
                key={index}
                className="h-screen flex flex-col justify-start items-center px-4 pt-40 snap-start"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.8 }}
                  className="text-center flex flex-col items-center space-y-6"
                >
                  <div className="flex justify-center items-center">
                    <div className="relative inline-block">
                      <Image
                        src="/images/icons/rock-icon-02.png"
                        alt="rock"
                        width={144}
                        height={143}
                        className="w-[57px] absolute -left-5 top-1 z-0"
                      />
                      <span className="relative z-10 text-[#5D4037] mobile-fz-h1">
                        {item.title.charAt(0)}
                      </span>
                    </div>
                    <h2 className="text-[#5D4037] mobile-fz-h1">
                      {item.title.slice(1)}
                    </h2>
                  </div>
                  <p className="text-[#5D4037] desktop-jf-h3 max-w-[255px] text-center">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[300px] left-1/2 -translate-x-1/2 w-full max-w-[320px] sm:bottom-[366px] z-20">
        <div className="relative w-full h-[80px]">
          {activeIndex > 0 && (
            <span className="absolute left-0 top-30 -rotate-[30deg] text-[#5D4037] mobile-jf-h4">
              {historyData[activeIndex - 1].year}
            </span>
          )}
          <div className="absolute left-1/2 top-17 -translate-x-1/2 flex flex-col items-center">
            <span className="text-[#5D4037] mobile-jf-h3">
              {historyData[activeIndex].year}
            </span>
            <Image
              src="/images/icons/arrow-icon.svg"
              alt="arrow"
              width={24}
              height={24}
              className="mt-[2px]"
            />
          </div>
          {activeIndex < historyData.length - 1 && (
            <span className="absolute right-0 top-30 rotate-[30deg] text-[#5D4037] mobile-jf-h4">
              {historyData[activeIndex + 1].year}
            </span>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] max-w-[480px] sm:max-w-[600px] aspect-[2/1.1] overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ rotate: rotateDeg }}
          transition={{ duration: 0.6 }}
          className="w-full aspect-square rotate-[-180deg] relative"
        >
          <Image
            src="/images/cover/history-01.png"
            alt="轉盤"
            width={2040}
            height={2039}
            className="w-full h-full"
          />

          {historyData.map((_, index) => {
            const isActive = activeIndex === index
            const pos = dotPositions[index] || { top: '50%', left: '50%' }

            return (
              <div
                key={index}
                className={`absolute rounded-full bg-white transition-all duration-300 ease-in-out ${
                  isActive ? 'w-6 h-6' : 'w-[14px] h-[14px]'
                }`}
                style={{
                  top: pos.top,
                  left: pos.left,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}
