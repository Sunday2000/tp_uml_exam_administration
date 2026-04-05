export const color = `<template>
  <div class="d-flex flex-column gap-4">
    <VAlert color="primary">
      I'm a success alert.
    </VAlert>

    <VAlert color="secondary">
      I'm an info alert.
    </VAlert>

    <VAlert color="success">
      I'm a warning alert.
    </VAlert>

    <VAlert color="warning">
      I'm an error alert.
    </VAlert>

    <VAlert color="info">
      I'm an error alert.
    </VAlert>

    <VAlert color="error">
      I'm an error alert.
    </VAlert>
  </div>
</template>
`
export const colorBorder = `<template>
  <div class="d-flex flex-column gap-4">
    <VAlert
      border="start"
      border-color="deep-purple accent-4"
      elevation="2"
    >
      Aliquam eu nunc. Fusce commodo aliquam arcu. In consectetuer turpis ut velit. Nulla facilisi..

      Morbi mollis tellus ac sapien. Fusce vel dui. Praesent ut ligula non mi varius sagittis. Vivamus consectetuer
      hendrerit lacus. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
    </VAlert>

    <VAlert
      border="top"
      border-color="success"
      elevation="2"
    >
      Vestibulum ullamcorper mauris at ligula. Nam pretium turpis et arcu. Ut varius tincidunt libero. Curabitur ligula
      sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Morbi nec metus.
    </VAlert>

    <VAlert
      border="bottom"
      border-color="warning"
      elevation="2"
    >
      Sed in libero ut nibh placerat accumsan. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.
      Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Sed consequat, leo eget bibendum sodales, augue
      velit cursus nunc, quis gravida magna mi a libero. Donec elit libero, sodales nec, volutpat a, suscipit non,
      turpis.
    </VAlert>

    <VAlert
      border="end"
      border-color="error"
      elevation="2"
    >
      Fusce commodo aliquam arcu. Pellentesque posuere. Phasellus tempus. Donec posuere vulputate arcu.
    </VAlert>
  </div>
</template>
`
export const icon = `<template>
  <div class="d-flex flex-column gap-4">
    <VAlert
      color="primary"
      icon="mdi-firework"
      density="compact"
    >
      Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Vivamus quis mi. Quisque ut nisi. Maecenas
      malesuada.
    </VAlert>

    <VAlert
      color="success"
      icon="mdi-material-design"
      border
    >
      Phasellus blandit leo ut odio. Morbi mattis ullamcorper velit. Donec orci lectus, aliquam ut, faucibus non,
      euismod id, nulla. In ut quam vitae odio lacinia tincidunt.
    </VAlert>

    <VAlert
      color="info"
      icon="mdi-vuetify"
      prominent
    >
      Praesent congue erat at massa. Nullam vel sem. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
      Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros.
      Curabitur at lacus ac velit ornare lobortis.
    </VAlert>
  </div>
</template>
`
export const outlined = `<template>
  <div class="d-flex flex-column gap-4">
    <VAlert
      color="purple"
      variant="outlined"
    >
      <template #title>
        Outlined Alert
      </template>

      Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.
      Duis vel nibh at velit scelerisque suscipit. Praesent blandit laoreet nibh. Aenean posuere, tortor sed cursus
      feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Etiam sollicitudin, ipsum eu pulvinar
      rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros.
    </VAlert>

    <VAlert
      type="success"
      variant="outlined"
    >
      Praesent venenatis metus at tortor pulvinar varius. Aenean commodo ligula eget dolor. Praesent ac massa at ligula
      laoreet iaculis. Vestibulum ullamcorper mauris at ligula.
    </VAlert>

    <VAlert
      variant="outlined"
      type="warning"
      prominent
      border="top"
    >
      Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Suspendisse non nisl sit amet velit
      hendrerit rutrum. Nullam vel sem. Pellentesque dapibus hendrerit tortor.
    </VAlert>
  </div>
</template>
`
export const types = `<template>
  <div class="d-flex flex-column gap-4">
    <VAlert type="success">
      I'm a success alert.
    </VAlert>

    <VAlert type="info">
      I'm an info alert.
    </VAlert>

    <VAlert type="warning">
      I'm a warning alert.
    </VAlert>

    <VAlert type="error">
      I'm an error alert.
    </VAlert>
  </div>
</template>
`

export const variant = `<template>
  <div class="d-flex flex-column gap-4">
    <VAlert
      color="yellow-darken-4"
      icon="mdi-flash"
      title="Flat (Default)"
      variant="flat"
    >
      Nullam tincidunt adipiscing enim. In consectetuer turpis ut velit. Maecenas egestas arcu quis ligula mattis
      placerat. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus.
    </VAlert>

    <VAlert
      color="info"
      title="Tonal"
      variant="tonal"
    >
      <div>
        Maecenas nec odio et ante tincidunt tempus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero,
        non adipiscing dolor urna a orci. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien,
        a accumsan nisi mauris ac eros. Curabitur turpis.
      </div>

      <VDivider class="my-4 bg-light-blue-lighten-4" />

      <div class="d-flex flex-row align-center justify-space-between">
        <div>
          Proin magna. Vivamus in erat ut urna cursus vestibulum. Etiam imperdiet imperdiet orci.
        </div>

        <VBtn
          color="info"
          variant="outlined"
        >
          Okay
        </VBtn>
      </div>
    </VAlert>

    <VAlert
      color="deep-orange"
      icon="mdi-fire"
      title="Outlined"
      variant="outlined"
    >
      Nullam tincidunt adipiscing enim. In consectetuer turpis ut velit. Maecenas egestas arcu quis ligula mattis
      placerat. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus.
    </VAlert>

    <VAlert
      border="start"
      color="teal-darken-4"
      density="compact"
      icon="mdi-clock-fast"
      title="Elevated"
      variant="elevated"
    >
      Vestibulum ullamcorper mauris at ligula. Nulla porta dolor. Vestibulum facilisis, purus nec pulvinar iaculis,
      ligula mi congue nunc, vitae euismod ligula urna in dolor. Curabitur at lacus ac velit ornare lobortis.
    </VAlert>

    <VAlert
      icon="mdi-cloud-alert"
      prominent
      title="Text"
      type="error"
      variant="text"
    >
      Praesent blandit laoreet nibh. Praesent nonummy mi in odio. Phasellus tempus. Mauris turpis nunc, blandit et,
      volutpat molestie, porta ut, ligula. Duis leo.
    </VAlert>

    <VAlert
      color="orange"
      density="compact"
      icon="mdi-note"
      prominent
      title="Plain"
      variant="plain"
    >
      Vestibulum ullamcorper mauris at ligula. Nulla porta dolor. Vestibulum facilisis, purus nec pulvinar iaculis,
      ligula mi congue nunc, vitae euismod ligula urna in dolor. Curabitur at lacus ac velit ornare lobortis.
    </VAlert>
  </div>
</template>
`
