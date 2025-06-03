import { AuthGuard } from '@/auth/guard'

function Layout({ children }) {
  return <AuthGuard>{children}</AuthGuard>
}

export default Layout
