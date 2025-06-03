'use client'

import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { BsPersonFill } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'

import { useMobileMenuContext } from '@/store/use-mobile-menu-context'

import HeaderDrawerMenuList from './header-drawer-menu-list'
import UserStatus from './user-status'

function MobileMenu() {
  const isOpen = useMobileMenuContext(state => state.isOpen)
  const setOpen = useMobileMenuContext(state => state.setOpen)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="absolute right-0 h-full w-full max-w-[100vw]">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative h-full w-full overflow-hidden">
                <Image
                  src="/images/cover/cover-nav-m-01.png"
                  alt="menu bg"
                  fill
                  className="object-cover object-center  mix-blend-overlay"
                  priority
                />

                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4 text-white">
                      <BsPersonFill size={24} />
                      <UserStatus />
                    </div>
                    <button
                      onClick={() => setOpen(false)}
                      className="absolute top-0 right-0 w-[80px] h-[80px] bg-[#FFFBF3]/75 rounded-bl-[32px] flex items-center justify-center text-[#5D4037] z-[60]"
                    >
                      <FaTimes size={36} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-7">
                    <HeaderDrawerMenuList />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default MobileMenu
