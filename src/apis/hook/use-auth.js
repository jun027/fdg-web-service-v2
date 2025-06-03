import { axs } from '@/utils/axios'

const prefix = '/auth'

async function loginAPI(payload) {
  const data = await axs(`${prefix}/login`, payload)

  return data
}

async function registerAPI(payload) {
  const data = await axs(`${prefix}/register`, payload)

  return data
}

async function logoutAPI() {
  const data = await axs(`${prefix}/logout`, undefined, 'POST', true)

  return data
}

async function resetAPI(payload) {
  const data = await axs(`${prefix}/reset`, payload)

  return data
}

async function resetmailAPI(payload) {
  const data = await axs(`${prefix}/resetmail`, payload)

  return data
}

export { loginAPI, logoutAPI, registerAPI, resetAPI, resetmailAPI }
