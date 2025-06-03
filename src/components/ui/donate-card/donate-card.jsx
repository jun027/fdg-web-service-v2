import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'
import { FaInfinity } from 'react-icons/fa6'
import { MdPerson } from 'react-icons/md'

import {
  MONTHLY_DONATION_TYPE,
  SINGLE_DONATION_TYPE,
} from '@/constants/projects'

import { ProgressBarView } from '../progress-bar'

function DonateCard({
  id = 'donate-card',
  imageData = {
    src: 'https://dummyimage.com/270x170/cccccc/000000.png&text=',
    alt: 'picture',
    width: 270,
    height: 170,
  },
  title = '弱勢群體服務計劃',
  infiniteDonateAmount = false,
  progress = 0,
  donatedCount = 0,
  donateType = '1',
  totalAmount = 0,
  donateAmount = 0,
  buttonData = {
    text: '單次捐款',
    href: '/',
  },
}) {
  return (
    <div className="relative inline-block rounded-2xl border-solid border-primary-main border-2 bg-white">
      <div className="p-4 flex flex-col gap-3">
        <div className="w-[270px] relative aspect-[270/170] rounded-2xl overflow-hidden text-7xl">
          <Image
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={imageData.src}
            alt={imageData.alt}
            width={imageData.width}
            height={imageData.height}
          />
        </div>

        <div className="flex flex-col gap-6 justify-start items-center">
          <div className="flex flex-col gap-3 w-[226px] mx-auto">
            <h1 className="text-primary-main text-center desktop-jf-h1">
              {title}
            </h1>
            <div
              data-progress={progress}
              className="relative w-full aspect-[217/140]"
            >
              <ProgressBarView id={id} progress={progress} />

              <div className="pos-center z-10 flex flex-col justify-between items-center">
                <p className="desktop-jf-h2 text-primary-main">
                  ${totalAmount}
                </p>
                <p className="text-2xl text-primary-main">
                  {infiniteDonateAmount ? <FaInfinity /> : ''}
                </p>
              </div>
            </div>
            <p className="flex justify-between items-center">
              <span className="desktop-jf-h3 text-primary-main">
                {`NT$ ${donateAmount} / 每${donateType === SINGLE_DONATION_TYPE ? '次' : '月'}`}
              </span>
              <span className="desktop-jf-h3 text-primary-main flex items-center gap-1">
                <MdPerson className="text-2xl" /> {donatedCount} 人
              </span>
            </p>
          </div>
          <Link
            href={buttonData.href}
            className={clsx(
              'rounded-[8px] text-center w-full py-3 text-white desktop-jf-h3',
              donateType === SINGLE_DONATION_TYPE && 'bg-primary-main',
              donateType === MONTHLY_DONATION_TYPE && 'bg-secondary-notion',
            )}
          >
            {buttonData.text}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default memo(DonateCard)
