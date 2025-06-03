'use client'

import Image from 'next/image'
import Link from 'next/link'

import { CONFIG } from '@/config-global'
import { FOOTER_LIST } from '@/constants/footer-list-config'

function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <Image
        src="/images/cover/footer-d-01.png"
        alt="footer desktop background"
        fill
        className="object-cover z-0 hidden lg:block"
        quality={100}
        priority
      />

      <Image
        src="/images/cover/cover-background-01.png"
        alt="footer mobile background"
        fill
        className="object-cover z-0 block lg:hidden "
        quality={100}
        priority
      />

      <div className="block lg:hidden relative z-10 px-4 py-4">
        <div className="absolute top-0 right-0 z-0">
          <Image
            src="/images/icons/leaf-icon.png"
            alt="leaf"
            width={376}
            height={403}
            className="w-[188px] h-[202px]"
            priority
          />
        </div>
        <Image
          src="/images/icons/leaves-icon.png"
          alt="leaves decoration"
          width={264}
          height={310}
          className="w-[132px] h-[155px] absolute right-0 top-[60%] -translate-y-1/2"
        />
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <Image
              src="/images/icons/app-icon-01.png"
              alt="logo"
              width={80}
              height={80}
              className="w-[80px] h-auto"
            />
            <h2 className="mobile-fz-h1 text-[#5D4037]">{CONFIG.appName}</h2>
            <div className="space-y-2">
              <p className="mobile-fz-h3 text-[#5D4037]">{CONFIG.address}</p>
              <p className="mobile-fz-h3 text-[#5D4037]">
                <Link href={`tel:${CONFIG.phone}`}>{CONFIG.phone}</Link>
              </p>
            </div>
          </div>

          {/* 分隔線 */}
          <div className="w-full h-[1px] bg-white/20 hidden lg:block" />

          <div className="w-full space-y-8">
            {FOOTER_LIST.map(item => (
              <div key={item.id}>
                <div className="relative">
                  <Image
                    src="/images/icons/rock-icon-01.png"
                    alt="icon"
                    width={57}
                    height={67}
                    className="absolute -top-1 -left-1 z-0 w-[26px] h-[28px]"
                  />
                  {item.path ? (
                    <Link
                      href={item.path}
                      className="relative z-10 desktop-fz-h2 text-[#5D4037]"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <h3 className="relative z-10 desktop-fz-h2 text-[#5D4037]">
                      {item.title}
                    </h3>
                  )}
                </div>
                <ul className="pl-7">
                  {item.child.map(childItem => (
                    <li key={childItem.id}>
                      <Link
                        href={childItem.path}
                        className="mobile-fz-h3 text-[#5D4037]"
                      >
                        {childItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative z-20 px-8 py-12">
        <div className="w-full max-w-[1440px] mx-auto flex items-start justify-between gap-12">
          <div className="flex items-stretch">
            <div className="flex space-x-12">
              <div className="relative shrink-0">
                <Image
                  src="/images/icons/app-icon-01.png"
                  alt="logo"
                  width={104}
                  height={104}
                  className="w-[80px] aspect-square mt-30"
                />
              </div>

              <div className="flex flex-col mt-24">
                <h2 className="desktop-fz-h1 text-white">{CONFIG.appName}</h2>
                <p className="desktop-fz-h3 text-white">
                  屏東縣恆春鎮福德路126號　
                  <span className="inline-block">
                    <Link href={`tel:${CONFIG.phone}`}>{CONFIG.phone}</Link>
                  </span>
                </p>
              </div>
            </div>

            <div className="w-[1px] bg-white mx-12 shrink-0" />

            <div className="flex flex-col gap-6 flex-wrap">
              {FOOTER_LIST.map(item => (
                <div key={item.id} className="flex gap-4 ">
                  <div className="relative">
                    <div className="relative flex items-center">
                      <Image
                        src="/images/icons/rock-icon-01.png"
                        alt="rock decoration"
                        width={57}
                        height={67}
                        className="absolute left-7 top-4 -translate-y-1/2 w-[26px] h-[28px] z-0"
                      />
                      {item.path ? (
                        <Link
                          href={item.path}
                          className="relative z-10 pl-10 desktop-fz-h2 text-white whitespace-nowrap"
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <h3 className="relative z-10 pl-10 desktop-fz-h2 text-white whitespace-nowrap">
                          {item.title}
                        </h3>
                      )}
                    </div>
                  </div>
                  <ul className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {item.child.map((childItem, index) => (
                      <li
                        key={childItem.id}
                        className="flex items-center gap-2"
                      >
                        <Link
                          href={childItem.path}
                          className="desktop-fz-h3 text-white hover:text-white transition-colors whitespace-nowrap"
                        >
                          {childItem.title}
                        </Link>
                        {index !== item.child.length - 1 && (
                          <span className="text-white">|</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 lg:py-6">
        <p className="mobile-jf-h5 text-center lg:text-white text-[#5D4037]">
          Copyright © 2025 Tapio. All rights reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
