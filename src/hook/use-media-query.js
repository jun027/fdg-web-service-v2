'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof globalThis !== 'undefined') {
      const media = globalThis.matchMedia(query)

      setMatches(media.matches)

      const listener = event => {
        setMatches(event.matches)
      }

      media.addEventListener('change', listener)

      return () => {
        media.removeEventListener('change', listener)
      }
    }
  }, [query])

  return matches
}
