import Image from 'next/image'
import Link from 'next/link'

import { FOOTER_LIST } from '@/constants/footer-list-config'
import { useMobileMenuContext } from '@/store/use-mobile-menu-context'

export default function HeaderDrawerMenuList() {
  const setOpen = useMobileMenuContext(state => state.setOpen)

  return (
    <div className="text-white space-y-7 px-6 lg:pl-60 xl:pl-0">
      {FOOTER_LIST.map(section => (
        <div key={section.id}>
          <div className="relative inline-block">
            <Image
              src="/images/icons/rock-icon-01.png"
              alt="rock"
              width={56}
              height={66}
              className="w-[32px] h-[32px] absolute -top-1 -left-2 z-0 opacity-90"
            />

            {section.path ? (
              <Link
                href={section.path}
                className="desktop-fz-h2 block relative z-10"
                onClick={() => setOpen(false)}
              >
                {section.title}
              </Link>
            ) : (
              <span className="desktop-fz-h2 block relative z-10 ">
                {section.title}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-y-3 text-white">
            {section.child.map((item, index) => (
              <span key={item.id} className="flex items-center">
                <Link
                  href={item.path}
                  className="desktop-fz-h3 text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.title}
                </Link>
                {index !== section.child.length - 1 && (
                  <span className=" text-white desktop-fz-h3">｜</span>
                )}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
