export const color = `<template>
  <div class="d-flex flex-wrap gap-4">
    <VAvatar color="primary">
      AA
    </VAvatar>
    <VAvatar color="secondary">
      BB
    </VAvatar>

    <VAvatar color="success">
      CC
    </VAvatar>

    <VAvatar color="warning">
      DD
    </VAvatar>

    <VAvatar color="info">
      EE
    </VAvatar>

    <VAvatar color="error">
      FF
    </VAvatar>

    <VAvatar color="pink-lighten-3">
      PI
    </VAvatar>
  </div>
</template>
`
export const group = `<script lang="ts" setup>
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import avatar5 from '@/assets/avatars/avatar-5.png'
import avatar6 from '@/assets/avatars/avatar-6.png'
import avatar7 from '@/assets/avatars/avatar-7.png'
</script>

<template>
  <div class="v-avatar-group">
    <VAvatar
      size="52"
      :image="avatar1"
    />
    <VAvatar
      size="52"
      :image="avatar2"
    />
    <VAvatar
      size="52"
      :image="avatar3"
    />
    <VAvatar
      size="52"
      :image="avatar4"
    />
    <VAvatar
      size="52"
      :image="avatar5"
    />
    <VAvatar
      size="52"
      :image="avatar6"
    />
    <VAvatar
      size="52"
      :image="avatar7"
    />
  </div>
</template>
`
export const icon = `<template>
  <div class="d-flex flex-wrap gap-4">
    <VAvatar
      color="primary"
      variant="tonal"
      icon="mdi-account-outline"
    />
    <VAvatar
      color="secondary"
      variant="tonal"
      icon="mdi-alert-outline"
    />

    <VAvatar
      color="success"
      variant="tonal"
      icon="mdi-cube-outline"
    />

    <VAvatar
      color="warning"
      variant="tonal"
      icon="mdi-weather-sunny"
    />

    <VAvatar
      color="info"
      variant="tonal"
      icon="mdi-cart-outline"
    />

    <VAvatar
      color="error"
      variant="tonal"
      icon="mdi-close-octagon-outline"
    />

    <VAvatar
      color="pink-lighten-3"
      variant="tonal"
      icon="mdi-shape-outline"
    />
  </div>
</template>
`

export const image = `<script lang="ts" setup>
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import avatar5 from '@/assets/avatars/avatar-5.png'
import avatar6 from '@/assets/avatars/avatar-6.png'
import avatar7 from '@/assets/avatars/avatar-7.png'
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VAvatar :image="avatar1" />
    <VAvatar :image="avatar2" />
    <VAvatar :image="avatar3" />
    <VAvatar :image="avatar4" />
    <VAvatar :image="avatar5" />
    <VAvatar :image="avatar6" />
    <VAvatar :image="avatar7" />
  </div>
</template>
`
export const size = `<script lang="ts" setup>
import avatar1 from '@/assets/avatars/avatar-1.png'
import avatar2 from '@/assets/avatars/avatar-2.png'
import avatar3 from '@/assets/avatars/avatar-3.png'
import avatar4 from '@/assets/avatars/avatar-4.png'
import avatar5 from '@/assets/avatars/avatar-5.png'
import avatar6 from '@/assets/avatars/avatar-6.png'
import avatar7 from '@/assets/avatars/avatar-7.png'
</script>

<template>
  <div class="d-flex align-center flex-wrap gap-4">
    <VAvatar
      size="x-small"
      :image="avatar1"
    />
    <VAvatar
      size="small"
      :image="avatar2"
    />
    <VAvatar :image="avatar3" />
    <VAvatar
      size="large"
      :image="avatar4"
    />
    <VAvatar
      size="x-large"
      :image="avatar5"
    />
    <VAvatar
      size="65"
      :image="avatar6"
    />
    <VAvatar
      size="75"
      :image="avatar7"
    />
  </div>
</template>
`
