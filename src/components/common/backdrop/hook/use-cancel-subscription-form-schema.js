import { z } from 'zod'

function useCancelSubscriptionFormSchema() {
  const defaultValues = {
    isCancel: 'no',
  }

  const baseSchema = z.object({
    isCancel: z.enum(['no', 'yes']),
  })

  return { defaultValues, baseSchema }
}

export default useCancelSubscriptionFormSchema
