import { z } from 'zod'

function useFormSchema() {
  const defaultValues = {
    email: '',
  }

  const baseSchema = z.object({
    email: z.string().email({ message: 'Email 格式錯誤' }),
  })

  return { defaultValues, baseSchema }
}

export default useFormSchema
