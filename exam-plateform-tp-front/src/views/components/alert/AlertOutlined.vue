<template>
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
