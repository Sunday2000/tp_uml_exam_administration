<script setup lang="ts">
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
