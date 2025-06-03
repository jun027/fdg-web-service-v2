import { z } from 'zod'

function useFormSchema() {
  const defaultValues = {
    deposit: 0,
  }

  const baseSchema = z.object({
    deposit: z.number().min(0, '存款金額不得為負'),
  })

  return { defaultValues, baseSchema }
}

export default useFormSchema
