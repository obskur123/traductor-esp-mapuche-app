<template>
  <q-page class="column q-pa-sm">
    <q-card class="col" flat bordered>
      <q-item target="_blank" clickable href="">
        <q-item-section>
          <q-item-label>Agregar nueva traducción</q-item-label>
          <q-item-label caption>Las traducciones se revisan antes de ser aceptadas.</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section style="flex: 1">
          <form ref="translationForm" @submit.prevent="sendTranslation">
            <q-input filled label="Palabra" v-model="form.word" type="text" class="q-mb-sm"></q-input>
            <q-input filled label="Traducción" type="text" class="q-mb-sm" v-model="form.translation"></q-input>
            <q-btn label="Enviar" type="submit" color="primary" :disable="!(form.word !== '')" class="full-width" />
          </form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { Notify } from 'quasar'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      form: {
        word: '',
        translation: ''
      }
    }
  },
  methods: {
    async sendTranslation () {
      const response = await api.post('/translations/new', this.form)
      if (response.status === 200) {
        Notify.create({
          type: 'positive',
          message: 'Traducción agregada!'
        })
        this.$refs.translationForm.reset()
      } else {
        Notify.create({
          type: 'negative',
          message: 'Error al agregar traducción'
        })
      }
    }
  }
})
</script>
