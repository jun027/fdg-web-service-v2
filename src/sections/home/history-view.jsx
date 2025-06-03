'use client'

import HistoryViewDesktop from './history-view-desktop'
import HistoryViewMobile from './history-view-mobile'

function HistoryView() {
  return (
    <>
      <div className="block lg:hidden">
        <HistoryViewMobile />
      </div>
      <div className="hidden lg:block">
        <HistoryViewDesktop />
      </div>
    </>
  )
}

export default HistoryView
