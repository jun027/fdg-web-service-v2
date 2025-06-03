import { TiHome } from 'react-icons/ti'

const ASSETS = {
  Home: {
    title: '首頁',
    path: '/',
    icon: TiHome,
  },
}

export const PATHS = {
  Home: {
    title: ASSETS.Home.title,
    path: ASSETS.Home.path,
    subTitle: 'Home',
  },
  Auth: {
    title: '會員中心',
    path: '/auth',
    subTitle: 'Auth',
    child: {
      Login: {
        title: '會員登入',
        path: '/auth/login',
        subTitle: 'Login',
      },
      SignUp: {
        title: '會員註冊',
        path: '/auth/signup',
        subTitle: 'SignUp',
      },
      ForgotPassword: {
        title: '忘記密碼',
        path: '/auth/forgot-password',
        sutTitle: 'Forgot Password',
      },
      ForgotAccount: {
        title: '忘記帳號',
        path: '/auth/forgot-account',
        sutTitle: 'Forgot Account',
      },
    },
  },
  Projects: {
    title: '慈善募資',
    path: '/projects',
    subTitle: 'Projects',
    child: {
      Checkout: {
        title: '詳細資訊',
        path: '/projects/:projectId/:itemId/checkout',
      },
      DonateComplete: {
        title: '捐款完成',
        path: '/projects/donate-complete',
      },
    },
  },
  Service: {
    title: '線上服務',
    path: '/service',
    subTitle: 'Online Service',
    Donate: {
      child: {
        Payment: {
          title: '線上捐款',
          path: '/service/donatepay',
          subTitle: 'Donate',
        },
      },
    },
    Replenish: {
      child: {
        Payment: {
          title: '補財庫',
          path: '/service/replenishpay',
          subTitle: 'Replenish',
        },
      },
    },
    child: {
      Donate: {
        title: '線上捐款',
        path: '/service/donate',
        subTitle: 'Donate',
      },
      DonatePay: {
        title: '線上捐款',
        path: '/service/donatepay',
        subTitle: 'Donate Pay',
      },
      DonateComplete: {
        title: '線上捐款完成',
        path: '/service/donatecomplete',
        subTitle: 'Donate Complete',
      },
      LightingLamp: {
        title: '安太歲',
        path: '/service/lighting-lamp',
        subTitle: 'Lighting Lamp',
      },
      Guangming: {
        title: '光明燈',
        path: '/service/guangming',
        subTitle: 'Guangming',
      },
      FortuneStick: {
        title: '線上求籤',
        path: '/service/fortune-stick',
        subTitle: 'Fortune Stick',
      },
      DivinationBlocks: {
        title: '線上擲筊',
        path: '/service/divination-blocks',
        subTitle: 'Divination Blocks',
      },
      Replenish: {
        title: '補財庫',
        path: '/service/replenish',
        subTitle: 'Replenish',
      },
      ReplenishPay: {
        title: '補財庫',
        path: '/service/replenishpay',
        subTitle: 'Replenish Pay',
      },
      ReplenishComplete: {
        title: '補財庫完成',
        path: '/service/replenishcomplete',
        subTitle: 'Replenish Complete',
      },
      Complete: {
        title: '完成訂單',
        path: '/service/donatecomplete',
        subTitle: 'Donate Complete',
      },
    },
  },
  Activity: {
    title: '活動專區',
    path: '/activity',
    subTitle: 'Activity',
    child: {
      Announcement: {
        title: '最新活動公告內容',
        path: '/activity/announcement',
        subTitle: 'Announcement',
        child: {
          Article: {
            title: '文章',
            path: '/activity/announcement/article',
            subTitle: 'Article',
          },
        },
      },
    },
  },
  Settings: {
    title: '會員中心',
    path: '/settings',
    subTitle: 'Settings',
    child: {
      Profile: {
        title: '會員專區',
        path: '/settings/profile',
        subTitle: 'Profile',
        list: [
          ASSETS.Home,
          {
            title: '會員專區',
          },
          {
            title: '會員資料',
          },
        ],
      },
      BlessingRecords: {
        title: '祈福紀錄',
        path: '/settings/blessing-records',
        subTitle: 'Blessing Records',
        list: [
          ASSETS.Home,
          {
            title: '會員專區',
          },
          {
            title: '祈福紀錄',
          },
        ],
      },
      MeritCards: {
        title: '功德卡',
        path: '/settings/merit-cards',
        subTitle: 'Merit Cards',
        list: [
          ASSETS.Home,
          {
            title: '會員專區',
          },
          {
            title: '功德卡',
          },
        ],
      },
      SubscriptionPlans: {
        title: '訂閱方案',
        path: '/settings/subscription-plans',
        subTitle: 'Subscription Plans',
        list: [
          ASSETS.Home,
          {
            title: '會員專區',
          },
          {
            title: '訂閱方案',
          },
        ],
      },
    },
  },
  OnlinePrayer: {
    title: '線上祈福',
    path: '/online-prayer',
    subTitle: 'Online Prayer',
  },
  Benefits: {
    title: '會員權益',
    path: '/benefits',
    subTitle: 'Benefits',
    list: [
      ASSETS.Home,
      {
        title: '權益說明',
      },
    ],
  },
}
