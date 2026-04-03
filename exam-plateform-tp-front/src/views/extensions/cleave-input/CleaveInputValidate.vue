<script setup lang="ts">
import CleaveInput from '@/components/CleaveInput.vue'
import 'cleave.js/dist/addons/cleave-phone.gt'

const inputValue = ref()
const error = ref(false)

const validateInput = () => {
  if (!inputValue.value)
    error.value = true

  else
    error.value = false
}

const reset = async () => {
  inputValue.value = ''
  await nextTick()
  error.value = false
}

watch(inputValue, () => {
  if (!inputValue.value)
    error.value = true

  else
    error.value = false
})
</script>

<template>
  <VForm
    class="d-flex align-start flex-wrap gap-4 w-100"
    @submit.prevent="validateInput"
  >
    <CleaveInput
      v-model="inputValue"
      label="Phone"
      :error="error"
      error-messages="This field is required"
      placeholder="Enter Phone Number"
      :options="{
        phone: true,
        phoneRegionCode: 'GT',
      }"
      class="flex-grow-1"
    />

    <div>
      <VBtn
        color="primary"
        size="large"
        type="submit"
        class="me-3"
      >
        Submit
      </VBtn>

      <VBtn
        color="secondary"
        variant="tonal"
        size="large"
        @click="reset"
      >
        Reset
      </VBtn>
    </div>
  </VForm>
</template>
