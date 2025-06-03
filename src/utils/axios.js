import _axios from 'axios'
import toast from 'react-hot-toast'

import { NOT_SUCCESS_CODE } from '@/apis/constants/api-code'

const handleCatchError = error => {
  if (error.response.data?.code === NOT_SUCCESS_CODE) {
    toast.error(error.response.data?.message)
  } else {
    toast.error(`${error.code} ${JSON.stringify(error)}`)
  }

  return error
}

const axios = (
  baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}api/v1`,
  method = 'POST',
  credentials = false,
) => {
  const instance = _axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: credentials,
    baseURL,
    method,
    timeout: 10_000,
    responseType: 'json',
  })

  return instance
}

const axs = (apiName, payload, method) =>
  new Promise((resolve, reject) => {
    axios()({
      url: apiName,
      data: payload,
      method,
    })
      .then(data => {
        if (data.data?.code === NOT_SUCCESS_CODE) {
          toast.error(`Code: ${data.data?.code} / Msg: ${data.data?.msg}`)
          reject(data)
        } else {
          resolve(data.data)
        }
      })
      .catch(error => {
        reject(handleCatchError(error))
      })
  })

export default axios
export { axs }
