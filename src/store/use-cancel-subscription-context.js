import { create } from 'zustand'

export const useCancelSubscriptionContext = create(set => ({
  isOpen: false,
  setOpen: isOpen => set({ isOpen, stage: isOpen ? 1 : undefined }),
  stage: 1,
  setStage: number => set({ stage: number }),
}))

export default useCancelSubscriptionContext
