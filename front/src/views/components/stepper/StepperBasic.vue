<script setup lang="ts">
import { VStepper } from 'vuetify/labs/VStepper'
</script>

<template>
  <VStepper :items="['Step 1', 'Step 2', 'Step 3']">
    <template #item.1>
      <VCard
        title="Step One"
        flat
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque praesentium tempora, ab temporibus repellat deserunt, qui vitae ex officiis commodi, incidunt dicta! Dolor perspiciatis quas, animi ipsam unde facere officiis?
      </VCard>
    </template>

    <template #item.2>
      <VCard
        title="Step Two"
        flat
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit a blanditiis consequatur cum facilis harum, necessitatibus ipsam eaque reprehenderit voluptatum adipisci sit incidunt iusto aperiam illum consectetur, repellat, repudiandae aut.
      </VCard>
    </template>

    <template #item.3>
      <VCard
        title="Step Three"
        flat
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, numquam tempora. Dolores praesentium repellat iste, voluptate eum ducimus hic illo eveniet commodi magnam officia quas nihil dolorum sapiente ab molestias.
      </VCard>
    </template>
  </VStepper>
</template>
