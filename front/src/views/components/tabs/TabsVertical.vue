<script setup lang="ts">
const tab = ref('option-1')
</script>

<template>
  <div class="d-flex flex-row">
    <VTabs
      v-model="tab"
      direction="vertical"
      color="primary"
    >
      <VTab value="option-1">
        <VIcon
          icon="mdi-account-outline"
          start
        />
        Option 1
      </VTab>
      <VTab value="option-2">
        <VIcon
          icon="mdi-lock-outline"
          start
        />
        Option 2
      </VTab>
      <VTab value="option-3">
        <VIcon
          icon="mdi-access-point"
          start
        />
        Option 3
      </VTab>
    </VTabs>

    <VWindow v-model="tab">
      <VWindowItem value="option-1">
        <VCardText>
          <p>
            Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
          </p>

          <p>
            Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.
          </p>

          <p class="mb-0">
            Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
          </p>
        </VCardText>
      </VWindowItem>

      <VWindowItem value="option-2">
        <VCardText>
          <p>
            Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
          </p>

          <p class="mb-0">
            Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
          </p>
        </VCardText>
      </VWindowItem>

      <VWindowItem value="option-3">
        <VCardText>
          <p>
            Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
          </p>

          <p class="mb-0">
            Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
          </p>
        </VCardText>
      </VWindowItem>
    </VWindow>
  </div>
</template>
