import axios from 'axios'
import { parseCookies } from 'nookies'

export default function getAPIClient() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  })

  api.interceptors.request.use(async (config) => {
    const { token } = parseCookies()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  return api
}
