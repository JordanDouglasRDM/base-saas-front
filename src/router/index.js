import { createRouter, createWebHistory } from 'vue-router'
import { logoutHelper } from '@/utils/logoutHelper.js'
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const user = {}
  if (to.name === 'login' && user.id) {
    return next({ name: 'home' })
  }

  if (to.meta.requiresAuth && !user.id) {
    logoutHelper()
    return
  }

  next()
})

export default router
