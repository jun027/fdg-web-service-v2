import { axs } from '@/utils/axios'

const prefix = '/selectlist'

async function getFundraiseAPI() {
  const data = await axs(`${prefix}/fundraise`, undefined, 'GET')

  return data
}

async function getReceiptTypeAPI() {
  const data = await axs(`${prefix}/receipttype`, undefined, 'GET')

  return data
}

async function getItemTypeAPI() {
  const data = await axs(`${prefix}/itemtype`, undefined, 'GET')

  return data
}

async function getPayTypeAPI() {
  const data = await axs(`${prefix}/paytype`, undefined, 'GET')

  return data
}

async function getCountryTownAPI() {
  const data = await axs(`${prefix}/countrytown`, undefined, 'GET')

  return data
}

async function getGuangmingAPI() {
  const data = await axs(`${prefix}/guangming`, undefined, 'GET')

  return data
}

async function getLightingAPI() {
  const data = await axs(`${prefix}/lighting`, undefined, 'GET')

  return data
}

async function getNewTypeAPI() {
  const data = await axs(`${prefix}/newstype`, undefined, 'GET')

  return data
}

export {
  getCountryTownAPI,
  getFundraiseAPI,
  getGuangmingAPI,
  getItemTypeAPI,
  getLightingAPI,
  getNewTypeAPI,
  getPayTypeAPI,
  getReceiptTypeAPI,
}
