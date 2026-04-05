<script setup lang="ts">
import { useLocale } from 'vuetify'
import type { VerticalNavItems } from './types.d'
import { isNavLinkActive } from './utils'

interface Props {
  navItem: {
    name: string
    icon: string
    to?: string
    href?: string
    target?: string
    children?: VerticalNavItems[]
  }
}
interface Emit {
  (e: 'closeGroup'): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const { t } = useLocale()
</script>

<template>
  <template v-if="props.navItem">
    <VListItem
      v-if="props.navItem.to"
      :prepend-icon="props.navItem.icon"
      :title="t(props.navItem.name)"
      :to="props.navItem.to"
      :active="isNavLinkActive(props.navItem)"
      :target="props.navItem.target ? props.navItem.target : ''"
      @click="emit('closeGroup')"
    />

    <VListItem
      v-else
      :prepend-icon="props.navItem.icon"
      :title="t(props.navItem.name)"
      :href="props.navItem.href"
      :active="isNavLinkActive(props.navItem)"
      :target="props.navItem.target ? props.navItem.target : ''"
    />
  </template>
</template>
