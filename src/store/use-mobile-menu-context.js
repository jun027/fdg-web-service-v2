import { create } from 'zustand'

export const useMobileMenuContext = create(set => ({
  isOpen: false,
  setOpen: isOpen => set({ isOpen }),
}))

export default useMobileMenuContext
