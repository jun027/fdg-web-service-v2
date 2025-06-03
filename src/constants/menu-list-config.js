import { BsPersonFill } from 'react-icons/bs'

import { PATHS } from '@/routes/path'

import { ACCOUNT_NAV_LIST } from './account-nav-list'

export const MENU_LIST_DESKTOP = [
  {
    title: '線上服務',
    enable: false,
    child: [
      {
        title: PATHS.OnlinePrayer.title,
        path: PATHS.OnlinePrayer.path,
        enable: true,
      },
    ],
  },
  {
    title: '平安商城',
    enable: false,
  },
  {
    title: '慈善捐款',
    path: PATHS.Projects.path,
    enable: false,
  },
]

export const MENU_LIST_MOBILE = [
  {
    title: '會員中心',
    icon: BsPersonFill,
    enable: true,
    child: [
      {
        title: ACCOUNT_NAV_LIST[0].title,
        path: ACCOUNT_NAV_LIST[0].link,
        enable: ACCOUNT_NAV_LIST[0].enable,
      },
      {
        title: ACCOUNT_NAV_LIST[1].title,
        path: ACCOUNT_NAV_LIST[1].link,
        enable: ACCOUNT_NAV_LIST[1].enable,
      },
      {
        title: ACCOUNT_NAV_LIST[2].title,
        path: ACCOUNT_NAV_LIST[2].link,
        enable: ACCOUNT_NAV_LIST[2].enable,
      },
      {
        title: ACCOUNT_NAV_LIST[3].title,
        path: ACCOUNT_NAV_LIST[3].link,
        enable: ACCOUNT_NAV_LIST[3].enable,
      },
    ],
  },
]
