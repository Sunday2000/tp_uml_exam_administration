<script setup lang="ts">
import type { User } from '@/plugins/apis/types'
import axios from '@axios'
import { VForm } from 'vuetify/components/VForm'
import { VDataTable } from 'vuetify/labs/VDataTable'

// data
const search = ref('')

// headers
const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Company', key: 'company' },
  { title: 'Role', key: 'role' },
  { title: 'Status', key: 'status' },
  { title: 'Actions', key: 'actions' },
]

// users
const users = ref<User[]>([])
const refUserForm = ref<VForm>()

const userData = ref({
  name: '',
  email: '',
  company: '',
  role: '',
  status: 'inactive',
})

const fetchUsers = () => {
  axios.get('/users').then(response => {
    users.value = response.data
  })
}

onMounted(fetchUsers)

// breadcrumbs
const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'User',
    disabled: true,
  },
  {
    title: 'List',
    disabled: true,
  },
]

// getting chip color
const resolveChipColor = (value: string) => {
  if (value === 'active')
    return 'success'

  else if (value === 'inactive')
    return 'error'

  else
    return 'warning'
}

const isAddUserDialogVisible = ref(false)

// delete user
const deleteUser = (userId: number) => {
  axios.delete(`/user/delete/${userId}`).then(response => {
    if (response.status === 204)
      fetchUsers()
  }).catch(error => {
    console.log(error)
  })
}

const addUser = async () => {
  const validation = await refUserForm.value?.validate()

  if (validation?.valid) {
    try {
      const response = await axios.post('/user/add', { user: userData.value })

      isAddUserDialogVisible.value = false
      if (response.status === 201)
        fetchUsers()
    }
    catch (error) {
      console.error(error)
    }
  }
}
</script>

<template>
  <VRow>
    <!-- Breadcrumbs -->
    <VCol cols="12">
      <VBreadcrumbs
        :items="breadcrumbs"
        divider="-"
        class="px-0"
      />
    </VCol>

    <VCol cols="12">
      <VCard>
        <VCardItem>
          <template #prepend>
            <VBtn
              color="primary"
              @click="isAddUserDialogVisible = !isAddUserDialogVisible"
            >
              Add New User
            </VBtn>
          </template>

          <template #append>
            <div style="width: 10rem;">
              <VTextField
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                placeholder="Search..."
              />
            </div>
          </template>
        </VCardItem>

        <!-- Datatable -->
        <VDataTable
          :search="search"
          :headers="headers"
          :items="users"
          show-select
          class="table-borderless text-medium-emphasis rounded-0 text-no-wrap"
        >
          <!-- name -->
          <template #item.name="{ item }">
            <div>
              <VAvatar
                size="32"
                color="primary"
                :image="item.raw.avatar"
                class="me-2"
              >
                <VImg
                  v-if="item.raw.avatar"
                  :src="item.raw.avatar"
                />
                <span v-else>{{ item.raw.name.charAt(0).toUpperCase() }}</span>
              </VAvatar>

              <span class="text-high-emphasis font-weight-medium">{{ item.raw.name }}</span>
            </div>
          </template>

          <!-- status -->
          <template #item.status="{ item }">
            <VChip
              label
              density="comfortable"
              :color="resolveChipColor(item.raw.status)"
            >
              <span class="text-capitalize text-xs">{{ item.raw.status }}</span>
            </VChip>
          </template>

          <!-- actions -->
          <template #item.actions="{ item }">
            <div>
              <VBtn
                icon
                variant="plain"
                size="x-small"
                :to="{ name: 'apps-user-profile', params: { tab: 'profile' } }"
              >
                <VIcon
                  size="20"
                  icon="mdi-eye-outline"
                />

                <VTooltip activator="parent">
                  View
                </VTooltip>
              </VBtn>

              <VBtn
                icon
                variant="plain"
                size="x-small"
                @click="deleteUser(item.raw.id)"
              >
                <VIcon
                  size="20"
                  icon="mdi-delete-outline"
                />

                <VTooltip activator="parent">
                  Delete
                </VTooltip>
              </VBtn>
            </div>
          </template>
        </VDataTable>
      </VCard>

      <VDialog
        v-model="isAddUserDialogVisible"
        width="500"
      >
        <VCard title="Add New User">
          <VCardText>
            <VForm
              ref="refUserForm"
              @submit.prevent="addUser"
            >
              <VRow>
                <VCol cols="12">
                  <VTextField
                    v-model="userData.name"
                    label="Name"
                    :rules="[v => !!v || 'Name is required']"
                    placeholder="Please Enter Your Full Name"
                  />
                </VCol>

                <VCol cols="12">
                  <VTextField
                    v-model="userData.email"
                    label="Email"
                    :rules="[v => !!v || 'Email is required']"
                    placeholder="Please Enter Email"
                  />
                </VCol>

                <VCol cols="12">
                  <VTextField
                    v-model="userData.company"
                    label="Company"
                    :rules="[v => !!v || 'Company is required']"
                    placeholder="Company"
                  />
                </VCol>

                <VCol cols="12">
                  <VTextField
                    v-model="userData.role"
                    label="Role"
                    :rules="[v => !!v || 'Role is required']"
                    placeholder="Role"
                  />
                </VCol>

                <VCol cols="12">
                  <VRadioGroup
                    v-model="userData.status"
                    inline
                    label="Status"
                    hide-details="auto"
                    :rules="[v => !!v || 'Status is required']"
                  >
                    <VRadio
                      value="active"
                      color="success"
                      label="Active"
                    />
                    <VRadio
                      color="error"
                      value="inactive"
                      label="Inactive"
                    />
                  </VRadioGroup>
                </VCol>

                <VCol cols="12">
                  <VBtn
                    color="success"
                    variant="tonal"
                    type="submit"
                    class="me-4"
                  >
                    Submit
                  </VBtn>

                  <VBtn
                    color="secondary"
                    variant="tonal"
                    type="reset"
                    @click="isAddUserDialogVisible = false"
                  >
                    Cancel
                  </VBtn>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VDialog>
    </VCol>
  </VRow>
</template>
