import env from '@/lib/env'
import axios from 'axios'
import { getSession } from 'next-auth/react'


const api = axios.create({
    baseURL: `${env.NEXT_PUBLIC_API_URL}/api/v1.0.1`

})

api.interceptors.request.use(
  async config => {
    try {
      const session = await getSession()

      if (session?.user.accessToken) {
        config.headers['x-access-token'] = session.user.accessToken
      }

      return config
    } catch (error) {
      console.error('Error fetching session:', error)
      return Promise.reject(error)
    }
  },
  error => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

export default api
