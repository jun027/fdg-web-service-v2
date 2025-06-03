import { axs } from '@/utils/axios'

const prefix = '/news'

async function getNewAPI(payload) {
  const data = await axs(`${prefix}/${payload.id}`, undefined, 'GET')

  return data.data
}

async function getNewsAPI() {
  const data = await axs(`${prefix}`, undefined, 'GET')

  return data.data
}

export { getNewAPI, getNewsAPI }
