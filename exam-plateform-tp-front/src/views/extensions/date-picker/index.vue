<script setup lang="ts">
import DatepickerAutoRange from './DatepickerAutoRange.vue'
import DatepickerBasic from './DatepickerBasic.vue'
import DatepickerInline from './DatepickerInline.vue'
import DatepickerMonthPicker from './DatepickerMonthPicker.vue'
import DatepickerMultiCalendar from './DatepickerMultiCalendar.vue'
import DatepickerRange from './DatepickerRange.vue'
import DatepickerTimePicker from './DatepickerTimePicker.vue'

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: { path: '/' },
  },
  {
    title: 'Extensions',
    disabled: false,
  },
  {
    title: 'Date Picker',
    disabled: true,
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

      <div>
        <ApiBtn
          href="https://vue3datepicker.com/"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </VCol>
    <!-- Breadcrumbs -->

    <!-- Basic -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Basic">
        <VCardText>
          <DatepickerBasic />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Range -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Range">
        <VCardText>
          <DatepickerRange />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Auto Range -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Auto Range">
        <VCardText>
          <DatepickerAutoRange />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Multi-calendars -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Multi Calendars">
        <VCardText>
          <DatepickerMultiCalendar />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Month Picker -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Month Picker">
        <VCardText>
          <DatepickerMonthPicker />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Time Picker -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Time Picker">
        <VCardText>
          <DatepickerTimePicker />
        </VCardText>
      </VCard>
    </VCol>

    <!-- Inline -->
    <VCol
      cols="12"
      md="6"
    >
      <VCard title="Inline">
        <VCardText>
          <DatepickerInline />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
