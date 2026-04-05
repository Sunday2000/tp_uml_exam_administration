<script setup lang="ts">
import type { ToastOptions } from 'vue3-toastify'
import { toast } from 'vue3-toastify'

const options = ref({} as ToastOptions)

const basicToast = () => {
  toast('Basic Toast')
}

const displayPromise = () => {
  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000))

  toast.promise(
    resolveAfter3Sec,
    {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯',
    },
  )

  const functionThatReturnPromise = () => new Promise((resolve, reject) => setTimeout(reject, 3000))

  toast.promise(
    functionThatReturnPromise,
    {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯',
    },
  )

  // eslint-disable-next-line prefer-promise-reject-errors
  const resolveWithSomeData = new Promise<{ message: string }>((resolve, reject) => setTimeout(() => reject({ message: 'world' }), 3000))

  toast.promise(
    resolveWithSomeData,
    {
      pending: {
        render() {
          return 'I\'m loading'
        },
        icon: false,
      },
      success: {
        render({ data }) {
          return `Hello ${data.message}`
        },

        // other options
        icon: '🟢',
      },
      error: {
        render({ data }) {
          // When the promise reject, data will contains the error
          return h('div', `inject data: ${data.message}`)

          // return `inject data: ${data.message}`;
        },

        // render: 'just text',
        // render: h('div', 'error'),
      },
    },
    {
      position: toast.POSITION.BOTTOM_CENTER,
    },
  )
}

const showLoadToast = () => {
  toast.loading(`I can not auto close! ${Number.parseInt(String(Math.random() * 100000), 10)}`, options.value)
}

const clearAll = () => {
  toast.clearAll()
}
</script>

<template>
  <div class="d-flex flex-wrap gap-4">
    <VBtn
      color="primary"
      @click="basicToast"
    >
      Basic
    </VBtn>

    <VBtn
      color="success"
      @click="displayPromise"
    >
      With Promise
    </VBtn>

    <VBtn
      color="info"
      @click="showLoadToast"
    >
      Loading Toast
    </VBtn>

    <VBtn
      color="error"
      @click="clearAll"
    >
      unmount all container
    </VBtn>
  </div>
</template>

<style lang="scss">
@import "vue3-toastify/dist/index.css";
@import "@/styles/libs/toastify";
</style>
