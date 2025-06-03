import { SwiperContainer } from '../projects'

function DonationView({ projects }) {
  return (
    <section className="flex flex-col gap-y-9 pt-10 pb-5 sm:py-14">
      <div className="text-center px-4">
        <h1 className="mobile-fz-h1 text-primary-main sm:desktop-fz-h1">
          慈善募捐
        </h1>
        <h4 className="mobile-fz-h4 text-primary-main max-w-[1000px] mx-auto sm:desktop-fz-h3">
          您的每一份捐款，都將成為溫暖與正能量的傳遞。無論是用於關懷弱勢、推動教育、支持醫療或保育環境，每一筆善款都能在需要的角落綻放光芒。
        </h4>
      </div>

      <SwiperContainer list={projects} />
    </section>
  )
}

export default DonationView
