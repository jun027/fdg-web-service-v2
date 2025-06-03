'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

import { PATHS } from '@/routes/path'

function ConfirmContainer() {
  const searchParams = useSearchParams()

  const type = searchParams.get('type')

  let message = ''
  switch (type) {
    case 'forgot-account': {
      message =
        '「您的帳號資訊已成功發送至您的電子郵件，請檢查收件夾或垃圾郵件夾，若未收到請稍後再試或聯繫客服」'
      break
    }
    case 'forgot-password': {
      message =
        '「您的密碼已成功重設，請使用新密碼登入，若未收到請稍後再試或聯繫客服」'
      break
    }
    default: {
      message = '「發送失敗，請稍後再試或聯繫客服」'
      break
    }
  }

  return (
    <div className="overflow-auto flex-1">
      <div className="pb-6 flex flex-col min-h-full gap-6 sm:w-full sm:justify-center sm:py-8 sm:px-12 lg:py-16 lg:px-20 xl:py-28 xl:px-32">
        {/* Header */}
        <div className="flex flex-col gap-y-3 items-center px-4 sm:px-9">
          <div className="w-16 aspect-square bg-[url(/images/icons/success-icon-01.png)] bg-no-repeat bg-center bg-cover" />
          <h2 className="desktop-fz-h2 text-primary-main">發送成功</h2>
          <p className=" text-primary-main desktop-jf-h3">{message}</p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Buttons */}
          <div className="flex flex-col gap-9 items-center px-4 sm:px-9">
            <Link
              href={PATHS.Auth.child.Login.path}
              className="primary-button text-white desktop-jf-h3 text-center"
            >
              返回登入
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function ConfirmView({ children }) {
  return (
    <Suspense>
      <ConfirmContainer>{children}</ConfirmContainer>
    </Suspense>
  )
}

export default ConfirmView
