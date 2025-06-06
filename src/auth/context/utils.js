import axios from 'axios'

import { STORAGE_KEY } from './constant'

export function jwtDecode(token) {
  try {
    if (!token) return

    const parts = token.split('.')
    if (parts.length < 2) {
      throw new Error('Invalid token!')
    }

    const base64Url = parts[1]
    const base64 = base64Url.replaceAll('-', '+').replaceAll('_', '/')
    const decoded = JSON.parse(atob(base64))

    return decoded
  } catch (error) {
    console.error('Error decoding token:', error)
    throw error
  }
}

export function isValidToken(accessToken) {
  if (!accessToken) {
    return false
  }

  try {
    const decoded = jwtDecode(accessToken)

    if (!decoded || !('exp' in decoded)) {
      return false
    }

    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  } catch (error) {
    console.error('Error during token validating:', error)
    return false
  }
}

export function tokenExpired(exp) {
  const currentTime = Date.now()
  const timeLeft = exp * 1000 - currentTime

  setTimeout(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      throw error
    }
  }, timeLeft)
}

export async function setSession(accessToken) {
  try {
    if (accessToken) {
      localStorage.setItem(STORAGE_KEY, accessToken)

      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

      const decodedToken = jwtDecode(accessToken)

      if (decodedToken && 'exp' in decodedToken) {
        tokenExpired(decodedToken.exp)
      } else {
        throw new Error('Invalid access token!')
      }
    } else {
      localStorage.removeItem(STORAGE_KEY)
      delete axios.defaults.headers.common.Authorization
    }
  } catch (error) {
    console.error('Error during set session:', error)

    throw error
  }
}
