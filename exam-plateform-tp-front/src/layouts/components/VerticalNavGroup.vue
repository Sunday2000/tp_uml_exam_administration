<script setup lang="ts">
import { useLocale } from 'vuetify'
import VerticalNavLink from './VerticalNavLink.vue'

interface Props {
  navItem: any
}

const prop = defineProps<Props>()
const { t } = useLocale()

const resolveNavLinkGroup = computed(() => {
  // eslint-disable-next-line import/no-self-import
  return (navItem: any) => (navItem.children ? import('./VerticalNavGroup.vue') : VerticalNavLink)
})
</script>

<template>
  <VListGroup
    v-if="prop.navItem"
    :value="prop.navItem.name"
  >
    <template #activator="{ props }">
      <VListItem
        v-bind="props"
        color="secondary"
        :prepend-icon="prop.navItem.icon"
        :title="t(prop.navItem.name)"
      />
    </template>

    <template
      v-for="item in prop.navItem.children"
      :key="item.name"
    >
      <Component
        :is="resolveNavLinkGroup(item)"
        :nav-item="item"
      />
    </template>
  </VListGroup>
</template>
