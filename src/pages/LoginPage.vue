<template>
  <q-page class="column q-pa-sm">
    <q-card class="col" flat bordered>
      <q-item>
        <q-item-section>
          <q-item-label>Iniciar sesión</q-item-label>
          <q-item-label caption>
            Solo para administradores.
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator/>
      <q-card-section horizontal>
        <q-card-section style="flex: 1">
          <form
            @submit.prevent="logInUser">
            <q-input
              filled
              label="Email"
              v-model="form.email"
              type="text"
              class="q-mb-sm"
            />
            <q-input
              filled
              label="Contraseña"
              v-model="form.password"
              type="password"
              class="q-mb-sm"
            />
            <q-btn label="Iniciar Sesion" type="submit" color="primary" class="full-width" />
          </form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { firebaseAuth } from 'boot/firebase'
import { mapStores } from 'pinia'
import { Notify } from 'quasar'
import { useUserStore } from 'stores/user-store'

export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    async logInUser () {
      try {
        const user = await firebaseAuth.signInWithEmailAndPassword(this.form.email, this.form.password)
        if (user) {
          this.userStore.$patch({ isLoggedIn: true })
          Notify.create({
            type: 'positive',
            message: 'Logeado correctamente!'
          })
          this.$router.push({ path: '/' })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>

</style>
