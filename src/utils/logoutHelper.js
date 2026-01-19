import router from '@/router/index.js'
import { destroyEcho } from '@/services/echo.js'

export function logoutHelper( withRedirect = true) {
  destroyEcho()

  localStorage.clear()

  if (withRedirect)
  router.push('/login')
}
