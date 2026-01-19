<script>
import FadeTransition from '@/components/FadeTransition.vue'
import { getAuthUser } from '@/utils/authUser.js'

export default {
  name: 'HomeView',
  components: { FadeTransition },
  data() {
    return {
      userAuth: getAuthUser(),
    }
  },
}
</script>

<template>
  <div class="is-flex is-flex-direction-column" style="min-height: 100vh">
<!--    <AppNavbar :userName="userAuth.login" />-->

    <div class="is-flex" style="flex: 1; overflow: hidden">
<!--      <AppSidebar />-->

      <main class="p-4" style="flex: 1; overflow: auto">
        <!-- Transição suave usando PrimeVue -->
        <FadeTransition>
          <div class="box p-2" style="height: 100%">
            <RouterView />
          </div>
        </FadeTransition>
      </main>
    </div>
  </div>
</template>

<style scoped></style>
