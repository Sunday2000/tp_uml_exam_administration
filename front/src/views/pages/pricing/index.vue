<script setup lang="ts">
const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Pages',
    disabled: false,
  },
  {
    title: 'Pricing',
    disabled: true,
  },
]

const togglePrice = ref(0)
const selectedPlan = ref('Free')

const pricingPlans = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualPrice: 0,
    tagLine: 'Easy and quick start',
    features: [
      'SEO-optimized documentation',
      'Beautiful styling out of the box',
      'Custom domains',
      'Auto-generated API docs',
      'Built-in components library',
      'Third-party analytics integrations',
      'In-app search and user logs',
    ],
  },
  {
    name: 'Startup',
    monthlyPrice: 12,
    annualPrice: 140,
    tagLine: 'Built for growing companies',
    features: [
      'The Free plan plus',
      'Unlimited editors',
      'Analytics and conversion insights',
      'ChatGPT for docs',
      'Custom subpaths /docs',
      'White-glove migrations',
      'Prioritized customer support',
    ],
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    tagLine: 'Fully tailored for your business',
    features: [
      'The Startup plan plus',
      'Authentication and gated content',
      'Multiple documentation instances',
      'Custom integrations',
      'No branding',
      'Translation management',
      'Slack Connect customer support',
    ],
  },
]
</script>

<template>
  <VRow>
    <!-- Breadcrumbs -->
    <VCol
      cols="12"
      class="d-flex align-center justify-space-between flex-wrap"
    >
      <VBreadcrumbs
        divider="-"
        :items="breadcrumbs"
        class="pa-0 "
      />
    </VCol>
    <!-- Breadcrumbs -->

    <VCol cols="12">
      <VCard class="pt-10">
        <VCardItem>
          <h3 class="text-h3 text-center mb-2">
            Choose your Pricing plan
          </h3>
          <p class="text-lg text-center">
            Tiramisu sugar plum danish chocolate pie cake bonbon cake candy.
          </p>
        </VCardItem>

        <VCardText>
          <VRow>
            <VCol cols="12">
              <VBtnToggle
                v-model="togglePrice"
                mandatory
                color="info"
                variant="outlined"
                class="mb-3"
              >
                <VBtn>
                  Annually
                </VBtn>
                <VBtn>
                  Monthly
                </VBtn>
              </VBtnToggle>
            </VCol>
            <VCol
              v-for="plan in pricingPlans"
              :key="plan.name"
              cols="12"
              md="4"
            >
              <VCard
                max-width="400"
                :ripple="false"
                class="mx-auto"
                :variant="selectedPlan === plan.name ? 'tonal' : 'outlined'"
                @click="selectedPlan = plan.name"
              >
                <VCardText>
                  <span>{{ plan.name }}</span>

                  <div
                    v-if="plan.monthlyPrice === 'Custom'"
                    class="mt-4 mb-3"
                  >
                    <span class="text-h3 font-weight-medium me-1">
                      {{ plan.monthlyPrice }}
                    </span>
                  </div>

                  <div
                    v-else
                    class="mt-4 mb-3"
                  >
                    <span class="text-h3 font-weight-medium me-1">
                      ${{ togglePrice ? plan.monthlyPrice : plan.annualPrice }}
                    </span>
                    <span>/{{ togglePrice ? 'month' : 'annual' }}</span>
                  </div>

                  <p class="mb-6">
                    {{ plan.tagLine }}
                  </p>

                  <VBtn
                    block
                    size="large"
                    :color="selectedPlan === plan.name ? 'success' : 'primary'"
                  >
                    {{ plan.name === 'Free' ? 'Get Started for free' : plan.name === 'Startup' ? 'Buy Now' : 'Contact US' }}
                  </VBtn>

                  <VList class="mt-4 pb-0">
                    <VListItem
                      v-for="feature in plan.features"
                      :key="feature"
                      :title="feature"
                      class="px-0"
                    >
                      <template #prepend>
                        <VIcon
                          :color="selectedPlan === plan.name ? 'success' : 'default'"
                          :icon="selectedPlan === plan.name ? 'mdi-check-circle' : 'mdi-check-circle-outline'"
                        />
                      </template>
                    </VListItem>
                  </VList>
                </VCardText>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>

        <VCardText class="mt-6">
          <h6 class="text-h6">
            Project Plans
          </h6>
          <p class="mb-6">
            Cupcake ipsum dolor sit amet apple pie tart donut donut.
          </p>

          <VRow>
            <VCol cols="12">
              <VTabs>
                <VTab
                  v-for="p in pricingPlans"
                  :key="p.name"
                  :value="p.name"
                  prepend-icon="mdi-currency-usd"
                >
                  {{ p.name }}
                </VTab>
              </VTabs>

              <VTable class="text-no-wrap">
                <thead>
                  <tr>
                    <th />
                    <th>1 Month</th>
                    <th>3 Month</th>
                    <th>6 Month</th>
                    <th>1 Year</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <span class="text-base font-weight-medium">
                        Users
                      </span>
                    </td>
                    <td>1</td>
                    <td>3</td>
                    <td>5</td>
                    <td>7</td>
                  </tr>

                  <tr>
                    <td>
                      <span class="text-base font-weight-medium">
                        Storage
                      </span>
                    </td>
                    <td>5 GB</td>
                    <td>15 GB</td>
                    <td>25 GB</td>
                    <td>50 GB</td>
                  </tr>

                  <tr>
                    <td>
                      <span class="text-base font-weight-medium">
                        Domain
                      </span>
                    </td>
                    <td>
                      <VIcon
                        color="error"
                        icon="mdi-close-circle"
                      />
                    </td>
                    <td>3</td>
                    <td>4</td>
                    <td>8</td>
                  </tr>

                  <tr>
                    <td>
                      <span class="text-base font-weight-medium">
                        Hidden Fees
                      </span>
                    </td>
                    <td>
                      Yes
                    </td>
                    <td>No</td>
                    <td>No</td>
                    <td>No</td>
                  </tr>

                  <tr>
                    <td>
                      <span class="text-base font-weight-medium">
                        Support
                      </span>
                    </td>
                    <td>
                      <VIcon
                        color="success"
                        icon="mdi-check-circle"
                      />
                    </td>
                    <td>
                      <VIcon
                        color="success"
                        icon="mdi-check-circle"
                      />
                    </td>
                    <td>
                      <VIcon
                        color="success"
                        icon="mdi-check-circle"
                      />
                    </td>
                    <td>
                      <VIcon
                        color="success"
                        icon="mdi-check-circle"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span class="text-base font-weight-medium">
                        Update
                      </span>
                    </td>
                    <td>
                      <VIcon
                        color="error"
                        icon="mdi-close-circle"
                      />
                    </td>
                    <td>
                      <VIcon
                        color="success"
                        icon="mdi-check-circle"
                      />
                    </td>
                    <td>
                      <VIcon
                        color="success"
                        icon="mdi-check-circle"
                      />
                    </td>
                    <td>
                      <VIcon
                        color="success"
                        icon="mdi-check-circle"
                      />
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
