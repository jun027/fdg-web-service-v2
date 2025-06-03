import Link from 'next/link'

import Footer from '@/layouts/main/footer'
import Header from '@/layouts/main/header'
import { PATHS } from '@/routes/path'

function ErrorPage() {
  return (
    <main>
      <Header />
      <div className="pt-20">
        <div className="relative">
          {/* Background */}
          <div className="pointer-events-none w-full aspect-[1500/1306] bg-[url('/images/error/not_found.png')] bg-cover bg-center" />

          {/* Content */}
          <div className="absolute left-4 top-4 z-10 flex flex-col gap-y-4 sm:gap-y-6 sm:left-10 sm:top-10 xl:left-40 xl:top-40">
            <h1 className="text-primary-main desktop-fz-h2 sm:desktop-fz-h1">
              404
            </h1>
            <p className="text-primary-main mobile-jf-h5 max-w-[250px] sm:max-w-[476px] sm:desktop-jf-h1">
              您嘗試造訪的頁面不存在或已被移動。嘗試返回我們的主頁。
            </p>
            <div className="w-[180px] sm:w-[250px]">
              <Link
                href={PATHS.Home.path}
                className="bg-primary-main rounded-lg w-full text-white text-center mobile-jf-h4 inline-block p-2"
              >
                首頁
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ErrorPage
