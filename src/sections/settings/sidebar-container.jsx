'use client'

import { PATHS } from '@/routes/path'

import { SettingsSidebarDesktop, SettingsSidebarMobile } from '.'

function SettingsSidebarContainer() {
  const menuList = Object.values(PATHS.Settings.child)

  return (
    <>
      <SettingsSidebarDesktop menuList={menuList} />
      <SettingsSidebarMobile menuList={menuList} />
    </>
  )
}

export default SettingsSidebarContainer
