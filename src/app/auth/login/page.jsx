import { GuestGuard } from '@/auth/guard'
import ClientOnlyView from '@/components/common/client-only/client-only-view'
import { LoginView } from '@/sections/auth/login'

export default function LoginPage() {
  return (
    <GuestGuard>
      <ClientOnlyView>
        <LoginView />
      </ClientOnlyView>
    </GuestGuard>
  )
}
