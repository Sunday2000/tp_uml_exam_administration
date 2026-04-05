<script setup lang="ts">
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
