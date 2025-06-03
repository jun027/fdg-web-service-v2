import { IoPerson } from 'react-icons/io5'
import { TbReportAnalytics } from 'react-icons/tb'

import { PATHS } from '@/routes/path'

export const ACCOUNT_NAV_LIST = [
  {
    title: '會員資料',
    link: PATHS.Settings.child.Profile.path,
    icon: IoPerson,
    child: [],
    enable: true,
  },
  {
    title: '祈福紀錄',
    link: PATHS.Settings.child.BlessingRecords.path,
    icon: TbReportAnalytics,
    child: [],
    enable: true,
  },
  {
    title: '功德卡',
    link: PATHS.Settings.child.MeritCards.path,
    icon: TbReportAnalytics,
    child: [],
    enable: false,
  },
  {
    title: '訂閱方案',
    link: PATHS.Settings.child.SubscriptionPlans.path,
    icon: TbReportAnalytics,
    child: [],
    enable: false,
  },
]
