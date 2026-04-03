export const alternate = `<script setup lang="ts">
import { VStepper, VStepperHeader, VStepperItem } from 'vuetify/labs/VStepper'
</script>

<template>
  <VStepper alt-labels>
    <VStepperHeader>
      <VStepperItem
        value="1"
        title="Ad unit details"
      />

      <VDivider />

      <VStepperItem
        value="2"
        title="Ad sizes"
      />

      <VDivider />

      <VStepperItem
        value="3"
        title="Ad templates"
      />
    </VStepperHeader>
  </VStepper>
</template>
`
export const basic = `<script setup lang="ts">
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
`
export const editable = `<script setup lang="ts">
import { VStepper, VStepperHeader, VStepperItem } from 'vuetify/labs/VStepper'
</script>

<template>
  <VStepper>
    <VStepperHeader>
      <VStepperItem
        complete
        editable
        title="Select campaign settings"
        value="1"
      />

      <VDivider />

      <VStepperItem
        complete
        title="Create an ad group"
        value="2"
      />

      <VDivider />

      <VStepperItem
        editable
        title="Create an ad"
        value="3"
      />
    </VStepperHeader>
  </VStepper>
</template>
`
export const error = `<script setup lang="ts">
import { VStepper, VStepperHeader, VStepperItem } from 'vuetify/labs/VStepper'
</script>

<template>
  <VStepper model-value="3">
    <VStepperHeader>
      <VStepperItem
        complete
        title="Job Search"
        value="1"
      />

      <VDivider />

      <VStepperItem
        :rules="[() => false]"
        title="Application Submission"
        subtitle="Missing Details"
        value="2"
      />

      <VDivider />

      <VStepperItem
        title="Interview Process"
        value="3"
      />

      <VDivider />

      <VStepperItem
        title="Hiring Decision"
        value="4"
      />
    </VStepperHeader>
  </VStepper>
</template>
`
