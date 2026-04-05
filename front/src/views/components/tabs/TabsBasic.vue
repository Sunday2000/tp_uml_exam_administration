<script setup lang="ts">
const tab = ref('one')
</script>

<template>
  <VTabs v-model="tab">
    <VTab value="one">
      Item One
    </VTab>
    <VTab value="two">
      Item Two
    </VTab>
    <VTab value="three">
      Item Three
    </VTab>
  </VTabs>

  <VCardText>
    <VWindow v-model="tab">
      <VWindowItem value="one">
        Macaroon lemon drops pastry jelly beans pastry cake gingerbread. Tart cheesecake pastry cookie chupa chups marzipan caramels shortbread chocolate bar.
      </VWindowItem>

      <VWindowItem value="two">
        Gingerbread candy pastry caramels gingerbread. Donut sesame snaps sweet candy canes donut.
      </VWindowItem>

      <VWindowItem value="three">
        Toffee icing tiramisu croissant jelly biscuit jelly beans lollipop. Tootsie roll cake cake candy cookie pastry.
      </VWindowItem>
    </VWindow>
  </VCardText>
</template>
