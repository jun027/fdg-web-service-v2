import { useCallback, useMemo, useState } from 'react'

import { isEqual } from '@/utils/helper'

// ----------------------------------------------------------------------

export function useSetState(initialState) {
  const [state, set] = useState(initialState)

  const canReset = !isEqual(state, initialState)

  const setState = useCallback(updateState => {
    set(previousValue => ({ ...previousValue, ...updateState }))
  }, [])

  const setField = useCallback(
    (name, updateValue) => {
      setState({
        [name]: updateValue,
      })
    },
    [setState],
  )

  const onResetState = useCallback(() => {
    set(initialState)
  }, [initialState])

  const memoizedValue = useMemo(
    () => ({
      state,
      setState,
      setField,
      onResetState,
      canReset,
    }),
    [canReset, onResetState, setField, setState, state],
  )

  return memoizedValue
}
