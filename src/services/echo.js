import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

let echoInstance = null

export async function initEcho() {
  if (echoInstance) return echoInstance

  window.Pusher = Pusher

  echoInstance = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    namespace: null,
  })

  return echoInstance
}

export function getEcho() {
  return echoInstance
}

export function destroyEcho() {
  if (!echoInstance) return

  echoInstance.disconnect()
  echoInstance = null
}
