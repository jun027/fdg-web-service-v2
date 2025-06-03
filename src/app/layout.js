import './globals.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

import { GlobalComponents } from '@/components/common/global-components'
import { CONFIG } from '@/config-global'
import { AppProvider } from '@/providers'

export const metadata = {
  title: CONFIG.appName,
  description: CONFIG.appDescription,
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className="relative" suppressHydrationWarning={true}>
        <AppProvider>
          <GlobalComponents>{children}</GlobalComponents>
        </AppProvider>
      </body>
    </html>
  )
}
