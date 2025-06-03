'use client'

import { Backdrop } from '@mui/material'
import { memo } from 'react'

import { useSendPasswordResetContext } from '@/store/use-send-password-reset-context'

import { BACKDROP_Z_INDEX_CONFIG } from './backdrop-z-index-config'

function SendPasswordResetBackdrop() {
  const { isOpen, setOpen } = useSendPasswordResetContext()

  const handleOnClose = () => {
    setOpen(false)
  }

  return (
    <Backdrop
      sx={() => ({
        paddingX: '16px',
        zIndex: BACKDROP_Z_INDEX_CONFIG.sendPasswordReset,
      })}
      open={isOpen}
    >
      <div className="rounded-2xl bg-white max-w-[400px] p-4 pt-12 flex flex-col items-center gap-y-9">
        <p className="mobile-regular-h4 desktop-jf-h3 text-primary-main px-6">
          密碼修改連結已寄出，請至您的信箱點擊連結以完成密碼更新。如未收到，請檢查垃圾郵件匣。
        </p>
        <button
          className="primary-button text-white desktop-jf-h3"
          onClick={handleOnClose}
        >
          離開
        </button>
      </div>
    </Backdrop>
  )
}

export default memo(SendPasswordResetBackdrop)
