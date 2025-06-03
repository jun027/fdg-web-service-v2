import { z } from 'zod'

function useFormSchema(code) {
  const defaultValues = {
    account: '',
    password: '',
    rememberMe: false,
    digitalCode: '',
  }

  const baseSchema = z.object({
    account: z.string().min(8, { message: '帳號至少 8 位元' }),
    password: z.string().min(8, { message: '密碼至少 8 位數' }),
    rememberMe: z.boolean().optional(),
    digitalCode: z
      .string()
      .min(1, '請輸入驗證碼')
      .refine(value => value === code, '驗證碼錯誤'),
  })

  return { defaultValues, baseSchema }
}

export default useFormSchema
