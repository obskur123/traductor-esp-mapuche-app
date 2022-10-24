<template>
  <q-card
    bordered
    class="q-mb-sm"
  >
    <q-card-section>
      <div class="text-h6">Palabra: {{ word }}</div>
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      Traducción: {{ translation }}, es correcta?
    </q-card-section>
    <q-separator inset />
    <q-card-section>
      <q-card-actions>
        <q-btn label="Aceptar" color="primary" @click="acceptTranslation({ word, translationId: id})"/>
        <q-btn label="Rechazar" color="negative" @click="rejectTranslation(id)"/>
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'TranslationCard',
  props: ['translation', 'word', 'id', 'acceptTranslation', 'rejectTranslation']
}
</script>
