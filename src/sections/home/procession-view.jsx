'use client'

import Image from 'next/image'

export default function ProcessionView() {
  return (
    <div
      className="w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/cover/cover-background-01.png')",
      }}
    >
      <div className="relative w-full max-w-[1440px] mx-auto">
        <Image
          src="/images/cover/cover-01.png"
          alt="海報"
          width={2880}
          height={1800}
          priority
          className="object-cover object-center w-full h-auto hidden lg:block"
        />
        <Image
          src="/images/cover/cover-02.png"
          alt="海報"
          width={750}
          height={1628}
          priority
          className="object-cover object-center w-full h-auto block lg:hidden"
        />
      </div>
    </div>
  )
}
