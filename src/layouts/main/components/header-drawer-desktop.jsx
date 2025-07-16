'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { FaBars, FaTimes } from 'react-icons/fa'

import HeaderDrawerMenuList from './header-drawer-menu-list'
import UserStatus from './user-status'

export default function HeaderDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-0 right-0 w-[80px] h-[80px] bg-[#CE9A34] text-white items-center justify-center z-[20] lg:flex hidden"
      >
        <FaBars size={36} />
      </button>

      <div
        className={clsx(
          'hidden lg:block fixed top-0 left-0 w-full h-[773px] z-40 transition-transform duration-300 ease-in-out',
          open ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <div className="relative max-w-[1440px] h-[773px] mx-auto">
          <Image
            src="/images/cover/cover-nav-d-01.png"
            alt="下拉式選單背景"
            className="w-full h-full object-cover"
            width={2880}
            height={1546}
          />

          <div className="absolute top-[64px] right-[-30px] w-[568px] space-y-7 z-50 ">
            <div className="flex items-center gap-3 text-white text-2xl font-bold lg:pl-44">
              <BsPersonFill size={24} />
              {/* <span className="desktop-fz-p">會員登入</span> */}
              <UserStatus />
            </div>
            <HeaderDrawerMenuList />
          </div>

          <button
            onClick={() => setOpen(false)}
            className="absolute top-0 right-0 w-[88px] h-[88px] bg-[#FFFBF3]/75 rounded-bl-[32px] flex items-center justify-center text-[#5D4037] z-[60]"
          >
            <FaTimes size={36} />
          </button>
        </div>
      </div>
    </>
  )
}
