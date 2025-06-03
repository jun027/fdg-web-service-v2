'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { FaAngleLeft } from 'react-icons/fa6'
import { TbRefresh } from 'react-icons/tb'

import FormProvider from '@/components/common/hook-form/form-provider'
import FormTitle from '@/components/common/hook-form/form-title'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import { PATHS } from '@/routes/path'

import useFormSchema from './hook/use-form-schema'

function ForgotAccountView() {
  const { defaultValues, baseSchema } = useFormSchema()

  const methods = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = useCallback(async data => {
    const payload = {
      email: data.email,
    }

    console.log(payload)
  }, [])

  return (
    <div className="overflow-auto flex-1">
      <div className="pb-6 flex flex-col min-h-full gap-6 sm:w-full sm:justify-center sm:py-8 sm:px-12 lg:py-16 lg:px-20 xl:py-28 xl:px-32">
        {/* Header */}
        <div className="flex flex-col gap-y-3 items-center px-4 sm:px-0">
          <div className="w-16 aspect-square bg-[url(/images/icons/avatar-icon-01.png)] bg-no-repeat bg-center bg-cover" />
          <h2 className="desktop-fz-h2 text-primary-main">忘記帳號</h2>
        </div>

        {/* Form */}
        <FormProvider
          className="flex flex-col gap-6"
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6 px-4 sm:px-9">
            {/* Member Account */}
            <div className="rhf-block">
              <FormTitle musted title="請輸入您的電子信箱" htmlFor="email" />
              <RHFTextField
                type="email"
                name={'email'}
                placeholder="請輸入您的電子信箱"
              />
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  className="text-primary-main desktop-jf-h3 flex items-center gap-x-1 cursor-pointer"
                >
                  <TbRefresh />
                  重新發送
                </button>
              </div>
              <p className="mobile-jf-h5 text-secondary-notion lg:desktop-jf-h3">
                *輸入您的電子郵件，我們將您的帳號資訊發送至您的信箱，請確保正確。
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-9 items-center px-4 sm:px-9">
            <button
              type="submit"
              className="primary-button text-white desktop-jf-h3"
            >
              確認送出
            </button>
            <Link
              href={PATHS.Auth.child.Login.path}
              className="flex justify-center items-center cursor-pointer gap-x-1"
            >
              <FaAngleLeft className="text-primary-main" />
              <p className="text-primary-main desktop-jf-h3">返回登入</p>
            </Link>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

export default ForgotAccountView
