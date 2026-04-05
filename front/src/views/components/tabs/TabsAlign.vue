<script setup lang="ts">
type AlignTab = 'start' | 'center' | 'end' | 'title'
const tab = ref(null)
const alignTab = ref<AlignTab>('center')
</script>

<template>
  <VCardText>
    <VSelect
      v-model="alignTab"
      :items="['start', 'center', 'end', 'title']"
      style="max-width: 10rem;"
      class="mb-6"
    />

    <VTabs
      v-model="tab"
      :align-tabs="alignTab"
      class="mb-6"
    >
      <VTab :value="1">
        Landscape
      </VTab>
      <VTab :value="2">
        City
      </VTab>
      <VTab :value="3">
        Abstract
      </VTab>
    </VTabs>

    <VWindow v-model="tab">
      <VWindowItem
        v-for="n in 3"
        :key="n"
        :value="n"
      >
        <VRow>
          <VCol
            v-for="i in 3"
            :key="i"
            cols="12"
            md="4"
          >
            <VImg
              :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
              :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
            />
          </VCol>
        </VRow>
      </VWindowItem>
    </VWindow>
  </VCardText>
</template>
