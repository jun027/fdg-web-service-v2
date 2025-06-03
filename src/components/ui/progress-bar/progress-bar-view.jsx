import { memo } from 'react'

import { ArcView } from '../arc'

const maxValue = 365
const minValue = 175

function ProgressBarView({ id = '1', progress }) {
  let value = (maxValue - minValue) * progress + minValue
  if (value > maxValue) {
    value = maxValue
  }

  return (
    <>
      <div className="absolute z-0 top-0 left-0 w-full h-full">
        <svg x="0" y="0" width={'100%'} height={'100%'}>
          <ArcView
            id={`progress-bar-background-${id}`}
            cx={110}
            cy={110}
            r={100}
            width={17.5}
            startAngleDeg={175}
            endAngleDeg={365}
            fill="#ce9a34"
          />
        </svg>
      </div>
      <div className="absolute z-10 top-0 left-0 w-full h-full">
        <svg x="0" y="0" width={'100%'} height={'100%'}>
          <ArcView
            id={`progress-bar-${id}`}
            cx={110}
            cy={110}
            r={100}
            width={17.5}
            startAngleDeg={175}
            endAngleDeg={value}
            fill="#5d4037"
          />
        </svg>
      </div>
    </>
  )
}

export default memo(ProgressBarView)
