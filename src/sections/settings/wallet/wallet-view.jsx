'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import FormProvider from '@/components/common/hook-form/form-provider'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'

import useFormSchema from './hook/use-form-schema'

function WalletView() {
  const { defaultValues, baseSchema } = useFormSchema()

  const methods = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = useCallback(data => {
    const payload = {
      deposit: data.deposit,
    }

    console.log(payload)
  }, [])

  return (
    <main>
      <div className="pb-6">
        <div className="px-6 py-9 bg-white rounded-2xl flex flex-col gap-y-8">
          <FormProvider
            className="flex flex-col gap-y-8 lg:gap-y-12"
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-row items-center gap-x-6 h-12 lg:justify-center lg:gap-x-16">
              <div className="flex-1 flex flex-col items-center gap-y-3 lg:flex-none">
                <div className="flex justify-center items-center gap-x-1">
                  <Image
                    src={'/images/icons/wallet-icon-01.png'}
                    alt="logo"
                    width={104}
                    height={104}
                    className="aspect-[40/36] w-[20px]"
                  />
                  <p className="desktop-jf-h2 text-primary-main">我的錢包</p>
                </div>
                <p className="text-secondary-notion desktop-jf-h3">$100</p>
              </div>
              <div className="h-full w-[1px] bg-primary-main" />
              <div className="flex-1 flex flex-col items-center gap-y-3 lg:flex-none">
                <div className="flex justify-center items-center gap-x-1">
                  <Image
                    src={'/images/icons/money-icon-01.png'}
                    alt="logo"
                    width={104}
                    height={104}
                    className="aspect-[46/30] w-[24px]"
                  />
                  <p className="desktop-jf-h2 text-primary-main">紅利金</p>
                </div>
                <p className="text-secondary-notion desktop-jf-h3">$10</p>
              </div>
            </div>
            <div className="max-w-[532px] w-full lg:mx-auto flex flex-col gap-y-4 lg:gap-y-12">
              <RHFTextField
                className="w-full"
                type="number"
                name={'deposit'}
                placeholder="請輸入存款金額"
              />
              <button
                type="submit"
                className="primary-button text-white desktop-jf-h3"
              >
                存款
              </button>
            </div>
          </FormProvider>
        </div>
      </div>
    </main>
  )
}

export default WalletView
