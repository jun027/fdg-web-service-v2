'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaAngleLeft } from 'react-icons/fa6'

import { resetmailAPI } from '@/apis/hook/use-auth'
import FormProvider from '@/components/common/hook-form/form-provider'
import FormTitle from '@/components/common/hook-form/form-title'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import { PATHS } from '@/routes/path'

import useFormSchema from './hook/use-form-schema'
import ResetButton from './reset-button'

function ForgotPasswordView() {
  const { defaultValues, baseSchema } = useFormSchema()

  const { mutateAsync } = useMutation({
    mutationKey: ['auth-resetmail'],
    mutationFn: payload => resetmailAPI(payload),
    onSuccess: () => {
      toast.success('密碼重設連結已發送至您的信箱')
    },
  })

  const methods = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit, watch } = methods

  const email = watch('email')

  const onSubmit = useCallback(
    async data => {
      const payload = {
        email: data.email,
      }

      await mutateAsync(payload)
    },
    [mutateAsync],
  )

  const handleOnResetButtonClick = useCallback(async () => {
    // 檢查 email 是否符合正則表達式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error('請輸入有效的電子郵件')
      return
    }

    const payload = { email }

    await mutateAsync(payload)
  }, [email, mutateAsync])

  return (
    <div className="overflow-auto flex-1">
      <div className="pb-6 flex flex-col min-h-full gap-6 sm:w-full sm:justify-center sm:py-8 sm:px-12 lg:py-16 lg:px-20 xl:py-28 xl:px-32">
        {/* Header */}
        <div className="flex flex-col gap-y-3 items-center px-4 sm:px-0">
          <div className="w-16 aspect-square bg-[url(/images/icons/lock-icon-01.png)] bg-no-repeat bg-center bg-cover" />
          <h2 className="desktop-fz-h2 text-primary-main">忘記密碼</h2>
          <p className="desktop-jf-h3 text-primary-main text-center">
            請輸入您的電子郵件，我們將發送密碼重設連結至您的信箱。
          </p>
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
              <FormTitle musted title="電子郵件" htmlFor="email" />
              <RHFTextField
                type="email"
                name={'email'}
                placeholder="123456@gmail.com"
              />
              <div className="flex items-center justify-end">
                <ResetButton onClick={handleOnResetButtonClick} />
              </div>
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

export default ForgotPasswordView
