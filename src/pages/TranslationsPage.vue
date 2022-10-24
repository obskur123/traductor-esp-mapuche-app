<template>
  <q-page class="column q-pa-sm">
    <template v-for="(translation, index) in translations" :key="index">
      <translation-card v-if="!translation.accepted"
                        :translation="translation.traduction"
                        :id="translation._id"
                        :word="translation.word"
                        :accept-translation="acceptTranslation"
                        :reject-translation="rejectTranslation"/>
    </template>
  </q-page>
</template>

<script>
import { firebaseAuth } from 'boot/firebase'
import TranslationCard from 'components/TranslationCard.vue'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

export default {
  name: 'TranslationsPage',
  components: { TranslationCard },
  props: ['word', 'translation'],
  data () {
    return {
      translations: []
    }
  },
  async mounted () {
    await this.getAllTranslations()
  },
  methods: {
    async getAllTranslations () {
      const token = await firebaseAuth.currentUser.getIdToken()
      const response = await api.get('/translations/get-all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const translationArray = response.data
      this.translations = translationArray.traductions
    },
    async acceptTranslation (translationInfo) {
      const token = await firebaseAuth.currentUser.getIdToken()
      const response = await api.post('/translations/accept', translationInfo, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        Notify.create({
          type: 'positive',
          message: 'Traducción aceptada!'
        })
        await this.getAllTranslations()
      } else {
        Notify.create({
          type: 'negative',
          message: 'Error al agregar traducción!'
        })
      }
    },
    async rejectTranslation (translationId) {
      const token = await firebaseAuth.currentUser.getIdToken()
      const response = await api.delete(`/translations/reject?translationId=${translationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        Notify.create({
          type: 'positive',
          message: 'Traduccion rechazada!'
        })
        await this.getAllTranslations()
      } else {
        Notify.create({
          type: 'negative',
          message: 'Error al rechazar traduccion!'
        })
      }
    }
  }
}

</script>
