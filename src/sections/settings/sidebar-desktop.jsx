'use client'

import { useCopyToClipboard } from '@uidotdev/usehooks'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { FaAngleRight, FaRegCopy } from 'react-icons/fa6'

import { useAuthContext } from '@/auth/hooks'
import { CONFIG } from '@/config-global'

function SettingsSidebarDesktop({ menuList }) {
  const router = useRouter()
  const pathname = usePathname()
  const isActive = href => pathname === href

  const { handleLogout } = useAuthContext()

  // eslint-disable-next-line no-unused-vars
  const [_, copyToClipboard] = useCopyToClipboard()

  const handleCopyClick = useCallback(async () => {
    await copyToClipboard(CONFIG.bankAccount)
    toast.success(`已複製 ${CONFIG.bankAccount}`)
  }, [copyToClipboard])

  const handleLogoutButtonClick = useCallback(async () => {
    try {
      await handleLogout()
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }, [handleLogout, router])

  return (
    <div className="hidden sm:block h-[620px]">
      <div className="flex flex-col justify-between items-stretch h-full">
        <div className="flex flex-col gap-y-3">
          {menuList.map(menu => (
            <Link
              key={menu.title}
              className={clsx(
                'w-full rounded-lg flex items-center justify-between desktop-jf-h3 text-primary-main p-3 transition-colors',
                isActive(menu.path) && 'bg-secondary-notion text-white',
                !isActive(menu.path) && 'hover:bg-secondary-notion/60',
              )}
              href={menu.path}
            >
              {menu.title}
              <FaAngleRight />
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-y-6">
          <div>
            <p className="desktop-jf-h4 text-primary-main">
              銀行匯款指定專用帳戶：
            </p>
            <button
              className="flex items-center gap-x-1 desktop-jf-h4 text-primary-main cursor-pointer"
              onClick={handleCopyClick}
            >
              <FaRegCopy />
              <span>{CONFIG.bankAccount}</span>
            </button>
          </div>
          <button
            className="secondary-button desktop-jf-h2 text-primary-main cursor-pointer"
            onClick={handleLogoutButtonClick}
          >
            登出
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsSidebarDesktop
