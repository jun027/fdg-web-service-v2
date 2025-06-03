import { axs } from '@/utils/axios'

const prefix = '/pray'

async function newPrayAPI(payload) {
  const data = await axs(`${prefix}/newPray`, payload)

  return data
}

async function getPrayAPI() {
  const data = await axs(`${prefix}/getPray`, undefined, 'GET')

  return data
}

export { getPrayAPI, newPrayAPI }
