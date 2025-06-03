import Image from 'next/image'
import Link from 'next/link'

import { CONFIG } from '@/config-global'
import { PATHS } from '@/routes/path'

import HeaderDrawer from './header-drawer-desktop'
import HeaderMenuDesktop from './header-menu-desktop'

function HeaderDesktop() {
  return (
    <nav className="hidden lg:block fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-xs border-b border-white/20 pl-4">
      <div className="mx-auto flex justify-between items-center h-[80px] pl-4">
        <div className="flex gap-x-12 items-center h-full">
          <Link
            href={PATHS.Home.path}
            className="flex gap-x-[10px] items-center"
            target="_self"
          >
            <Image
              src={'/images/icons/app-icon-01.png'}
              alt="logo"
              width={104}
              height={104}
              className="aspect-square w-[52px]"
            />
            <p className="desktop-fz-h1 text-[#5D4037]">{CONFIG.appName}</p>
          </Link>
          <HeaderMenuDesktop />
        </div>
        <HeaderDrawer />
      </div>
    </nav>
  )
}

export default HeaderDesktop
