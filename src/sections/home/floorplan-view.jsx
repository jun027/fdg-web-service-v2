'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const CIRCLE_ITEMS = [
  {
    id: 1,
    label: '天公爐',
    image: '/images/floorplan/FloorPlan-01.png',
    top: '67%',
    left: '12%',
    size: 42,
    lgTop: '64%',
    lgLeft: '12%',
    lgSize: 110,
  },
  {
    id: 2,
    label: '福德正神',
    image: '/images/floorplan/FloorPlan-02.png',
    top: '35%',
    left: '60%',
    size: 52,
    lgTop: '40%',
    lgLeft: '56%',
    lgSize: 138,
  },
  {
    id: 3,
    label: '岩洞龍王',
    image: '/images/floorplan/FloorPlan-03.png',
    top: '53%',
    left: '76%',
    size: 44,
    lgTop: '53%',
    lgLeft: '72%',
    lgSize: 117,
  },
  {
    id: 4,
    label: '豹爺山軍',
    image: '/images/floorplan/FloorPlan-04.png',
    top: '48%',
    left: '49%',
    size: 36,
    lgTop: '50%',
    lgLeft: '48%',
    lgSize: 96,
  },
  {
    id: 5,
    label: '岩洞虎爺',
    image: '/images/floorplan/FloorPlan-05.png',
    top: '24%',
    left: '47%',
    size: 36,
    lgTop: '32%',
    lgLeft: '45%',
    lgSize: 98,
  },
  {
    id: 6,
    label: '令旗',
    image: '/images/floorplan/FloorPlan-06.png',
    top: '13%',
    left: '38%',
    size: 36,
    lgTop: '24%',
    lgLeft: '38%',
    lgSize: 97,
  },
  {
    id: 7,
    label: '躦轎底',
    image: '/images/floorplan/FloorPlan-07.png',
    top: '28%',
    left: '27%',
    size: 40,
    lgTop: '35%',
    lgLeft: '27%',
    lgSize: 107,
  },
  {
    id: 8,
    label: '太歲爺爐',
    image: '/images/floorplan/FloorPlan-08.png',
    top: '46%',
    left: '7%',
    size: 38,
    lgTop: '48%',
    lgLeft: '8%',
    lgSize: 101,
  },
]

export default function FloorPlanView() {
  const [hoveredId, setHoveredId] = useState()
  const [isDesktop, setIsDesktop] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isMediumTablet, setIsMediumTablet] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMediumTablet(window.innerWidth === 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const checkWidth = () =>
      setIsDesktop(
        typeof globalThis !== 'undefined' && window.innerWidth >= 1024,
      )
    checkWidth()
    window.addEventListener('resize', checkWidth)
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  return (
    <div
      className="relative text-center px-4 lg:px-20 lg:py-16 bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/images/cover/cover-background-01.png')",
      }}
    >
      <div className="max-w-[1440px] mx-auto">
        <h2 className="mobile-fz-h1 text-[#5D4037] pb-6 lg:pb-3">宮廟平面圖</h2>

        <div className="lg:flex lg:items-start lg:justify-between">
          <div className="relative mx-auto lg:w-3/4 lg:py-[115px]">
            <Image
              src="/images/floorplan/FloorPlan-map.png"
              alt="平面圖"
              width={1802}
              height={1270}
              className="w-full h-auto lg:max-w-[900px] lg:max-h-[633px]"
              priority
              onLoad={() => setIsImageLoaded(true)}
            />

            {isImageLoaded &&
              CIRCLE_ITEMS.map(item => (
                <motion.div
                  key={item.id}
                  className="absolute group"
                  style={{
                    top: isDesktop ? item.lgTop : item.top,
                    left: isDesktop ? item.lgLeft : item.left,
                    width: `${isDesktop ? item.lgSize : item.size}px`,
                    height: `${isDesktop ? item.lgSize : item.size}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(undefined)}
                  onTouchStart={() => setHoveredId(item.id)}
                  onTouchEnd={() => setHoveredId(undefined)}
                >
                  <div className="relative w-full h-full">
                    <motion.div
                      className="absolute inset-0"
                      animate={
                        hoveredId === item.id ? { rotate: 360 } : { rotate: 0 }
                      }
                      transition={{ duration: 0.6 }}
                    >
                      <div className="w-full h-full rounded-full border-2 border-dashed border-[#FF8800] shadow-[0.9px_0.9px_1.8px_rgba(93,64,55,0.8)]" />
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={
                        hoveredId === item.id
                          ? { backgroundColor: 'rgba(255, 255, 255, 0.6)' }
                          : { backgroundColor: 'rgba(255, 255, 255, 0)' }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#FF8800] mobile-jf-h4 lg:desktop-jf-number pointer-events-none">
                          {item.id}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}

            {hoveredId !== undefined && (
              <motion.div
                className="absolute z-20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={
                  isDesktop
                    ? {
                        top: `calc(${CIRCLE_ITEMS.find(index => index.id === hoveredId)?.lgTop} - 320px)`,
                        left: `calc(${CIRCLE_ITEMS.find(index => index.id === hoveredId)?.lgLeft} - 70px)`,
                      }
                    : isMediumTablet
                      ? {
                          top: '10%',
                          left: '30%',
                          transform: 'translate(-50%, -50%)',
                        }
                      : {
                          top: '10%',
                          left: '8%',
                          transform: 'translate(-50%, -50%)',
                        }
                }
              >
                <Image
                  src={
                    CIRCLE_ITEMS.find(index => index.id === hoveredId)?.image ||
                    ''
                  }
                  alt="hover"
                  width={715}
                  height={593}
                  priority
                  className="w-[312px] aspect-square object-contain"
                />
              </motion.div>
            )}
          </div>

          <div className="mt-9 lg:pt-[324px] text-[#5D4037]">
            <div className="flex justify-center desktop-fz-p">
              <div className="flex flex-col">
                <p>1</p>
                <p>天</p>
                <p>宮</p>
                <p>爐</p>
              </div>
              <div className="flex flex-col">
                <p>2</p>
                <p>福</p>
                <p>德</p>
                <p>正</p>
                <p>神</p>
              </div>
              <div className="flex flex-col">
                <br />
                <p>福</p>
                <p>德</p>
                <p>夫</p>
                <p>人</p>
              </div>
              <div className="flex flex-col">
                <p>3</p>
                <p>岩</p>
                <p>洞</p>
                <p>龍</p>
                <p>王</p>
              </div>
              <div className="flex flex-col">
                <p>4</p>
                <p>豹</p>
                <p>爺</p>
                <p>山</p>
                <p>軍</p>
              </div>
              <div className="flex flex-col">
                <p>5</p>
                <p>岩</p>
                <p>洞</p>
                <p>虎</p>
                <p>爺</p>
              </div>
              <div className="flex flex-col">
                <p>6</p>
                <p>令</p>
                <p>旗</p>
              </div>
              <div className="flex flex-col">
                <p>7</p>
                <p>躦</p>
                <p>轎</p>
                <p>底</p>
              </div>
              <div className="flex flex-col">
                <p>8</p>
                <p>太</p>
                <p>歲</p>
                <p>爺</p>
                <p>爐</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
