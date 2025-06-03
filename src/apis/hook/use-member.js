import { axs } from '@/utils/axios'

const prefix = '/member'

async function getMeritInfoAPI() {
  const data = await axs(`${prefix}/meritinfo`, undefined, 'GET')

  return data.data
}

async function subRecordsAPI(payload) {
  const data = await axs(`${prefix}/subRecords`, payload)

  return data
}

async function chanelSubRecordsAPI(payload) {
  const data = await axs(`${prefix}/chanelSubRecords`, payload)

  return data
}

async function getInfoAPI() {
  const data = await axs(`${prefix}/info`, undefined, 'GET')

  return data
}

async function infoAPI(payload) {
  const data = await axs(`${prefix}/info`, payload)

  return data
}

async function getStatusAPI() {
  const data = await axs(`${prefix}/status`, undefined, 'GET')

  return data
}

async function statusAPI(payload) {
  const data = await axs(`${prefix}/status`, payload)

  return data
}

async function historyAPI(payload) {
  const data = await axs(`${prefix}/history`, payload)

  return data
}

export {
  chanelSubRecordsAPI,
  getInfoAPI,
  getMeritInfoAPI,
  getStatusAPI,
  historyAPI,
  infoAPI,
  statusAPI,
  subRecordsAPI,
}
