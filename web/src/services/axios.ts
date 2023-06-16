import axios from 'axios'
import { getSession } from 'next-auth/react'

export default function getAPIClient() {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  })

  api.interceptors.request.use(async (config) => {
    const session = await getSession()

    if (session?.user.token) {
      config.headers.Authorization = `Bearer ${session?.user.token}`
    }

    return config
  })

  return api
}
