<script setup lang="ts">
const title = ref('Preliminary report')
const email = ref('')

const rules = {
  required: (value: any) => !!value || 'Required.',
  counter: (value: string | any[]) => value.length <= 20 || 'Max 20 characters',
  email: (value: string) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return pattern.test(value) || 'Invalid e-mail.'
  },
}
</script>

<template>
  <VForm>
    <VRow>
      <VCol
        cols="12"
        sm="6"
      >
        <VTextField
          v-model="title"
          :rules="[rules.required, rules.counter]"
          label="Title"
          counter
          maxlength="20"
        />
      </VCol>

      <VCol
        cols="12"
        sm="6"
      >
        <VTextField
          v-model="email"
          :rules="[rules.required, rules.email]"
          label="E-mail"
        />
      </VCol>
    </VRow>
  </VForm>
</template>
