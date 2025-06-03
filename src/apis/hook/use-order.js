import { axs } from '@/utils/axios'

const prefix = '/order'

async function fundraiseAPI(payload) {
  const data = await axs(`${prefix}/fundraise`, payload)

  return data
}

async function payResultAPI(payload) {
  const data = await axs(`${prefix}/payResult`, payload)

  return data
}

async function lightingLampAPI(payload) {
  const data = await axs(`${prefix}/lighting-lamp`, payload)

  return data
}

async function treasuryAPI(payload) {
  const data = await axs(`${prefix}/treasury`, payload)

  return data
}

async function guangmingAPI(payload) {
  const data = await axs(`${prefix}/guangming`, payload)

  return data
}

async function donateAPI(payload) {
  const data = await axs(`${prefix}/donate`, payload)

  return data
}

async function getPoemAPI() {
  const data = await axs(`${prefix}/poem`, undefined, 'GET')

  return data
}

async function getThrowJiaoAPI() {
  const data = await axs(`${prefix}/throw-jiao`, undefined, 'GET')

  return data
}

export {
  donateAPI,
  fundraiseAPI,
  getPoemAPI,
  getThrowJiaoAPI,
  guangmingAPI,
  lightingLampAPI,
  payResultAPI,
  treasuryAPI,
}
