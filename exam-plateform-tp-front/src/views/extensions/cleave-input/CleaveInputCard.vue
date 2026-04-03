<script setup lang="ts">
import CleaveInput from '@/components/CleaveInput.vue'

const inputValue = ref()
const cardType = ref()

const onChangeF = (type: string) => {
  cardType.value = type
}
</script>

<template>
  <CleaveInput
    v-model="inputValue"
    label="Cards"
    placeholder="Enter Card Number"
    :options="{
      creditCard: true,
      onCreditCardTypeChanged: (type:string) => { onChangeF(type) },
    }"
  />

  <div
    v-show="cardType && cardType !== 'unknown'"
    class="mt-3"
  >
    Card type: {{ cardType }}
  </div>
</template>
