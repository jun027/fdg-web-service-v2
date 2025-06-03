'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { historyData } from './constants/history-data'

export default function HistoryViewDesktop() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [rotateDeg, setRotateDeg] = useState(0)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [shouldForceLockOnEnter, setShouldForceLockOnEnter] = useState(false)

  const containerRef = useRef(null)
  const lastActiveIndexRef = useRef(0)
  const lastInViewRef = useRef(false)

  const { ref: sectionRef, inView: isInView } = useInView({
    threshold: 0.8,
  })

  const handleScroll = event => {
    const scrollTop = event.currentTarget.scrollTop
    const height = event.currentTarget.clientHeight
    const index = Math.round(scrollTop / height)
    setActiveIndex(index)
  }

  const dotPositions = [
    { top: '86%', left: '50%' },
    { top: '79%', left: '71%' },
    { top: '62%', left: '83%' },
    { top: '40%', left: '84%' },
    { top: '22%', left: '71%' },
  ]

  useEffect(() => {
    const degree = (activeIndex / historyData.length) * 180 - 90
    setRotateDeg(degree)
  }, [activeIndex])

  useEffect(() => {
    const html = document.documentElement
    const previousIndex = lastActiveIndexRef.current
    const isScrollingDown = activeIndex > previousIndex
    const isScrollingUp = activeIndex < previousIndex

    const isAtTop = activeIndex === 0
    const isAtBottom = activeIndex === historyData.length - 1
    const isNotAtTop = !isAtTop
    const isNotAtBottom = !isAtBottom

    if (isInView && !lastInViewRef.current) {
      setShouldForceLockOnEnter(true)
    }

    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true)
    }

    const shouldLock =
      isInView &&
      shouldForceLockOnEnter &&
      ((isScrollingDown && isNotAtBottom) ||
        (isScrollingUp && isNotAtTop) ||
        isAtBottom ||
        isAtTop)

    html.style.overflow = shouldLock ? 'hidden' : ''

    if (hasScrolledToBottom && isInView && isAtTop && isScrollingUp) {
      html.style.overflow = ''
      setHasScrolledToBottom(false)
      setShouldForceLockOnEnter(false)
    }

    if (isInView && isAtBottom && isScrollingDown) {
      html.style.overflow = ''
      setShouldForceLockOnEnter(false)
    }

    lastInViewRef.current = isInView
    lastActiveIndexRef.current = activeIndex

    return () => {
      html.style.overflow = ''
    }
  }, [isInView, activeIndex, hasScrolledToBottom, shouldForceLockOnEnter])

  return (
    <div
      ref={sectionRef}
      className="relative bg-cover bg-center bg-no-repeat py-16"
      style={{
        backgroundImage: "url('/images/cover/cover-background-01.png')",
      }}
    >
      <div className="flex max-w-[1440px] h-[834px] mx-auto">
        <div className="flex w-full">
          <div className="relative w-[720px] shrink-0 overflow-hidden">
            <motion.div
              animate={{ rotate: rotateDeg }}
              transition={{ duration: 0.8 }}
              className="absolute top-1/2 left-[-480px] -translate-y-1/2"
            >
              <div className="relative w-[1012px] h-[1012px]">
                <Image
                  src="/images/cover/history-01.png"
                  alt="轉盤"
                  width={2040}
                  height={2039}
                  className="w-full h-full object-contain"
                />
                {historyData.map((_, index) => {
                  const isActive = activeIndex === index
                  const pos = dotPositions[index] || { top: '50%', left: '50%' }
                  return (
                    <div
                      key={index}
                      className={`absolute rounded-full bg-white transition-all duration-300 ease-in-out ${
                        isActive ? 'w-10 h-10' : 'w-5 h-5'
                      }`}
                      style={{
                        top: pos.top,
                        left: pos.left,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  )
                })}
              </div>
            </motion.div>

            <div className="absolute top-1/2 left-[522px] -translate-y-1/2 text-[#5D4037]">
              <span className="absolute -top-[340px] -left-32 desktop-jf-h1">
                {historyData[activeIndex - 1]?.year ?? ''}
              </span>
              <div className="flex items-center">
                <Image
                  src="/images/icons/arrow-icon.svg"
                  alt="arrow"
                  width={35}
                  height={35}
                  className="rotate-[90deg]"
                />
                <span className="ml-2 desktop-jf-number">
                  {historyData[activeIndex]?.year}
                </span>
              </div>
              <span className="absolute top-[340px] -left-28 desktop-jf-h1">
                {historyData[activeIndex + 1]?.year ?? ''}
              </span>
            </div>
          </div>

          <div
            ref={containerRef}
            onScroll={isInView ? handleScroll : undefined}
            className={`flex-1 snap-y snap-mandatory pl-14 ${
              isInView ? 'overflow-y-scroll' : 'overflow-hidden'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {historyData.map((item, index) => (
              <div
                key={index}
                className="h-full snap-start flex items-center pb-22"
              >
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="space-y-6 text-[#5D4037] max-w-[567px]"
                    >
                      <div className="relative flex items-center">
                        <Image
                          src="/images/icons/rock-icon-02.png"
                          alt="rock"
                          width={144}
                          height={143}
                          className="w-[77px] aspect-square absolute -left-5 -top-2 z-0"
                        />
                        <h2 className="desktop-fz-h1 z-10">{item.title}</h2>
                      </div>
                      <p className="desktop-jf-h1">{item.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
