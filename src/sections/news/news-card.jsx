import clsx from 'clsx'
import Link from 'next/link'
import { memo } from 'react'

export const NEWS_CARD_TYPE = {
  Normal: 'normal',
  Event: 'event',
  Related: 'related',
}

function NewsCard({
  newsId = '',
  title = '',
  imageUrl = '',
  height = '120px',
  type = NEWS_CARD_TYPE.Normal,
}) {
  return (
    <Link
      href={`/news/${newsId}`}
      className={clsx(
        'relative cursor-pointer h-[120px] rounded-[6px] shadow-md shadow-gray-300 bg-cover bg-center',
      )}
      style={{
        backgroundImage: `url(${imageUrl})`,
        height: height,
      }}
    >
      <div className="absolute left-4 bottom-3 flex justify-start items-center gap-x-2">
        <span className="inline-block w-1 h-7 bg-white" />
        <p className="text-white desktop-jf-h1">{title}</p>
      </div>
    </Link>
  )
}

export default memo(NewsCard)
