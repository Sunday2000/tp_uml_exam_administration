<script setup lang="ts">
const panel = ref<string[]>([])

const all = () => {
  panel.value = ['foo', 'bar', 'baz']
}

const none = () => {
  panel.value = []
}
</script>

<template>
  <div>
    <div class="d-flex gap-4 pb-4">
      <VBtn
        color="primary"
        @click="all"
      >
        All
      </VBtn>
      <VBtn
        color="error"
        @click="none"
      >
        None
      </VBtn>
    </div>

    <div class="pb-4">
      v-model {{ panel }}
    </div>

    <VExpansionPanels
      v-model="panel"
      multiple
    >
      <VExpansionPanel
        title="Foo"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        value="foo"
      />

      <VExpansionPanel
        title="Bar"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        value="bar"
      />

      <VExpansionPanel
        title="Baz"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        value="baz"
      />
    </VExpansionPanels>
  </div>
</template>
