'use client'

import { Popover } from '@mui/material'
import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { IoChevronUp } from 'react-icons/io5'

import { useAuthContext } from '@/auth/hooks'

function SettingsSidebarMobile({ menuList }) {
  const router = useRouter()

  const pathname = usePathname()

  const currentData = menuList.find(item => item.path === pathname)

  const [anchorElement, setAnchorElement] = useState()
  const open = Boolean(anchorElement)
  const id = open ? 'language-select-popover' : undefined

  const { handleLogout } = useAuthContext()

  const handleLogoutButtonClick = useCallback(async () => {
    try {
      await handleLogout()
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }, [handleLogout, router])

  const onLanguageButtonClick = useCallback(event => {
    setAnchorElement(event.currentTarget)
  }, [])

  const onPopoverClose = useCallback(() => {
    setAnchorElement(undefined)
  }, [])

  const onPopoverButtonClick = useCallback(
    event => {
      const { path } = event.currentTarget.dataset
      console.log('[onPopoverButtonClick] path:', path)

      if (path === '/logout') {
        handleLogoutButtonClick()
        router.refresh()
      } else {
        router.push(path)
      }

      onPopoverClose()
    },
    [router, onPopoverClose, handleLogoutButtonClick],
  )

  const menuListWithLogout = useMemo(() => {
    return [
      ...menuList,
      {
        title: '銀行匯款專戶：000 4221 2234 801',
        class:
          'cursor-not-allowed !text-dark-500 desktop-jf-h4 border-t-[1px] border-t-dark-500 border-dashed !cursor-not-allowed',
      },
      {
        title: (
          <p className="flex gap-x-2 items-center justify-center">
            <FiLogOut />
            <span className="desktop-jf-h3 text-white">登出</span>
          </p>
        ),
        path: '/logout',
        class: 'bg-secondary-notion text-white text-center',
      },
    ]
  }, [menuList])

  return (
    <div className="sm:hidden">
      <button
        className="cursor-pointer w-full p-3 bg-secondary-notion desktop-jf-h3 text-white rounded-lg flex justify-between items-center"
        onClick={onLanguageButtonClick}
      >
        <span>{currentData.title}</span>
        <IoChevronUp className="text-xl" />
      </button>
      <Popover
        id={id}
        transitionDuration={0}
        open={open}
        anchorEl={anchorElement}
        onClose={onPopoverClose}
        classes={{
          paper: 'w-full flex flex-col',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {menuListWithLogout.map(menu => (
          <button
            key={menu.title}
            data-language={menu.title}
            onClick={onPopoverButtonClick}
            data-path={menu.path}
            className={clsx(
              'text-left w-full p-3 cursor-pointer text-primary-main active:bg-secondary-notion/30 desktop-jf-h3',
              menu.class && menu.class,
              menu.path === currentData.path && 'bg-secondary-notion/30',
            )}
          >
            {menu.title}
          </button>
        ))}
      </Popover>
    </div>
  )
}

export default SettingsSidebarMobile
