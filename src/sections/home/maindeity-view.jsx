'use client'

import MainDeityDesktop from './maindeity-view-desktop'
import MainDeityMobile from './maindeity-view-mobile'

function MainDeity() {
  return (
    <>
      <div className="block lg:hidden">
        <MainDeityMobile />
      </div>
      <div className="hidden lg:block">
        <MainDeityDesktop />
      </div>
    </>
  )
}

export default MainDeity
