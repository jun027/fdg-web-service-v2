'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton, InputAdornment } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IoMdRefresh } from 'react-icons/io'
import { MdOutlineVisibility, MdVisibilityOff } from 'react-icons/md'

import { registerAPI } from '@/apis/hook/use-auth'
import FormProvider from '@/components/common/hook-form/form-provider'
import FormTitle from '@/components/common/hook-form/form-title'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import { PicAuthCode } from '@/components/ui/pic-auth-code'
import usePicValidateCode from '@/components/ui/pic-auth-code/hook/use-pic-validate-code'
import { useBoolean } from '@/hook/use-boolean'
import { useRouter } from '@/routes/hooks'
import { PATHS } from '@/routes/path'

import useFormSchema from './hook/use-form-schema'

function SignupView() {
  const router = useRouter()
  const { authCode, codeHandler, picAuthCodeRef } = usePicValidateCode()

  const { value: showPassword, onToggle: showPasswordToggle } =
    useBoolean(false)

  const { value: showConfirmPassword, onToggle: showConfirmPasswordToggle } =
    useBoolean(false)

  const { defaultValues, baseSchema } = useFormSchema(authCode)

  const methods = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { mutateAsync } = useMutation({
    mutationKey: ['auth-register'],
    mutationFn: payload => registerAPI(payload),
    onSuccess: () => {
      toast.success('註冊成功')
      router.push(PATHS.Auth.child.Login.path)
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = useCallback(
    async data => {
      const payload = {
        username: data.account,
        email: data.email,
        password: data.password,
      }

      await mutateAsync(payload)
    },
    [mutateAsync],
  )

  const handleRefreshAuthCode = useCallback(() => {
    picAuthCodeRef.current.onRefresh()
  }, [picAuthCodeRef])

  return (
    <div className="overflow-auto flex-1">
      <div className="pb-6 flex flex-col min-h-full gap-6 sm:w-full sm:justify-center sm:py-8 sm:px-12 lg:py-16 lg:px-20 xl:py-28 xl:px-32">
        {/* Header */}
        <div className="flex flex-row gap-x-2 items-start px-4 sm:px-0">
          <div className="relative w-[25px] aspect-[25/29]">
            <Image
              src="/images/icons/sword-01.png"
              alt="logo"
              fill
              className="image"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <h2 className="desktop-fz-h2 text-primary-main">加入會員</h2>
            <p>
              <span className="desktop-jf-h3 text-primary-main">
                已經有會員了？
              </span>
              {'  '}
              <Link
                href={PATHS.Auth.child.Login.path}
                className="text-secondary-notion desktop-jf-h3 underline underline-offset-4"
              >
                立即登入
              </Link>
            </p>
          </div>
        </div>

        {/* Form */}
        <FormProvider
          className="flex flex-col gap-6"
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-6 px-4 sm:px-9">
            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Member Account */}
              <div className="rhf-block lg:flex-1">
                <FormTitle musted title="會員帳號" htmlFor="account" />
                <RHFTextField
                  type="text"
                  name={'account'}
                  placeholder="請輸入至少 8 位元"
                />
              </div>

              {/* Email */}
              <div className="rhf-block lg:flex-1">
                <FormTitle musted title="電子信箱" htmlFor="email" />
                <RHFTextField
                  type="email"
                  name={'email'}
                  placeholder="123456@gmail.com"
                />
              </div>
            </div>

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

            {/* Digital Code */}
            <div className="rhf-block">
              <FormTitle musted title="驗證碼" htmlFor="digitalCode" />

              <div className="flex flex-col gap-4 xl:flex-row xl:items-start">
                <div className="max-w-36">
                  <RHFTextField
                    type="text"
                    name={'digitalCode'}
                    placeholder="請輸入驗證碼"
                  />
                </div>
                <div className="flex flex-row gap-x-2">
                  <PicAuthCode ref={picAuthCodeRef} code={codeHandler} />
                  <button
                    type="button"
                    className="flex items-center gap-x-[2px] cursor-pointer"
                    onClick={handleRefreshAuthCode}
                  >
                    <span className="text-primary-main desktop-jf-h3">
                      刷新
                    </span>
                    <IoMdRefresh fontSize={24} className="text-primary-main" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-6 items-center px-4 sm:px-9">
            <button
              type="submit"
              className={clsx(
                'primary-button text-white desktop-jf-h3',
                isSubmitting &&
                  'opacity-50 cursor-not-allowed pointer-events-none',
              )}
            >
              註冊
            </button>
            <div
              className="w-full h-[1px] relative"
              style={{
                background:
                  'linear-gradient(90deg, rgba(222,226,230,1) 30%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, rgba(222,226,230,1) 70%)',
              }}
            >
              <p className="pos-center text-primary-main desktop-jf-h3">或</p>
            </div>
            <button
              type="button"
              className="w-6 h-6 flex justify-center items-center cursor-pointer"
            >
              <Image
                src="/images/icons/google-01.svg"
                alt="google-icon"
                width={24}
                height={24}
              />
            </button>
          </div>
        </FormProvider>
      </div>
    </div>
  )
}

export default SignupView
