import clsx from 'clsx'

import { BENEFITS_CONFIG } from './config'

function MemberLevelDesktop() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-row desktop-jf-h3 text-primary-main rounded-tl-2xl rounded-tr-2xl border-primary-main border bg-white">
          <div className="w-[70px] py-3 pl-4">等級</div>
          <div className="w-[180px] py-3">會員名稱</div>
          <div className="w-[180px] py-3">累積消費門檻</div>
          <div className="w-[180px] py-3">消費折扣</div>
          <div className="flex-1 py-3 pr-4">名稱解析</div>
        </div>
        <div className="rounded-bl-2xl rounded-br-2xl border-primary-main border border-t-0 bg-white text-primary-main">
          {BENEFITS_CONFIG.map((item, index) => {
            return (
              <div
                className={clsx(
                  'flex flex-row desktop-jf-h4',
                  index !== BENEFITS_CONFIG.length - 1 &&
                    'border-b-[1px] border-primary-main/20',
                )}
                key={item.level}
              >
                <div className="w-[70px] py-3 pl-4">{item.level}</div>
                <div className="w-[180px] py-3">{item.name}</div>
                <div className="w-[180px] py-3">{item.spendingThreshold}</div>
                <div className="w-[180px] py-3">{item.discount}</div>
                <div className="flex-1 py-3 pr-4">{item.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MemberLevelDesktop
