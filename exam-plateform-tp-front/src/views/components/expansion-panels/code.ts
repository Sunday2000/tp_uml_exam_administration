export const basic = `<template>
  <VExpansionPanels>
    <VExpansionPanel
      title="Title"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
    />
  </VExpansionPanels>
</template>
`
export const disabled = `<script setup lang="ts">
const panel = ref([0, 1])
const disabled = ref(false)
</script>

<template>
  <div>
    <div class="d-flex">
      <VCheckbox
        v-model="disabled"
        label="Disabled"
      />
    </div>

    <VExpansionPanels
      v-model="panel"
      :disabled="disabled"
      multiple
    >
      <VExpansionPanel>
        <VExpansionPanelTitle>Panel 1</VExpansionPanelTitle>
        <VExpansionPanelText>
          Some content
        </VExpansionPanelText>
      </VExpansionPanel>

      <VExpansionPanel>
        <VExpansionPanelTitle>Panel 2</VExpansionPanelTitle>
        <VExpansionPanelText>
          Some content
        </VExpansionPanelText>
      </VExpansionPanel>

      <VExpansionPanel>
        <VExpansionPanelTitle>Panel 3</VExpansionPanelTitle>
        <VExpansionPanelText>
          Some content
        </VExpansionPanelText>
      </VExpansionPanel>
    </VExpansionPanels>
  </div>
</template>
`
export const variant = `<template>
  <div>
    <div class="text-subtitle-2 mb-2">
      Default
    </div>

    <VExpansionPanels>
      <VExpansionPanel
        v-for="i in 3"
        :key="i"
        title="Item"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </VExpansionPanels>

    <div class="text-subtitle-2 mt-4 mb-2">
      Accordion
    </div>

    <VExpansionPanels variant="accordion">
      <VExpansionPanel
        v-for="i in 3"
        :key="i"
        title="Item"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </VExpansionPanels>

    <div class="text-subtitle-2 mt-4 mb-2">
      Inset
    </div>

    <VExpansionPanels
      variant="inset"
      class="my-4"
    >
      <VExpansionPanel
        v-for="i in 3"
        :key="i"
        title="Item"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </VExpansionPanels>

    <div class="text-subtitle-2 mt-4 mb-2">
      Popout
    </div>

    <VExpansionPanels
      variant="popout"
      class="my-4"
    >
      <VExpansionPanel
        v-for="i in 3"
        :key="i"
        title="Item"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </VExpansionPanels>
  </div>
</template>
`

export const vmodel = `<script setup lang="ts">
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
`
