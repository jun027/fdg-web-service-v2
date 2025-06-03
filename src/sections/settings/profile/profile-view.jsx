'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MenuItem } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { resetmailAPI } from '@/apis/hook/use-auth'
import { infoAPI } from '@/apis/hook/use-member'
import { useAuthContext } from '@/auth/hooks'
import FormProvider from '@/components/common/hook-form/form-provider'
import FormTitle from '@/components/common/hook-form/form-title'
import { RHFSelect } from '@/components/common/hook-form/rhf-select'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import { useCountryTown } from '@/hook/use-country-town'
import { useSendPasswordResetContext } from '@/store/use-send-password-reset-context'

import useFormSchema from './hook/use-form-schema'

function ProfileView({
  countryOptions: initialCountryOptions = [],
  areaMap: initialAreaMap = {},
}) {
  const setOpen = useSendPasswordResetContext(state => state.setOpen)

  const { countryOptions, areaOptions, onCityChange } = useCountryTown({
    initialCountryOptions,
    initialAreaMap,
  })

  const { defaultValues, baseSchema } = useFormSchema()

  const methods = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit, watch } = methods

  const email = watch('email')

  const { user, checkUserSession } = useAuthContext()

  const { mutateAsync } = useMutation({
    mutationKey: ['member-info'],
    mutationFn: payload => infoAPI(payload),
    onSuccess: async () => {
      toast.success('更新成功')
      await checkUserSession()
    },
  })

  const { mutateAsync: mutateAsyncResetMail } = useMutation({
    mutationKey: ['member-info-reset-mail'],
    mutationFn: payload => resetmailAPI(payload),
    onSuccess: () => {
      setOpen(true)
    },
  })

  const handleCityChange = useCallback(
    event => {
      onCityChange(event.target.value)
      methods.setValue('city', event.target.value)
      methods.setValue('area', '')
      methods.trigger('city')
    },
    [methods, onCityChange],
  )

  const handleCancelButtonClick = useCallback(() => {
    methods.setValue('name', user?.name || '')
    methods.setValue('phone', user?.phone || '')
    methods.setValue('email', user?.email || '')
    methods.setValue('city', user?.city || '')
    onCityChange(user?.city || '')
    methods.setValue('area', user?.area || '')
    methods.setValue('address', user?.address || '')
  }, [methods, onCityChange, user])

  const handleResetMailClick = useCallback(async () => {
    const payload = {
      email,
    }

    await mutateAsyncResetMail(payload)
  }, [email, mutateAsyncResetMail])

  const onSubmit = useCallback(
    async data => {
      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        city: data.city,
        area: data.area,
        address: data.address,
      }

      await mutateAsync(payload)
    },
    [mutateAsync],
  )

  useEffect(() => {
    if (user) {
      methods.setValue('name', user.name)
      methods.setValue('phone', user.phone)
      methods.setValue('email', user.email)
      methods.setValue('city', user.city)
      onCityChange(user.city)
      methods.setValue('area', user.area)
      methods.setValue('address', user.address)
    }
  }, [user, methods, onCityChange])

  return (
    <main className="main-background">
      <div className="flex flex-col gap-y-9 pb-6 sm:pb-0">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-primary-main desktop-jf-h1 flex flex-row items-center gap-x-2">
            <div className="relative w-5 aspect-[44/51]">
              <Image
                src="/images/icons/sword-02.png"
                alt="logo"
                fill
                placeholder="empty"
                className="image scale-75"
              />
            </div>
            <span>會員基本資料</span>
          </h3>
          <button
            className="desktop-jf-h4 text-primary-main underline-offset-1 underline cursor-pointer"
            onClick={handleResetMailClick}
          >
            發送密碼修改連結
          </button>
        </div>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-9"
        >
          <div className="rhf-block lg:flex-1">
            <FormTitle title="姓名" htmlFor="name" />
            <RHFTextField type="text" name={'name'} placeholder="姓名" />
          </div>

          <div className="rhf-block lg:flex-1">
            <FormTitle title="手機號碼" htmlFor="phone" />
            <RHFTextField type="text" name={'phone'} placeholder="手機號碼" />
          </div>

          <div className="rhf-block lg:flex-1">
            <FormTitle title="電子信箱" htmlFor="email" />
            <RHFTextField type="text" name={'email'} placeholder="電子信箱" />
          </div>

          <div className="rhf-block lg:flex-1">
            <FormTitle title="寄送地址" htmlFor="address" />
            <div className="flex flex-row gap-x-2">
              <div className="flex-1">
                <RHFSelect name="city" onChange={handleCityChange}>
                  {countryOptions.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>
              <div className="flex-1">
                <RHFSelect name="area">
                  {areaOptions.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </div>
            </div>
            <RHFTextField type="text" name={'address'} placeholder="詳細地址" />
          </div>

          <div className="flex flex-col gap-y-6 sm:flex-row sm:gap-x-6">
            <button
              type="submit"
              className="primary-button desktop-jf-h3 text-white"
            >
              儲存
            </button>
            <button
              type="button"
              className="secondary-button desktop-jf-h3 text-primary-main"
              onClick={handleCancelButtonClick}
            >
              取消
            </button>
          </div>
        </FormProvider>
      </div>
    </main>
  )
}

export default ProfileView
