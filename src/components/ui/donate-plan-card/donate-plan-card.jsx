import Link from 'next/link'
import { memo } from 'react'

import { SpecialParagraph } from '@/components/common/special-paragraph'
import { SINGLE_DONATION_TYPE } from '@/constants/projects'

function DonatePlanCard({
  name = '',
  price = 0,
  description = '',
  rewards = [''],
  donateType = '1',
  disabledButton = false,
  href = '/',
}) {
  return (
    <div className="bg-white text-primary-main rounded-2xl border-[1px] border-primary-main p-4 flex flex-col gap-y-4 w-full">
      <p className="desktop-jf-h3">{name}</p>
      <p className="desktop-jf-h2">
        NT${price} / {donateType === SINGLE_DONATION_TYPE ? '次' : '月'}
      </p>
      <div className="desktop-jf-h3">
        {description}
        {rewards.map(reward => (
          <SpecialParagraph key={reward} text={reward} type="dot" />
        ))}
      </div>
      {!disabledButton && (
        <Link
          href={href}
          className="primary-button text-white desktop-jf-h3 text-center"
        >
          選擇專案
        </Link>
      )}
    </div>
  )
}

export default memo(DonatePlanCard)
