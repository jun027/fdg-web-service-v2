import { z } from 'zod'

function useBankTransferFormSchema() {
  const defaultValues = {
    account: '',
  }

  const baseSchema = z.object({
    account: z
      .string()
      .min(5, { message: '請輸入帳號後五碼' })
      .max(5, { message: '請輸入帳號後五碼' }),
  })

  return { defaultValues, baseSchema }
}

export default useBankTransferFormSchema
