export const density = `<template>
  <VTextField
    label="Default"
    density="default"
    class="mb-4"
  />
  <VTextField
    label="Comfortable"
    density="comfortable"
    class="mb-4"
  />

  <VTextField
    label="Compact"
    density="compact"
  />
</template>
`
export const events = `<script setup lang="ts">
const icons = [
  'mdi-emoticon',
  'mdi-emoticon-cool',
  'mdi-emoticon-dead',
  'mdi-emoticon-excited',
  'mdi-emoticon-happy',
  'mdi-emoticon-neutral',
  'mdi-emoticon-sad',
  'mdi-emoticon-tongue',
]

const message = ref('Hey!')
const marker = ref(true)
const iconIndex = ref(0)

const icon = computed(() => {
  return icons[iconIndex.value]
})

function toggleMarker() {
  marker.value = !marker.value
}

function sendMessage() {
  resetIcon()
  clearMessage()
}
function clearMessage() {
  message.value = ''
}
function resetIcon() {
  iconIndex.value = 0
}
function changeIcon() {
  iconIndex.value === icons.length - 1
    ? iconIndex.value = 0
    : iconIndex.value++
}
</script>

<template>
  <VForm>
    <VTextField
      v-model="message"
      :append-icon="message ? 'mdi-send' : 'mdi-microphone'"
      :append-inner-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
      :prepend-icon="icon"
      variant="filled"
      clear-icon="mdi-close-circle"
      clearable
      label="Message"
      type="text"
      @click:append-inner="toggleMarker"
      @click:append="sendMessage"
      @click:prepend="changeIcon"
      @click:clear="clearMessage"
    />
  </VForm>
</template>
`
export const hint = `<template>
  <VRow>
    <VCol
      cols="12"
      sm="6"
    >
      <VTextField
        label="Your product or service"
        model-value="Grocery delivery"
        hint="For example, flowers or used cars"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextField
        label="Your landing page"
        hint="www.example.com/page"
        persistent-hint
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextField
        label="Your product or service"
        model-value="Grocery delivery"
        hint="For example, flowers or used cars"
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextField
        label="Your landing page"
        hint="www.example.com/page"
        persistent-hint
        variant="solo"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextField
        label="Your product or service"
        model-value="Grocery delivery"
        hint="For example, flowers or used cars"
      />
    </VCol>

    <VCol
      cols="12"
      sm="6"
    >
      <VTextField
        label="Your landing page"
        hint="www.example.com/page"
        persistent-hint
      />
    </VCol>
  </VRow>
</template>
`
export const icons = `<template>
  <VForm>
    <VRow>
      <VCol
        cols="12"
        sm="6"
      >
        <VTextField
          label="Prepend"
          prepend-icon="mdi-map-marker"
          class="mb-4"
        />

        <VTextField
          label="Prepend inner"
          prepend-inner-icon="mdi-map-marker"
          class="mb-4"
        />

        <VTextField
          label="Append"
          append-icon="mdi-map-marker"
          class="mb-4"
        />

        <VTextField
          label="Append inner"
          append-inner-icon="mdi-map-marker"
        />
      </VCol>

      <VCol
        cols="12"
        sm="6"
      >
        <VTextField
          label="Prepend"
          prepend-icon="mdi-map-marker"
          variant="solo"
          class="mb-4"
        />

        <VTextField
          label="Prepend inner"
          prepend-inner-icon="mdi-map-marker"
          variant="solo"
          class="mb-4"
        />

        <VTextField
          label="Append"
          append-icon="mdi-map-marker"
          variant="solo"
          class="mb-4"
        />

        <VTextField
          label="Append inner"
          append-inner-icon="mdi-map-marker"
          variant="solo"
        />
      </VCol>

      <VCol
        cols="12"
        sm="6"
      >
        <VTextField
          label="Prepend"
          prepend-icon="mdi-map-marker"
          variant="filled"
          class="mb-4"
        />

        <VTextField
          label="Prepend inner"
          prepend-inner-icon="mdi-map-marker"
          variant="filled"
          class="mb-4"
        />

        <VTextField
          label="Append"
          append-icon="mdi-map-marker"
          variant="filled"
          class="mb-4"
        />

        <VTextField
          label="Append inner"
          append-inner-icon="mdi-map-marker"
          variant="filled"
        />
      </VCol>

      <VCol
        cols="12"
        sm="6"
      >
        <VTextField
          variant="underlined"
          label="Prepend"
          prepend-icon="mdi-map-marker"
          class="mb-4"
        />

        <VTextField
          variant="underlined"
          label="Prepend inner"
          prepend-inner-icon="mdi-map-marker"
          class="mb-4"
        />

        <VTextField
          variant="underlined"
          label="Append"
          append-icon="mdi-map-marker"
          class="mb-4"
        />

        <VTextField
          variant="underlined"
          label="Append inner"
          append-inner-icon="mdi-map-marker"
        />
      </VCol>
    </VRow>
  </VForm>
</template>
`
export const labelSlot = `<template>
  <VForm>
    <VTextField>
      <template #label>
        <span>
          What about an <strong>icon</strong> here? <VIcon icon="mdi-file-find" />
        </span>
      </template>
    </VTextField>
  </VForm>
</template>
`
export const prefixSuffix = `<template>
  <VRow>
    <VCol cols="4">
      <VListSubheader>Prefix for dollar currency</VListSubheader>
    </VCol>

    <VCol cols="8">
      <VTextField
        label="Amount"
        model-value="10.00"
        prefix="$"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="4">
      <VListSubheader>Suffix for weight</VListSubheader>
    </VCol>

    <VCol cols="8">
      <VTextField
        label="Weight"
        model-value="28.00"
        suffix="lbs"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="4">
      <VListSubheader>Suffix for email domain</VListSubheader>
    </VCol>

    <VCol cols="8">
      <VTextField
        label="Email address"
        model-value="example"
        suffix="@gmail.com"
      />
    </VCol>
  </VRow>

  <VRow>
    <VCol cols="4">
      <VListSubheader>Suffix for time zone</VListSubheader>
    </VCol>

    <VCol cols="8">
      <VTextField
        label="Label Text"
        model-value="12:30:00"
        type="time"
        suffix="PST"
      />
    </VCol>
  </VRow>
</template>
`
export const validation = `<script setup lang="ts">
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
`
export const variant = `<script setup lang="ts">
type Variant = 'solo' | 'solo-inverted' | 'outlined' | 'solo-filled' | 'underlined' | 'filled' | 'plain' | undefined

const selectedVariant = ref<Variant>('outlined')
const variant = ['solo', 'solo-inverted', 'outlined', 'filled', 'underlined', 'solo-filled', 'plain']
const selected = ref()
</script>

<template>
  <VTabs
    v-model="selectedVariant"
    class="mb-8"
  >
    <VTab
      v-for="i in variant"
      :key="i"
      :value="i"
    >
      {{ i }}
    </VTab>
  </VTabs>

  <VTextField
    v-model="selected"
    label="Text field"
    :variant="selectedVariant"
  />
</template>
`
