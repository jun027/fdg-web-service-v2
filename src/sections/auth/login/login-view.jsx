'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton, InputAdornment } from '@mui/material'
import { useGoogleLogin } from '@react-oauth/google'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { IoMdRefresh } from 'react-icons/io'
import { MdOutlineVisibility, MdVisibilityOff } from 'react-icons/md'

import { loginAPI } from '@/apis/hook/use-auth'
import { setSession } from '@/auth/context/utils'
import { useAuthContext } from '@/auth/hooks'
import FormProvider from '@/components/common/hook-form/form-provider'
import FormTitle from '@/components/common/hook-form/form-title'
import { RHFCheckbox } from '@/components/common/hook-form/rhf-checkbox'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import { PicAuthCode } from '@/components/ui/pic-auth-code'
import usePicValidateCode from '@/components/ui/pic-auth-code/hook/use-pic-validate-code'
import { useBoolean } from '@/hook/use-boolean'
import { useRouter } from '@/routes/hooks'
import { PATHS } from '@/routes/path'

import { useFormSchema } from '.'
import useRememberMe from './hook/use-remember-me'

function LoginView() {
  const router = useRouter()

  const { checkUserSession } = useAuthContext()

  const { authCode, codeHandler, picAuthCodeRef } = usePicValidateCode()

  const { value: showPassword, onToggle: showPasswordToggle } =
    useBoolean(false)

  const { defaultValues, baseSchema } = useFormSchema(authCode)

  const methods = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleRememberEvent } = useRememberMe(methods)

  const { mutateAsync } = useMutation({
    mutationKey: ['auth-login'],
    mutationFn: payload => loginAPI(payload),
    onSuccess: data => {
      const { data: jwtToken } = data
      setSession(jwtToken)

      toast.success('登入成功')
      router.push(PATHS.Home.path)
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async data => {
    const payload = {
      acc: data.account,
      pass: data.password,
      rememberMe: data.rememberMe,
      digitalCode: data.digitalCode,
    }

    await handleRememberEvent(data.rememberMe, payload.acc)

    await mutateAsync({
      username: payload.acc,
      password: payload.pass,
      login_type: 'account',
      login_relate: undefined,
    })

    await checkUserSession?.()
    router.refresh()
  }

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
    onSuccess: async tokenResponse => {
      const payload = {
        username: undefined,
        password: undefined,
        login_type: 'google',
        login_relate: {
          code: tokenResponse.code,
        },
      }

      await mutateAsync(payload)

      await checkUserSession?.()
      router.refresh()
    },
    onError: () => {
      console.log('Login Failed')
    },
  })

  const handleRefreshAuthCode = useCallback(() => {
    picAuthCodeRef.current.onRefresh()
  }, [picAuthCodeRef])

  return (
    <main className="overflow-auto flex-1">
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
            <h2 className="desktop-fz-h2 text-primary-main">登入您的帳號</h2>
            <p>
              <span className="desktop-jf-h3 text-primary-main">
                還沒有帳戶？
              </span>
              {'  '}
              <Link
                href={PATHS.Auth.child.SignUp.path}
                className="text-secondary-notion desktop-jf-h3 underline underline-offset-4"
              >
                立即註冊
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
            {/* Member Account */}
            <div className="rhf-block">
              <div className="flex justify-between items-center">
                <FormTitle musted title="會員帳號" htmlFor="account" />
                {/* <Link
                  className="desktop-jf-h3 text-secondary-notion"
                  href={PATHS.Auth.child.ForgotAccount.path}
                >
                  忘記帳號？
                </Link> */}
              </div>
              <RHFTextField
                type="text"
                name={'account'}
                placeholder="請輸入至少 8 位元"
              />
            </div>

            {/* Password */}
            <div className="rhf-block">
              <div className="flex justify-between items-center">
                <FormTitle musted title="密碼" htmlFor="password" />
                <Link
                  className="desktop-jf-h3 text-secondary-notion"
                  href={PATHS.Auth.child.ForgotPassword.path}
                >
                  忘記密碼？
                </Link>
              </div>
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
              <div className="flex items-center gap-2">
                <RHFCheckbox name={'rememberMe'} id={'rememberMe'} />
                <label
                  htmlFor="rememberMe"
                  className="desktop-jf-h3 text-primary-main"
                >
                  記住我
                </label>
              </div>
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
              className="primary-button text-white desktop-jf-h3"
            >
              登入
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
              onClick={() => googleLogin()}
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
    </main>
  )
}

export default LoginView
