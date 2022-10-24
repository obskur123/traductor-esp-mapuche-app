<template>
  <q-page class="column q-pa-sm">
    <q-card class="col" flat bordered>
      <q-item target="_blank" clickable href="">
        <q-item-section>
          <q-item-label>Buscar traducciones</q-item-label>
          <q-item-label caption>Separar en espacios palabras simples.</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section style="flex: 1">
          <form @submit.prevent="sendTextGetTranslations">
            <q-input filled label="Frase o Palabras" type="text" class="q-mb-sm" v-model="wordsToTranslate"></q-input>
            <q-btn label="Traducir" type="submit" color="primary" class="full-width" :loading="isLoading" />
          </form>
        </q-card-section>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <template v-for="(trs, index) in translations" :key="index">
          <word-card :word="trs.word" :count="trs.traductions.length" :translations="trs.traductions"/>
        </template>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import WordCard from 'src/components/WordCard.vue'
import { api } from 'src/boot/axios'
export default {
  name: 'TranslatorPage',
  data () {
    return {
      wordsToTranslate: '',
      isLoading: false,
      translations: []
    }
  },
  methods: {
    async sendTextGetTranslations () {
      this.isLoading = true
      const response = await api.post('/translations/get-words', { words: this.wordsToTranslate.trim().toLowerCase() }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const { words } = response.data
      this.translations = words
      this.isLoading = false
    }
  },
  components: { WordCard }
}
</script>
