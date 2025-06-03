'use client'

import { Pagination } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import { memo, useMemo, useState } from 'react'

import { CATEGORY_TYPE } from './config/category-type'

function NewsContainer({ list }) {
  const [currentCategory, setCurrentCategory] = useState(0)
  const [currentPageNumber, setCurrentPageNumber] = useState(1)

  const currentPageWithCategory = useMemo(() => {
    return currentCategory === CATEGORY_TYPE.All.id
      ? list
      : list.filter(item => item.type === currentCategory)
  }, [currentCategory, list])
  const paginationCount = useMemo(() => {
    return Math.ceil(currentPageWithCategory.length / 10)
  }, [currentPageWithCategory.length])
  const currentPageList = useMemo(() => {
    const startIndex = (currentPageNumber - 1) * 10
    const endIndex = startIndex + 10
    const currentPageList_ = currentPageWithCategory.slice(startIndex, endIndex)

    return currentPageList_
  }, [currentPageNumber, currentPageWithCategory])

  const handleChangePage = (_, page) => {
    setCurrentPageNumber(page)
  }

  const handleChangeCategory = category => {
    setCurrentCategory(category)
    setCurrentPageNumber(1)
  }

  return (
    <div className="flex flex-col gap-y-6">
      {/* 標題 */}
      <div className="flex items-center gap-6 pl-3">
        <h2 className="relative text-primary-main desktop-fz-h2">
          <Image
            src={'/images/icons/rock-icon-02.png'}
            alt="rock-icon-02"
            width={144}
            height={143}
            className="absolute top-0 -left-4 aspect-square w-10"
          />
          <span className="relative z-10">消息總覽</span>
        </h2>
        <span className="block flex-1 w-full h-[2px] bg-primary-main" />
      </div>

      {/* 分類按鈕 */}
      <div className="flex flex-row justify-start items-center gap-x-3">
        {Object.values(CATEGORY_TYPE).map(item => (
          <button
            type="button"
            key={item.id}
            style={{
              backgroundColor:
                currentCategory === item.id ? item.bgColor : 'transparent',
              color:
                currentCategory === 0
                  ? '#5D4037'
                  : currentCategory === item.id
                    ? '#fff'
                    : '#5D4037',
            }}
            className={clsx(
              'cursor-pointer px-3 py-1 border rounded-full text-primary-main desktop-jf-h4 bg-transparent',
            )}
            onClick={() => handleChangeCategory(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* 消息列表 */}
      <div>
        <div className="flex flex-col gap-y-6">
          {currentPageList.map(item => {
            const type = Object.values(CATEGORY_TYPE).find(
              type => type.id === item.type,
            )

            const name = type?.name

            return (
              <div
                key={item.id}
                className="flex flex-col justify-start items-start gap-y-3 pb-6 border-b border-netural-400 lg:flex-row lg:items-center lg:gap-x-6"
              >
                <div className="flex flex-row items-center gap-x-3 lg:flex-row-reverse">
                  <div
                    style={{ backgroundColor: type.bgColor }}
                    className={clsx(
                      'text-center rounded-full px-[10px] py-1 mobile-jf-h5 text-white lg:w-[90px]',
                    )}
                  >
                    {name}
                  </div>
                  <p className="text-primary-main mobile-jf-h4">{item.date}</p>
                </div>
                <div>
                  <p className="text-primary-main desktop-jf-h3 h-[40px] overflow-hidden text-ellipsis line-clamp-2 lg:flex-1 lg:line-clamp-1 lg:h-[20px]">
                    {item.previewContent}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex justify-center items-center py-12 lg:py-24">
          <Pagination
            sx={{
              '& .MuiPaginationItem-previousNext': {
                color: '#5D4037',
              },
              '& .MuiPaginationItem-text': {
                color: '#5D4037',
              },
              '& .MuiPaginationItem-root.Mui-selected': {
                backgroundColor: '#5D4037',
                color: '#fff',
              },
            }}
            count={paginationCount}
            page={currentPageNumber}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(NewsContainer)
