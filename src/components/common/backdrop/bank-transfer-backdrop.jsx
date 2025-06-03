'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Backdrop } from '@mui/material'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaRegCopy } from 'react-icons/fa6'

import { CONFIG } from '@/config-global'
import { useBankTransferContext } from '@/store/use-bank-transfer-context'

import FormProvider from '../hook-form/form-provider'
import RHFTextField from '../hook-form/rhf-text-field'
import { SpecialParagraph } from '../special-paragraph'
import { BACKDROP_Z_INDEX_CONFIG } from './backdrop-z-index-config'
import useBankTransferFormSchema from './hook/use-bank-transfer-form-schema'

function BankTransferBackdrop() {
  const isOpen = useBankTransferContext(state => state.isOpen)
  // const amount = useBankTransferContext(state => state.amount)
  // const hashCode = useBankTransferContext(state => state.hashCode)
  const close = useBankTransferContext(state => state.close)

  // eslint-disable-next-line no-unused-vars
  const [_, copyToClipboard] = useCopyToClipboard()

  const { defaultValues, baseSchema } = useBankTransferFormSchema()

  const methods = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = useCallback(async data => {
    const payload = {
      account: data.account,
    }

    console.log(payload)
  }, [])

  const handleOnClose = () => {
    close(false)
  }

  const handleCopyClick = useCallback(async () => {
    await copyToClipboard(CONFIG.bankAccount)
    toast.success(`已複製 ${CONFIG.bankAccount}`)
  }, [copyToClipboard])

  return (
    <Backdrop
      sx={() => ({
        paddingX: '16px',
        zIndex: BACKDROP_Z_INDEX_CONFIG.bankTransfer,
      })}
      open={isOpen}
    >
      <FormProvider
        className="rounded-2xl bg-white max-w-[681px] p-12 pb-6 flex flex-col items-center gap-y-6"
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-primary-main desktop-jf-h2">
          付款金額 <span className="text-red-600 desktop-jf-h2">$1000</span>
        </p>

        <div className="text-primary-main desktop-jf-h3 w-full">
          <SpecialParagraph
            type="number"
            prefix="1."
            text="使用 QR Code 付款（推薦方式）<br />請使用銀行 App 或行動支付掃描上方 QR Code，即可快速轉帳付款。<br />付款成功後，請務必填寫帳號後五碼，以便我們核對款項。"
          />
        </div>

        <div className="text-primary-main desktop-jf-h3 w-full">
          <SpecialParagraph
            type="number"
            prefix="2."
            text={`手動銀行轉帳（若無法使用 QR Code）<br />若不使用 QR Code，可直接轉帳至以下指定銀行帳戶：<br />帳號：${CONFIG.bankAccount.replaceAll(/\s/g, '-')}`}
          />
        </div>

        <div className="rhf-block w-full">
          <RHFTextField
            type="text"
            name="account"
            placeholder="請填寫帳戶後五碼"
          />
        </div>

        <div className="w-full">
          <p className="desktop-jf-h4 text-primary-main">銀行匯款帳戶：</p>
          <button
            type="button"
            className="flex items-center gap-x-1 desktop-jf-h4 text-primary-main cursor-pointer"
            onClick={handleCopyClick}
          >
            <FaRegCopy />
            <span>{CONFIG.bankAccount.replaceAll(/\s/g, '-')}</span>
          </button>
        </div>

        <div className="rhf-block w-full">
          <button
            type="submit"
            className="primary-button text-white desktop-jf-h3"
            disabled={isSubmitting}
          >
            確認
          </button>
          <button
            type="button"
            className="text-primary-main desktop-jf-h3 py-3 cursor-pointer"
            onClick={handleOnClose}
          >
            取消
          </button>
        </div>
      </FormProvider>
    </Backdrop>
  )
}

export default memo(BankTransferBackdrop)
