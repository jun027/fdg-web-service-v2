'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { PATHS } from '@/routes/path'

import BreadcrumbsView from './breadcrumbs-view'

function formatRouteForBreadcrumbs(initArray, dataArray) {
  dataArray.forEach(item => {
    if (item.child) {
      formatRouteForBreadcrumbs(initArray, Object.values(item.child))
    } else {
      initArray.push({
        title: item.title,
        subTitle: item.subTitle,
        path: item.path,
        list: item.list,
      })
    }
  })
}

function BreadcrumbsContainer() {
  const url = usePathname()
  const allRouteDataList = []
  formatRouteForBreadcrumbs(allRouteDataList, Object.values(PATHS))

  const data = allRouteDataList.find(item => item.path === url)

  return (
    <div>
      {data && (
        <BreadcrumbsView separator="＞">
          {data.list.map((item, index) => {
            const isLast = index === data.list.length - 1
            const color = isLast ? 'text-primary-main' : 'text-primary-main'

            return (
              <li key={item.title}>
                {item.path ? (
                  <Link
                    href={item.path}
                    target="_self"
                    className={clsx(
                      'flex items-center gap-x-1 desktop-jf-h3 text-primary-main',
                      color,
                    )}
                  >
                    {item.icon && <item.icon className="text-xl" />}
                    {item.title}
                  </Link>
                ) : (
                  <p className={clsx('desktop-jf-h3', color)}>{item.title}</p>
                )}
              </li>
            )
          })}
        </BreadcrumbsView>
      )}
    </div>
  )
}

export default BreadcrumbsContainer
