'use client'

import Link from 'next/link'
import { useCallback } from 'react'

import { useAuthContext } from '@/auth/hooks'
import { useBoolean } from '@/hook/use-boolean'
import { useRouter } from '@/routes/hooks'
import { useMobileMenuContext } from '@/store/use-mobile-menu-context'

// import { StyledPopover } from './custom-popover'

function LoginStatus() {
  const {
    value: isLogoutLoading,
    onTrue: logoutLoadingOnTrue,
    onFalse: logoutLoadingOnFalse,
  } = useBoolean(false)

  const { handleLogout } = useAuthContext()

  const router = useRouter()
  const setOpen = useMobileMenuContext(state => state.setOpen)

  const handleLogoutButtonClick = useCallback(async () => {
    logoutLoadingOnTrue()

    try {
      await handleLogout()
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      logoutLoadingOnFalse()
    }
  }, [handleLogout, logoutLoadingOnFalse, logoutLoadingOnTrue, router])

  return (
    <div className="desktop-fz-p flex items-center lg:gap-4">
      <button
        disabled={isLogoutLoading}
        type="button"
        onClick={handleLogoutButtonClick}
      >
        <p className="cursor-pointer">登出</p>
      </button>

      <span className="text-white">｜</span>
      <Link href="/settings/profile" onClick={() => setOpen(false)}>
        <p>會員專區</p>
      </Link>
    </div>
  )
}

export default LoginStatus
