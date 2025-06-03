import { z } from 'zod'

function useFormSchema(code) {
  const defaultValues = {
    account: '',
    email: '',
    password: '',
    confirmPassword: '',
    digitalCode: '',
  }

  const baseSchema = z
    .object({
      account: z.string().min(8, { message: '帳號至少 8 位元' }),
      email: z.string().email({ message: 'Email 格式錯誤' }),
      password: z.string().min(8, { message: '密碼至少 8 位數' }),
      confirmPassword: z.string().min(8, { message: '密碼至少 8 位數' }),
      digitalCode: z
        .string()
        .min(1, '請輸入驗證碼')
        .refine(value => value === code, '驗證碼錯誤'),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: '密碼與確認密碼不一致',
      path: ['confirmPassword'],
    })

  return { defaultValues, baseSchema }
}

export default useFormSchema
