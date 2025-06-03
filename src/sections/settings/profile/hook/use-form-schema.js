import { z } from 'zod'

function useFormSchema() {
  const defaultValues = {
    name: '',
    phone: '',
    email: '',
    city: '',
    area: '',
    address: '',
  }

  const baseSchema = z.object({
    name: z.string().min(1, '姓名不得為空'),
    phone: z
      .string()
      .min(1, '聯絡手機不得為空')
      .regex(/^09\d{8}$/, '請輸入正確的手機號碼格式'),
    email: z.string().email({ message: 'Email 格式錯誤' }),
    city: z.union([z.string().min(1, '請選擇縣市'), z.number()]),
    area: z.union([z.string().min(1, '請選擇地區'), z.number()]),
    address: z.string().min(1, '地址不得為空'),
  })

  return { defaultValues, baseSchema }
}

export default useFormSchema
