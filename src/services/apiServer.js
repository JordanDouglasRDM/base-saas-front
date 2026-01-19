import axios from 'axios'
import { getAuthUser } from '@/utils/authUser.js'
import { formatApiErrors } from '@/utils/formatApiErrors'
import { logoutHelper } from '@/utils/logoutHelper.js'

let _notify = null
export function setApiErrorNotifier(fn) {
  _notify = typeof fn === 'function' ? fn : null
}

const apiServer = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_LARAVEL_SERVER,
  timeout: 15000,
})

// Intercepta todas as requisições
apiServer.interceptors.request.use((config) => {
  const authUser = getAuthUser()
  const accessToken = localStorage.getItem('access_token');
  if (authUser?.id) {
    config.headers['x-auth-id'] = authUser.id
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

let isRefreshing = false
let failedQueue = []

function processQueue(error, token = null) {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })

  failedQueue = []
}

apiServer.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config
    const status = error?.response?.status
    const isRefreshCall = originalRequest?.url?.includes('/auth/refresh-token')

    // --- 1. Se o refresh token falhou ---
    if (status === 401 && isRefreshCall) {
      // refresh token já expirou → logout obrigatório
      logoutHelper()
      return Promise.reject(error)
    }

    // --- 2. Se não é 401, não tenta refresh ---
    if (status !== 401) {
      return Promise.reject(error)
    }

    // --- 3. Se já tentamos usar refresh nesta requisição ---
    if (originalRequest._retry) {
      logoutHelper()
      return Promise.reject(error)
    }

    // Marca que já tentamos refresh
    originalRequest._retry = true

    // --- 4. Se já existe refresh em andamento ---
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((newToken) => {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`
        return apiServer(originalRequest)
      })
    }

    // --- 5. Começar refresh ---
    isRefreshing = true

    try {
      const refreshResponse = await apiServer.post(
        '/auth/refresh-token',
        null,
        { withCredentials: true }
      )

      const newToken = refreshResponse.data?.data?.access_token
      localStorage.setItem('access_token', newToken)

      processQueue(null, newToken)

      originalRequest.headers['Authorization'] = `Bearer ${newToken}`
      return apiServer(originalRequest)

    } catch (refreshError) {
      processQueue(refreshError, null)
      logoutHelper(true)
      return Promise.reject(refreshError)

    } finally {
      isRefreshing = false
    }
  }
)


// Intercepta todas as respostas
apiServer.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status

    // 422 → erro de validação
    if (status === 422) {
      const payload = error?.response?.data ?? error
      const html = formatApiErrors(payload)
      _notify?.({
        icon: 'error',
        title: 'Houve uma falha ao enviar os dados.',
        html,
      })
      return Promise.reject(error)
    }

    // Timeout ou rede
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      _notify?.({
        icon: 'error',
        title: 'Tempo esgotado',
        html: 'A solicitação excedeu o tempo limite.',
      })
    } else if (!error.response) {
      _notify?.({
        icon: 'error',
        title: 'Sem conexão',
        html: 'Não foi possível conectar ao servidor.',
      })
    } else {
      // Outros erros (500, 403, etc.)
      const payload = error.response.data ?? error
      const html = formatApiErrors(payload)
      _notify?.({ icon: 'error', title: 'Erro', html })
    }

    return Promise.reject(error)
  },
)

export default apiServer
