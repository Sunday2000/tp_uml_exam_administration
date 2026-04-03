<script setup lang="ts">
import { useDropZone, useFileDialog, useObjectUrl } from '@vueuse/core'

interface FileData {
  file: File
  url: string
}

const { open, onChange } = useFileDialog()

const filesData = ref<FileData[]>([])
const dropZoneRef = ref<HTMLDivElement>()

const onDrop = (DroppedFiles: File[] | null) => {
  DroppedFiles?.forEach(file => {
    filesData.value.push({
      file,
      url: useObjectUrl(file).value ?? '',
    })
  },
  )
}

onChange((selectedFiles: any) => {
  if (!selectedFiles)
    return

  for (const file of selectedFiles) {
    filesData.value.push({
      file,
      url: useObjectUrl(file).value ?? '',
    })
  }
})

useDropZone(dropZoneRef, onDrop)
</script>

<template>
  <VCard
    ref="dropZoneRef"
    variant="outlined"
    @click="() => open()"
  >
    <VCardText
      v-if="filesData.length === 0"
      class="d-flex align-center gap-3"
    >
      <VAvatar
        variant="tonal"
        rounded
        color="primary"
      >
        <VIcon
          icon="mdi-tray-arrow-up"
          size="24"
        />
      </VAvatar>

      <div>
        <h6 class="text-base font-weight-medium">
          Drop files here or click to upload.
        </h6>
        <span class="text-disabled">Upload any files</span>
      </div>
    </VCardText>

    <VCardText v-else>
      <VList lines="two">
        <VListItem
          v-for="(item, index) in filesData"
          :key="index"
          :title="item.file.name"
          :subtitle="`${item.file.size / 1000} KB`"
          class="border rounded py-3"
          :class="index ? 'mt-4' : ''"
        >
          <template #prepend>
            <VAvatar v-if="item.file.type.slice(0, 6) === 'image/'">
              <VImg :src="item.url" />
            </VAvatar>

            <VAvatar
              v-else
              color="primary"
              icon="mdi-file-check-outline"
            />
          </template>

          <template #append>
            <VBtn
              icon
              size="small"
              variant="tonal"
              color="error"
              @click.stop="filesData.splice(index, 1)"
            >
              <VIcon icon="mdi-delete-outline" />
            </VBtn>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>
