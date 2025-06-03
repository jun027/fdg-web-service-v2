import { create } from 'zustand'

export const useBankTransferContext = create(set => ({
  isOpen: false,
  hashCode: '',
  amount: 0,
  open: (hashCode, amount) => set({ isOpen: true, hashCode, amount }),
  close: () => set({ isOpen: false, hashCode: '', amount: 0 }),
}))

export default useBankTransferContext
