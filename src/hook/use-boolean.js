import { useCallback, useState } from 'react'

// ----------------------------------------------------------------------

export function useBoolean(defaultValue) {
  const [value, setValue] = useState(!!defaultValue)

  const onTrue = useCallback(() => {
    setValue(true)
  }, [])

  const onFalse = useCallback(() => {
    setValue(false)
  }, [])

  const onToggle = useCallback(() => {
    setValue(previous => !previous)
  }, [])

  return {
    value,
    onTrue,
    onFalse,
    onToggle,
    setValue,
  }
}
