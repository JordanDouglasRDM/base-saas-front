import 'bulma/css/bulma.min.css'
import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
// import Lara from '@primeuix/themes/lara';
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import Tooltip from 'primevue/tooltip'
import localePtBR from '/lang/primevue/pt_BR.json'
import Swal from 'sweetalert2'
import { setApiErrorNotifier } from '@/services/apiServer.js'
import dayjs from '@/plugins/dayjs.js'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer
    toast.onmouseleave = Swal.resumeTimer
  },
  customClass: { container: 'toast-zindex' },
})

window.toast = Toast
// registra o notificador para o interceptor
setApiErrorNotifier(({ icon, title, html }) => {
  toast.fire({ icon, title, html })
})

const app = createApp(App)
app.config.globalProperties.$dayjs = dayjs

app.use(router)
app
  .use(PrimeVue, {
    locale: localePtBR,
    theme: {
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: 'white',
        cssLayer: false,
      },
    },
  })
  .directive('tooltip', Tooltip)
  .use(ToastService)
  .use(ConfirmationService)

app.mount('#app')
