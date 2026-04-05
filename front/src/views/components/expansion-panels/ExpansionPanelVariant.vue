<template>
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
