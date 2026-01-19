<script>
import FloatLabel from 'primevue/floatlabel'
import { setAuthUser } from '@/utils/authUser.js'
import apiServer from '@/services/apiServer.js'

export default {
  name: 'LoginView',
  components: { FloatLabel },
  data() {
    return {
      code: '',
      login: '',
      password: '',
      loading: false,
    }
  },
  methods: {
    async postLogin() {
      try {
        this.loading = true

        const responseInternalAPI = await apiServer.post(
          '/auth/login',
          {
            code: this.code,
            login: this.login,
            password: this.password,
          },
          {
            withCredentials: true,
          },
        )

        const data = responseInternalAPI.data.data

        localStorage.setItem('token', data?.access_token)
        const level = data?.access_level
        localStorage.setItem('access_level', level)

        const usuario = data.usuario
        usuario.level = level
        setAuthUser(usuario)

        this.successToast(responseInternalAPI.data.message)
        this.$router.push('/home')
      } catch (error) {
        if (error.response.status === 401) {
          await this.errorToast('Licença expirada ou inexistente.')
        }
      } finally {
        this.loading = false
      }
    },
    async successToast(message) {
      await toast.fire({ icon: 'success', title: message })
    },
    async errorToast(message) {
      await toast.fire({ icon: 'error', title: 'Houve um erro', text: message })
    },
  },
}
</script>

<template>
  <section
    class="section is-flex is-justify-content-center is-align-items-center"
    style="min-height: 100vh"
  >
    <main class="border box px-5 pt-5 pb-3" style="width: 380px; border: 1px solid #e2e8f0">
      <div class="has-text-centered">
        <p class="is-size-3 has-text-weight-semibold">Bem-vindo</p>
        <p class="subtitle is-size-7">Entre com suas credenciais para acessar sua conta.</p>
      </div>

      <div class="mb-4">
        <FloatLabel variant="on">
          <InputText
            id="login"
            type="text"
            v-model="login"
            autocomplete="off"
            fluid
            @keyup.enter="postLogin"
          />
          <label for="login">Login</label>
        </FloatLabel>
      </div>

      <div class="mb-4">
        <FloatLabel variant="on">
          <InputText
            id="password"
            type="password"
            v-model="password"
            autocomplete="off"
            @keyup.enter="postLogin"
            fluid
          />
          <label for="password">Senha</label>
        </FloatLabel>
      </div>

      <div class="is-flex is-justify-content-center mb-5">
        <Button @click="postLogin" label="Entrar" severity="contrast" fluid :loading />
      </div>
    </main>
  </section>
</template>

<style scoped></style>
