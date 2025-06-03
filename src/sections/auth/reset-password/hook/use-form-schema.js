import { z } from 'zod'

function useFormSchema() {
  const defaultValues = {
    password: '',
    confirmPassword: '',
  }

  const baseSchema = z
    .object({
      password: z.string().min(8, { message: '密碼至少 8 位數' }),
      confirmPassword: z.string().min(8, { message: '密碼至少 8 位數' }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: '密碼與確認密碼不一致',
      path: ['confirmPassword'],
    })

  return { defaultValues, baseSchema }
}

export default useFormSchema
