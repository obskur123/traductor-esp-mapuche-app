<template>
  <q-card bordered class="q-mb-sm">
    <q-card-section>
      <q-expansion-item
        :label="word"
        :caption="`Traducciones ${count}`">
        <q-card>
          <q-card-section>
            <q-list bordered separator v-for="(trs, index) in translations" :key="index">
              <q-item>
                <q-item-section>
                  {{ trs }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'WordCard',
  props: ['word', 'translations', 'count']
}
</script>
