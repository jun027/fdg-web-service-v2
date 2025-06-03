'use client'

import { useMutation } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import { logoutAPI } from '@/apis/hook/use-auth'
import { getInfoAPI, getStatusAPI } from '@/apis/hook/use-member'
import { useSetState } from '@/hook/use-set-state'

import { AuthContext } from './auth-context'
import { STORAGE_KEY } from './constant'
import { isValidToken, setSession } from './utils'

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({
    user: undefined,
    loading: true,
  })

  const [logoutTrigger, setLogoutTrigger] = useState(false)

  const memberInfoMutation = useMutation({
    mutationKey: ['member-info'],
    mutationFn: async () => {
      const { data: memberInfo } = await getInfoAPI()
      const { data: statusInfo } = await getStatusAPI()
      return { memberInfo, statusInfo }
    },
    onSuccess: response => {
      const { memberInfo, statusInfo } = response

      setState({
        user: {
          gender: memberInfo.gender,
          phone: memberInfo.phone,
          city: memberInfo.city,
          area: memberInfo.area,
          address: memberInfo.address,
          email: memberInfo.email,
          idNumber: memberInfo.id_number,
          account: statusInfo.username,
          memberId: statusInfo.member_id,
          name: statusInfo.name,
          memberLevel: statusInfo.member_level,
          status: statusInfo.status,
          isInfoSet: statusInfo.is_info_set,
        },
        loading: false,
      })
    },
  })

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY)
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken)
        await memberInfoMutation.mutateAsync()
      } else {
        setState({ user: undefined, loading: false })
      }
    } catch (error) {
      console.error(error)
      setState({ user: undefined, loading: false })
    }
  }, [memberInfoMutation, setState])

  const { mutateAsync: logoutMutateAsync, isPending: isLogoutPending } =
    useMutation({
      mutationKey: ['log-out'],
      mutationFn: logoutAPI,
      onSuccess: async response => {
        if (response.code === 0) {
          await setSession(undefined)
          setLogoutTrigger(true)
          await checkUserSession()
        } else {
          toast.error(response.message)
        }
        toast.success('登出成功')
      },
    })

  const handleLogout = useCallback(async () => {
    try {
      if (isLogoutPending) return
      await logoutMutateAsync()
    } catch (error) {
      console.error(error)
    }
  }, [isLogoutPending, logoutMutateAsync])

  useEffect(() => {
    checkUserSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated'

  const status = state.loading ? 'loading' : checkAuthenticated

  const memoizedValue = useMemo(
    () => ({
      user: state.user || undefined,
      checkUserSession,
      logoutTrigger,
      setLogoutTrigger,
      handleLogout,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, handleLogout, logoutTrigger, state.user, status],
  )

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  )
}
