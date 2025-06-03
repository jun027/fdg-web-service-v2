import { ReactQueryProvider } from './react-query-provider'

export async function AppProvider({ children }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}

export default AppProvider
