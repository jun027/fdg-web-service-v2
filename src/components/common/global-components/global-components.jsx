import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from '@/auth/context/auth-provider'

import {
  BankTransferBackdrop,
  CancelSubscriptionBackdrop,
  SendPasswordResetBackdrop,
} from '../backdrop'

export default function GlobalComponents({ children }) {
  return (
    <>
      <SendPasswordResetBackdrop />
      <CancelSubscriptionBackdrop />
      <BankTransferBackdrop />

      <Toaster
        toastOptions={{
          duration: 5000,
          position: 'top-right',
        }}
      />

      <AuthProvider>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          {children}
        </GoogleOAuthProvider>

        {/* <MobileMenuView /> */}

        {/* <DepositBadgeView /> */}
      </AuthProvider>
    </>
  )
}
