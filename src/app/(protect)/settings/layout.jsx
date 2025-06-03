import { AuthGuard } from '@/auth/guard'
import { BreadcrumbsContainer } from '@/components/ui/breadcrumbs'
import Header from '@/layouts/main/header'
import { SettingsSidebarContainer } from '@/sections/settings'

function SettingsLayout({ children }) {
  return (
    <AuthGuard>
      <Header />

      <main className="main-background min-h-screen overflow-hidden">
        <div className="w-full aspect-[375/220] bg-[url(/images/page/settings/thumb-01-m.png)] bg-no-repeat bg-center bg-cover sm:bg-[url(/images/page/settings/thumb-01.png)] sm:aspect-[2880/654]" />

        <div className="max-w-[1380px] mx-auto sm:flex sm:pt-5 sm:pb-16 sm:flex-col sm:gap-y-9">
          <div className="hidden sm:block px-4">
            <BreadcrumbsContainer />
          </div>

          <div className="flex flex-col gap-y-6 px-4 sm:flex-row sm:gap-x-28">
            <div className="sm:w-[209px] lg:w-[409px]">
              <SettingsSidebarContainer />
            </div>
            <div className="flex-1 sm:w-1">{children}</div>
          </div>
        </div>
      </main>
    </AuthGuard>
  )
}

export default SettingsLayout
