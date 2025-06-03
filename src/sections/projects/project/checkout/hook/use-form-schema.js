import { z } from 'zod'

import { NEED_RECEIPT_OPTIONS } from '../constants/config'

function useFormSchema({ payTypeList = [] }) {
  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    city: '',
    area: '',
    address: '',
    needReceipt: '1',
    receiptTitle: '',
    receiptEmail: '',
    receiptPhone: '',
    receiptCity: '',
    receiptArea: '',
    receiptAddress: '',
    paymentMethod: `${payTypeList[0].type}`,
  }

  const baseSchema = z.object({
    name: z.string().min(1, '姓名不得為空'),
    email: z.string().email({ message: 'Email 格式錯誤' }),
    phone: z
      .string()
      .min(1, '聯絡手機不得為空')
      .regex(/^09\d{8}$/, '請輸入正確的手機號碼格式'),
    city: z.union([z.string().min(1, '請選擇縣市'), z.number()]),
    area: z.union([z.string().min(1, '請選擇地區'), z.number()]),
    address: z.string().min(1, '地址不得為空'),
    needReceipt: z.enum([NEED_RECEIPT_OPTIONS.YES, NEED_RECEIPT_OPTIONS.NO]),
    paymentMethod: z.enum(payTypeList.map(item => `${item.type}`)),
  })

  // 有收據的驗證規則
  const receiptRequiredSchema = baseSchema.extend({
    needReceipt: z.literal(NEED_RECEIPT_OPTIONS.YES),
    receiptTitle: z.string().min(1, '抬頭不得為空'),
    receiptEmail: z.string().email({ message: 'Email 格式錯誤' }),
    receiptPhone: z
      .string()
      .min(1, '聯絡手機不得為空')
      .regex(/^09\d{8}$/, '請輸入正確的手機號碼格式'),
    receiptCity: z.union([z.string().min(1, '請選擇縣市'), z.number()]),
    receiptArea: z.union([z.string().min(1, '請選擇地區'), z.number()]),
    receiptAddress: z.string().min(1, '地址不得為空'),
  })

  // 不需要收據的驗證規則（不要求額外欄位）
  const noReceiptSchema = baseSchema.extend({
    needReceipt: z.literal(NEED_RECEIPT_OPTIONS.NO),
  })

  const schema = z.discriminatedUnion('needReceipt', [
    receiptRequiredSchema,
    noReceiptSchema,
  ])

  return { defaultValues, schema }
}

export default useFormSchema
