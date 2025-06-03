import Link from 'next/link'

import { PATHS } from '@/routes/path'

function UnLoginStatus() {
  return (
    <div className="desktop-fz-p">
      <Link
        href={PATHS.Auth.child.Login.path}
        target="_self"
        className="h-full flex items-center text-white desktop-regular-h6 px-4 c-header-button"
      >
        會員登入
      </Link>
    </div>
  )
}

export default UnLoginStatus
