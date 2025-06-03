'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MenuItem } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { FaReply } from 'react-icons/fa'

import { fundraiseAPI } from '@/apis/hook/use-order'
import FormProvider from '@/components/common/hook-form/form-provider'
import FormTitle from '@/components/common/hook-form/form-title'
import { RHFRadioButton } from '@/components/common/hook-form/rhf-radio-button'
import { RHFSelect } from '@/components/common/hook-form/rhf-select'
import RHFTextField from '@/components/common/hook-form/rhf-text-field'
import { DonatePlanCard } from '@/components/ui/donate-plan-card'
import { ProgressStep } from '@/components/ui/progress-step'
import { PROGRESS_STEP_LIST } from '@/components/ui/progress-step/config'
import {
  MONTHLY_DONATION_TEXT,
  SINGLE_DONATION_TEXT,
  SINGLE_DONATION_TYPE,
} from '@/constants/projects'
import { useCountryTown } from '@/hook/use-country-town'
import { PATHS } from '@/routes/path'

import { NEED_RECEIPT_OPTIONS } from './constants/config'
import useFormSchema from './hook/use-form-schema'

function CheckoutView({
  projectId,
  countryOptions: initialCountryOptions = [],
  areaMap: initialAreaMap = {},
  payType: initialPayType = [],
  itemData: initialItemData = {},
  id: itemId = '',
}) {
  const { mutateAsync } = useMutation({
    mutationKey: ['order-fundraise'],
    mutationFn: payload => fundraiseAPI(payload),
    onSuccess: data => {
      console.log('[oder-fundraise] data:', data)

      const url = data.data.url
      // eslint-disable-next-line unicorn/prefer-global-this
      window.location.href = url
    },
  })

  const { countryOptions, areaOptions, onCityChange } = useCountryTown({
    initialCountryOptions,
    initialAreaMap,
  })

  const {
    countryOptions: receiptCountryOptions,
    areaOptions: receiptAreaOptions,
    onCityChange: onReceiptCityChange,
  } = useCountryTown({
    initialCountryOptions,
    initialAreaMap,
  })

  const { defaultValues, schema: baseSchema } = useFormSchema({
    payTypeList: initialPayType,
  })

  const methods = useForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit, watch } = methods

  const needReceipt = watch('needReceipt')

  const handleCityChange = useCallback(
    event => {
      onCityChange(event.target.value)
      methods.setValue('city', event.target.value)
      methods.setValue('area', '')
      methods.trigger('city')
    },
    [methods, onCityChange],
  )

  const handleReceiptCityChange = useCallback(
    event => {
      onReceiptCityChange(event.target.value)
      methods.setValue('receiptCity', event.target.value)
      methods.setValue('receiptArea', '')
      methods.trigger('receiptCity')
    },
    [methods, onReceiptCityChange],
  )

  const onSubmit = useCallback(
    async data => {
      const payload = {
        service_list: {
          item_id: itemId,
        },
        payform: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          city: data.city,
          area: data.area,
          address: data.address,
          needReceipt: data.needReceipt,
          receipt_extra: {
            receiptTitle: data.receiptTitle,
            receiptEmail: data.receiptEmail,
            receiptPhone: data.receiptPhone,
            receiptCity: data.receiptCity,
            receiptArea: data.receiptArea,
            receiptAddress: data.receiptAddress,
          },
        },
        pay_type: Number(data.paymentMethod),
        pay_extra: {},
      }

      await mutateAsync(payload)
    },
    [itemId, mutateAsync],
  )

  const styledReceiptBlock = useMemo(() => {
    return clsx(
      'rhf-block lg:flex-1',
      needReceipt === NEED_RECEIPT_OPTIONS.NO && 'hidden',
    )
  }, [needReceipt])

  return (
    <main className="main-background">
      <div className="max-w-[1280px] mx-auto w-full px-4 flex flex-col gap-y-6 pb-6 pt-[104px] sm:pb-12 sm:pt-[140px]">
        <ProgressStep steps={PROGRESS_STEP_LIST} currentStepId="2" />

        <div className="flex flex-col gap-y-10 sm:flex-row sm:gap-y-0 sm:gap-x-12">
          <div className="flex flex-col gap-y-3 items-start sm:max-w-[300px] lg:max-w-[411px]">
            <Link
              href={`${PATHS.Projects.path}/${projectId}`}
              className="desktop-jf-h2 text-primary-main flex flex-row items-center gap-x-2 cursor-pointer ml-3"
            >
              <FaReply className="text-primary-main text-base" />
              返回
            </Link>
            <DonatePlanCard
              name={
                initialItemData.type === SINGLE_DONATION_TYPE
                  ? SINGLE_DONATION_TEXT
                  : MONTHLY_DONATION_TEXT
              }
              donateType={initialItemData.type}
              price={initialItemData.amount}
              description={initialItemData.description}
              disabledButton
              rewards={initialItemData.reward_list}
            />
          </div>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-6 sm:flex-1 sm:pt-[42px]"
          >
            {/* 捐款資料 */}
            <div className="flex flex-col gap-y-6 p-4 rounded-2xl border-[1px] border-primary-main">
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
                <span>捐款資料</span>
              </h3>

              <div className="rhf-block lg:flex-1">
                <FormTitle title="姓名" htmlFor="name" />
                <RHFTextField type="text" name={'name'} placeholder="姓名" />
              </div>

              <div className="rhf-block lg:flex-1">
                <FormTitle title="信箱" htmlFor="email" />
                <RHFTextField
                  type="email"
                  name={'email'}
                  placeholder="請輸入電子信箱"
                />
              </div>

              <div className="rhf-block lg:flex-1">
                <FormTitle title="手機號碼" htmlFor="phone" />
                <RHFTextField
                  type="tel"
                  name={'phone'}
                  placeholder="請輸入手機號碼"
                />
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
                <RHFTextField
                  type="text"
                  name={'address'}
                  placeholder="詳細地址"
                />
                <p className="text-primary-main desktop-jf-h4">
                  請務必填寫正確，避免寄送錯誤。若發現填寫錯誤，請聯繫廟方修改資料，歡迎來電：（08）888
                  - 2122
                </p>
              </div>
            </div>

            {/* 收據資料 */}
            <div className="flex flex-col gap-y-6 p-4 rounded-2xl border-[1px] border-primary-main">
              <h3 className="text-primary-main desktop-jf-h1 flex flex-col gap-y-3 lg:flex-row lg:items-end lg:gap-x-2">
                <div className="flex flex-row items-center gap-x-2">
                  <div className="relative w-5 aspect-[44/51]">
                    <Image
                      src="/images/icons/sword-02.png"
                      alt="logo"
                      fill
                      placeholder="empty"
                      className="image scale-75"
                    />
                  </div>
                  <span>收據資料</span>
                </div>
                <span className="text-primary-main desktop-jf-h4 flex-1 lg:pb-2">
                  （如果您需要可抵扣稅額的正式捐款收據，請在這欄選擇“是”）
                </span>
              </h3>

              <div className="flex items-center gap-x-6">
                <p className="text-primary-main desktop-jf-h3">
                  是否需要收據？
                </p>
                <div className="flex items-center gap-x-6">
                  <RHFRadioButton
                    size="normal"
                    id="radio-button-needReceipt-true"
                    value={NEED_RECEIPT_OPTIONS.YES}
                    name="needReceipt"
                    label={'是'}
                  />
                  <RHFRadioButton
                    size="normal"
                    id="radio-button-needReceipt-false"
                    value={NEED_RECEIPT_OPTIONS.NO}
                    name="needReceipt"
                    label={'否'}
                  />
                </div>
              </div>

              <div className={styledReceiptBlock}>
                <FormTitle title="抬頭資料" htmlFor="receiptTitle" />
                <RHFTextField
                  type="text"
                  name={'receiptTitle'}
                  placeholder="請輸入抬頭"
                />
              </div>

              <div className={styledReceiptBlock}>
                <FormTitle title="信箱" htmlFor="receiptEmail" />
                <RHFTextField
                  type="email"
                  name={'receiptEmail'}
                  placeholder="請輸入電子信箱"
                />
              </div>

              <div className={styledReceiptBlock}>
                <FormTitle title="聯絡電話" htmlFor="receiptPhone" />
                <RHFTextField
                  type="tel"
                  name={'receiptPhone'}
                  placeholder="請輸入聯絡電話"
                />
              </div>

              <div className={styledReceiptBlock}>
                <FormTitle title="寄送地址" htmlFor="receiptAddress" />
                <div className="flex flex-row gap-x-2">
                  <div className="flex-1">
                    <RHFSelect
                      name="receiptCity"
                      onChange={handleReceiptCityChange}
                    >
                      {receiptCountryOptions.map(item => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </div>
                  <div className="flex-1">
                    <RHFSelect name="receiptArea">
                      {receiptAreaOptions.map(item => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </div>
                </div>
                <RHFTextField
                  type="text"
                  name={'receiptAddress'}
                  placeholder="詳細地址"
                />
                <p className="text-primary-main desktop-jf-h4">
                  請務必填寫正確，避免寄送錯誤。若發現填寫錯誤，請聯繫廟方修改資料，歡迎來電：（08）888
                  - 2122
                </p>
              </div>
            </div>

            {/* 付款方式 */}
            <div className="flex flex-col gap-y-6 p-4 rounded-2xl border-[1px] border-primary-main">
              <h3 className="text-primary-main desktop-jf-h1 pb-3 border-b-[1px] border-primary-main flex flex-row items-center gap-x-2">
                <div className="relative w-5 aspect-[44/51]">
                  <Image
                    src="/images/icons/sword-02.png"
                    alt="logo"
                    fill
                    placeholder="empty"
                    className="image scale-75"
                  />
                </div>
                <span>付款方式</span>
              </h3>

              <div className="flex items-center gap-x-6">
                {initialPayType.map(data => (
                  <RHFRadioButton
                    key={data.type}
                    size="normal"
                    id={`radio-button-${data.type}`}
                    value={`${data.type}`}
                    name="paymentMethod"
                    label={data.name}
                  />
                ))}
              </div>
            </div>

            {/* 確認送出 */}
            <button
              type="submit"
              className="primary-button text-white desktop-jf-h3"
            >
              確認送出
            </button>
          </FormProvider>
        </div>
      </div>
    </main>
  )
}

export default CheckoutView
