export const basic = `<script setup lang="ts">
const tab = ref('one')
</script>

<template>
  <VTabs v-model="tab">
    <VTab value="one">
      Item One
    </VTab>
    <VTab value="two">
      Item Two
    </VTab>
    <VTab value="three">
      Item Three
    </VTab>
  </VTabs>

  <VCardText>
    <VWindow v-model="tab">
      <VWindowItem value="one">
        Macaroon lemon drops pastry jelly beans pastry cake gingerbread. Tart cheesecake pastry cookie chupa chups marzipan caramels shortbread chocolate bar.
      </VWindowItem>

      <VWindowItem value="two">
        Gingerbread candy pastry caramels gingerbread. Donut sesame snaps sweet candy canes donut.
      </VWindowItem>

      <VWindowItem value="three">
        Toffee icing tiramisu croissant jelly biscuit jelly beans lollipop. Tootsie roll cake cake candy cookie pastry.
      </VWindowItem>
    </VWindow>
  </VCardText>
</template>
`
export const align = `<script setup lang="ts">
type AlignTab = 'start' | 'center' | 'end' | 'title'
const tab = ref(null)
const alignTab = ref<AlignTab>('center')
</script>

<template>
  <VCardText>
    <VSelect
      v-model="alignTab"
      :items="['start', 'center', 'end', 'title']"
      style="max-width: 10rem;"
      class="mb-6"
    />

    <VTabs
      v-model="tab"
      :align-tabs="alignTab"
      class="mb-6"
    >
      <VTab :value="1">
        Landscape
      </VTab>
      <VTab :value="2">
        City
      </VTab>
      <VTab :value="3">
        Abstract
      </VTab>
    </VTabs>

    <VWindow v-model="tab">
      <VWindowItem
        v-for="n in 3"
        :key="n"
        :value="n"
      >
        <VRow>
          <VCol
            v-for="i in 3"
            :key="i"
            cols="12"
            md="4"
          >
            <VImg
              :src="\`https://picsum.photos/500/300?image=\${i * n * 5 + 10}\`"
              :lazy-src="\`https://picsum.photos/10/6?image=\${i * n * 5 + 10}\`"
            />
          </VCol>
        </VRow>
      </VWindowItem>
    </VWindow>
  </VCardText>
</template>
`
export const centerActive = `<template>
  <VTabs center-active>
    <VTab>One</VTab>
    <VTab>Two</VTab>
    <VTab>Three</VTab>
    <VTab>Four</VTab>
    <VTab>Five</VTab>
    <VTab>Six</VTab>
    <VTab>Seven</VTab>
    <VTab>Eight</VTab>
    <VTab>Nine</VTab>
    <VTab>Ten</VTab>
    <VTab>Eleven</VTab>
    <VTab>Twelve</VTab>
    <VTab>Thirteen</VTab>
    <VTab>Fourteen</VTab>
    <VTab>Fifteen</VTab>
    <VTab>Sixteen</VTab>
    <VTab>Seventeen</VTab>
    <VTab>Eighteen</VTab>
    <VTab>Nineteen</VTab>
    <VTab>Twenty</VTab>
  </VTabs>
</template>
`
export const customIcon = `<template>
  <VTabs
    next-icon="mdi-arrow-right-bold-box-outline"
    prev-icon="mdi-arrow-left-bold-box-outline"
    show-arrows
  >
    <VTab
      v-for="i in 30"
      :key="i"
    >
      Item {{ i }}
    </VTab>
  </VTabs>
</template>
`
export const fixed = `<template>
  <VTabs fixed-tabs>
    <VTab>
      Option
    </VTab>
    <VTab>
      Another Option
    </VTab>
  </VTabs>
</template>
`
export const grow = `<script setup lang="ts">
const tab = ref('Appetizers')

const items = [
  'Appetizers',
  'Entrees',
  'Deserts',
  'Cocktails',
]

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
</script>

<template>
  <VTabs
    v-model="tab"
    grow
  >
    <VTab
      v-for="item in items"
      :key="item"
      :value="item"
    >
      {{ item }}
    </VTab>
  </VTabs>

  <VWindow v-model="tab">
    <VWindowItem
      v-for="item in items"
      :key="item"
      :value="item"
    >
      <VCardText>{{ text }}</VCardText>
    </VWindowItem>
  </VWindow>
</template>
`
export const stacked = `<script setup lang="ts">
const tab = ref(null)

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
</script>

<template>
  <VTabs
    v-model="tab"
    align-tabs="center"
    stacked
  >
    <VTab value="tab-1">
      <VIcon icon="mdi-phone-outline" />
      <span>Recent</span>
    </VTab>

    <VTab value="tab-2">
      <VIcon icon="mdi-heart-outline" />
      <span>Favorites</span>
    </VTab>

    <VTab value="tab-3">
      <VIcon icon="mdi-account-box-outline" />
      <span>Nearby</span>
    </VTab>
  </VTabs>

  <VCardText>
    <VWindow v-model="tab">
      <VWindowItem
        v-for="i in 3"
        :key="i"
        :value="\`tab-\${i}\`"
      >
        {{ text }}
      </VWindowItem>
    </VWindow>
  </VCardText>
</template>
`
export const vertical = `<script setup lang="ts">
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
`
