'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'
import { HiMenu } from 'react-icons/hi'

import { PATHS } from '@/routes/path'
import { useMobileMenuContext } from '@/store/use-mobile-menu-context'

import MobileMenu from './header-menu-mobile'

function HeaderMobile() {
  const setOpen = useMobileMenuContext(state => state.setOpen)

  const onOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-xs border-b border-white/20">
        <div className="relative z-10 px-4 py-[14px] h-20 flex justify-between items-center">
          <Link href={PATHS.Home.path} className="inline-block">
            <Image
              src={'/images/icons/app-icon-01.png'}
              alt="app-icon"
              width={104}
              height={104}
              className="aspect-square w-[52px]"
            />
          </Link>

          <h2 className="desktop-fz-p text-[#5D4037]">恆春郡福德宮</h2>

          <div className="w-16 flex justify-end items-center">
            <button
              className="p-1 hover:opacity-80 transition-opacity"
              onClick={onOpen}
            >
              <HiMenu className="text-[#5D4037] text-[50px]" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu />
    </>
  )
}

export default HeaderMobile
