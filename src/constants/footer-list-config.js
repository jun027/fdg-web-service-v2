import { PATHS } from '@/routes/path'

export const FOOTER_LIST = [
  {
    id: 1,
    title: '關於我們',
    child: [
      {
        id: 1,
        title: '建立沿革',
        path: `${PATHS.Home.path}#page-2`,
      },
      {
        id: 2,
        title: '主祀神',
        path: `${PATHS.Home.path}#page-3`,
      },
      {
        id: 3,
        title: '宮廟平面圖',
        path: `${PATHS.Home.path}#page-5`,
      },
      {
        id: 4,
        title: '知識區',
        path: '/service/',
      },
    ],
  },
  {
    id: 2,
    title: '線上服務',
    child: [
      {
        id: 1,
        title: '安太歲',
        path: PATHS.Service.child.LightingLamp.path,
      },
      {
        id: 2,
        title: '線上點燈',
        path: PATHS.Service.child.Guangming.path,
      },
      {
        id: 3,
        title: '求籤',
        path: PATHS.Service.child.FortuneStick.path,
      },
      {
        id: 4,
        title: '線上祈福',
        path: PATHS.OnlinePrayer.path,
      },
    ],
  },
  {
    id: 3,
    title: '最新活動',
    child: [
      {
        id: 1,
        title: '搶孤',
        path: '/activity',
      },
      {
        id: 2,
        title: '補財庫',
        path: '/service/',
      },
    ],
  },
  {
    id: 4,
    title: '慈善捐款',
    path: PATHS.Projects.path,
    child: [],
  },
  {
    id: 5,
    title: '平安商城',
    child: [],
  },
]
