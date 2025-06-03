import { append, compose, insert, join, map, range } from 'ramda'

const DEG_TO_RAD = deg => deg * 0.017_453_3

function ArcView({ cx, cy, r, width, startAngleDeg, endAngleDeg, fill, id }) {
  const arcPathD = compose(
    join(''),
    append(`L${cx} ${cy}`),
    insert(0, `M${cx} ${cy}`),
    map(a => {
      const x = cx + (r + width) * Math.cos(DEG_TO_RAD(a))
      const y = cy + (r + width) * Math.sin(DEG_TO_RAD(a))
      return `L${x} ${y}`
    }),
  )(range(startAngleDeg, endAngleDeg))

  const leftX = cx + r * Math.cos(DEG_TO_RAD(startAngleDeg))
  const leftY = cy + r * Math.sin(DEG_TO_RAD(startAngleDeg))
  const rightX = cx + r * Math.cos(DEG_TO_RAD(endAngleDeg))
  const rightY = cy + r * Math.sin(DEG_TO_RAD(endAngleDeg))

  return (
    <g>
      <defs>
        <clipPath id={`cut-off-rect-${id}`}>
          <path d={arcPathD} />
        </clipPath>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={fill}
        strokeWidth={width}
        fill="none"
        clipPath={`url(#cut-off-rect-${id})`}
      />
      <circle cx={leftX} cy={leftY} r={0.5 * width} fill={fill} />
      <circle cx={rightX} cy={rightY} r={0.5 * width} fill={fill} />
    </g>
  )
}

export default ArcView
