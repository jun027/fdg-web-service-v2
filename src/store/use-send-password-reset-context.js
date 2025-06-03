import { create } from 'zustand'

export const useSendPasswordResetContext = create(set => ({
  isOpen: false,
  setOpen: isOpen => set({ isOpen }),
}))

export default useSendPasswordResetContext
