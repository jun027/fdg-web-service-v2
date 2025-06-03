'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton, InputAdornment } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaAngleLeft } from 'react-icons/fa6'
import { MdOutlineVisibility, MdVisibilityOff } from 'react-icons/md'

import { resetAPI } from '@/apis/hook/use-auth'
import FormProvider from '@/components/common/hook-form/form-provider'
import FormTitle from '@/components/common/hook-form/form-title'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import { useBoolean } from '@/hook/use-boolean'
import { PATHS } from '@/routes/path'

import useFormSchema from './hook/use-form-schema'

function ResetPasswordContainer() {
  const searchParams = useSearchParams()

  const { value: showPassword, onToggle: showPasswordToggle } =
    useBoolean(false)

  const { value: showConfirmPassword, onToggle: showConfirmPasswordToggle } =
    useBoolean(false)

  const code = searchParams.get('code')
  const email = searchParams.get('mail')

  const { defaultValues, baseSchema } = useFormSchema()

  const { mutateAsync } = useMutation({
    mutationKey: ['auth-resetpassword'],
    mutationFn: payload => resetAPI(payload),
    onSuccess: () => {
      toast.success('密碼重設成功')
    },
  })

  const methods = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = useCallback(
    async data => {
      const payload = {
        password: data.password,
        code,
        valid_value: email,
      }

      await mutateAsync(payload)
    },
    [code, email, mutateAsync],
  )

  return (
    <div className="overflow-auto flex-1">
      <div className="pb-6 flex flex-col min-h-full gap-6 sm:w-full sm:justify-center sm:py-8 sm:px-12 lg:py-16 lg:px-20 xl:py-28 xl:px-32">
        {/* Header */}
        <div className="flex flex-col gap-y-3 items-center px-4 sm:px-0">
          <div className="w-16 aspect-square bg-[url(/images/icons/key-icon-01.png)] bg-no-repeat bg-center bg-cover" />
          <h2 className="desktop-fz-h2 text-primary-main">修改密碼</h2>
        </div>

        {/* Form */}
        <FormProvider
          className="flex flex-col gap-6"
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6 px-4 sm:px-9">
            {/* Password */}
            <div className="rhf-block">
              <FormTitle musted title="密碼" htmlFor="password" />
              <RHFTextField
                name={'password'}
                disabled={isSubmitting}
                type={showPassword ? 'text' : 'password'}
                placeholder="請輸入至少 8 位數密碼"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          disabled={isSubmitting}
                          aria-label="toggle password visibility"
                          onClick={showPasswordToggle}
                          edge="end"
                        >
                          {showPassword ? (
                            <MdVisibilityOff color="#c1c1c1" />
                          ) : (
                            <MdOutlineVisibility color="#c1c1c1" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </div>

            {/* Confirm Password */}
            <div className="rhf-block">
              <FormTitle musted title="確認密碼" htmlFor="confirmPassword" />
              <RHFTextField
                name={'confirmPassword'}
                disabled={isSubmitting}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="請再次輸入密碼"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          disabled={isSubmitting}
                          aria-label="toggle password visibility"
                          onClick={showConfirmPasswordToggle}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <MdVisibilityOff color="#c1c1c1" />
                          ) : (
                            <MdOutlineVisibility color="#c1c1c1" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
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

function ResetPasswordView({ children }) {
  return (
    <Suspense>
      <ResetPasswordContainer>{children}</ResetPasswordContainer>
    </Suspense>
  )
}

export default ResetPasswordView
