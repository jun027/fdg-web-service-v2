import { useCallback, useEffect } from 'react'

const REMEMBER_KEY = 'hcj_account'

function useRememberMe(methods) {
  const handleRememberEvent = useCallback(async (key, account) => {
    console.log(account)
    try {
      if (key) {
        localStorage.setItem(REMEMBER_KEY, account)
      } else {
        localStorage.removeItem(REMEMBER_KEY)
      }
    } catch (error) {
      console.error('Error during set session:', error)

      throw error
    }
  }, [])

  useEffect(() => {
    // load a value from local storage
    const account = localStorage.getItem(REMEMBER_KEY)

    if (account) {
      methods.setValue('account', account)
      methods.setValue('rememberMe', true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { handleRememberEvent }
}

export default useRememberMe
