'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Backdrop } from '@mui/material'
import { memo, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { useCancelSubscriptionContext } from '@/store/use-cancel-subscription-context'

import FormProvider from '../hook-form/form-provider'
import { RHFRadioButton } from '../hook-form/rhf-radio-button'
import { BACKDROP_Z_INDEX_CONFIG } from './backdrop-z-index-config'
import useFormSchema from './hook/use-cancel-subscription-form-schema'

function CancelSubscriptionBackdrop() {
  const isOpen = useCancelSubscriptionContext(state => state.isOpen)
  const setOpen = useCancelSubscriptionContext(state => state.setOpen)
  const stage = useCancelSubscriptionContext(state => state.stage)
  const setStage = useCancelSubscriptionContext(state => state.setStage)

  const { defaultValues, baseSchema } = useFormSchema()

  const methods = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const handleOnClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const handleConfirm = useCallback(() => {
    console.log('handleConfirm')
  }, [])

  const onSubmit = useCallback(
    async data => {
      const payload = {
        isCancel: data.isCancel,
      }

      if (payload.isCancel === 'yes') {
        console.log('cancel')
        setStage(2)
      } else {
        handleOnClose()
      }

      console.log(payload)
    },
    [handleOnClose, setStage],
  )

  return (
    <Backdrop
      sx={() => ({
        paddingX: '16px',
        zIndex: BACKDROP_Z_INDEX_CONFIG.cancelSubscription,
      })}
      open={isOpen}
    >
      {stage === 1 && (
        <div className="rounded-2xl bg-white p-4 flex flex-col items-center gap-y-6">
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6"
          >
            <div className="flex flex-col gap-y-3">
              <p className="desktop-jf-h2 text-primary-main text-center">
                是否取消訂閱？
              </p>
              <div className="rounded-lg border-primary-main border-[1px] p-4 min-w-[368px]">
                <RHFRadioButton
                  size="normal"
                  id="radio-button-isCancel-false"
                  value={'no'}
                  name="isCancel"
                  label={'否'}
                />
                <p className="w-full h-[1px] bg-primary-main my-4" />
                <RHFRadioButton
                  size="normal"
                  id="radio-button-isCancel-true"
                  value={'yes'}
                  name="isCancel"
                  label={'是'}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-4">
              <button
                className="primary-button text-white desktop-jf-h3"
                onClick={handleConfirm}
              >
                確認
              </button>
              <button
                className="desktop-jf-h3 text-dark-600 text-center w-full cursor-pointer"
                onClick={handleOnClose}
              >
                取消
              </button>
            </div>
          </FormProvider>
        </div>
      )}
      {stage === 2 && (
        <div className="rounded-2xl bg-white p-4 flex flex-col items-center gap-y-9 max-w-[400px] w-full pt-12">
          <p className="px-6 desktop-jf-h3 text-primary-main">
            「已為您取消訂閱，感謝您過去的關注與支持，若有需要，我們隨時都在。」
          </p>
          <button
            className="primary-button text-white desktop-jf-h3"
            onClick={handleOnClose}
          >
            關閉
          </button>
        </div>
      )}
    </Backdrop>
  )
}

export default memo(CancelSubscriptionBackdrop)
