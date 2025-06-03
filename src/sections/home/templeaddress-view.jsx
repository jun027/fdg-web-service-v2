'use client'

import { GoogleMap, LoadScript } from '@react-google-maps/api'
import Image from 'next/image'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export default function TempleAddressView() {
  const center = {
    lat: 22.003_630_679_460_734,
    lng: 120.742_363_044_770_33,
  }

  return (
    <div className="relative w-full bg-[url('/images/cover/cover-background-01.png')] bg-cover bg-no-repeat lg:py-16">
      <Image
        src="/images/cover/cover-tree.png"
        alt="樹枝"
        width={2880}
        height={3333}
        className="hidden lg:block absolute -bottom-60 z-0"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 py-23 lg:px-20 lg:py-16">
        <div className="flex flex-col-reverse lg:flex-row items-start gap-8 lg:gap-24">
          <div className="space-y-5 lg:mt-[227px]">
            <div>
              <div className="relative inline-block">
                <Image
                  src="/images/icons/rock-icon-01.png"
                  alt="icon"
                  width={57}
                  height={67}
                  className="absolute top-3 left-2 w-[25px] aspect-square -translate-x-1/2 -translate-y-1/2 z-0"
                />
                <h2 className="relative z-10 text-[#5D4037] desktop-fz-p">
                  交通資訊
                </h2>
              </div>
              <div className="mt-2 desktop-jf-h3 text-[#5D4037]">
                <p>電話：08-888-2122</p>
                <p>地址：屏東縣恆春鎮福德路126號</p>
              </div>
            </div>

            <div className="border-t border-[#5D4037] w-[300px]"></div>

            <div>
              <div className="relative inline-block">
                <Image
                  src="/images/icons/rock-icon-01.png"
                  alt="icon"
                  width={57}
                  height={67}
                  className="absolute top-3 left-2 w-[25px] aspect-square -translate-x-1/2 -translate-y-1/2 z-0"
                />
                <h2 className="relative z-10 text-[#5D4037] desktop-fz-p">
                  營業時間
                </h2>
              </div>
              <div className="mt-2 desktop-jf-h3 text-[#5D4037]">
                <p>週一至週日：07:00 - 19:00</p>
              </div>
            </div>
          </div>

          <div className="w-full lg:max-w-[855px] rounded-2xl overflow-hidden lg:mt-34">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerClassName="w-full h-[210px] lg:h-[400px]"
                center={center}
                zoom={18}
              ></GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  )
}
