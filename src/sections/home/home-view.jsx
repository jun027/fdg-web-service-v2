'use client'

import { DonationView } from '.'
import BranchView from './branch-view'
import FloorPlanView from './floorplan-view'
import HistoryView from './history-view'
import InformationView from './information-view'
import MainDeity from './maindeity-view'
import ImageProcession from './procession-view'
import TempleAddressView from './templeaddress-view'
import ImageTurn from './turn-view'

function HomeView({ projects }) {
  return (
    <div className="relative">
      <BranchView />

      <div id="page-1">
        <ImageTurn />
      </div>

      <div id="page-2">
        <HistoryView />
      </div>

      <div id="page-3">
        <MainDeity />
      </div>

      <div
        className="bg-[url('/images/cover/cover-background-d-01.png')] bg-top bg-cover bg-no-repeat"
        id="page-4"
      >
        <InformationView />
        <DonationView projects={projects} />
      </div>

      <div id="page-5">
        <FloorPlanView />
      </div>

      <div id="page-6">
        <ImageProcession />
      </div>

      <div>
        <TempleAddressView />
      </div>
    </div>
  )
}

export default HomeView
