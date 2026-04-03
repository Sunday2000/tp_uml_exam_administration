<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

interface Comment {
  createdBy: {
    name: string
    avatar: string
  }
  createdAt: string
  content: string
}

interface Post {
  createdBy: {
    name: string
    avatar: string
  }
  createdAt: string
  content: string
  image?: string
  likes: number
  comments: Comment[]
}

const props = defineProps<Post>()

const showComments = ref(false)
</script>

<template>
  <!-- post card -->
  <VCard>
    <VImg
      v-if="props.image"
      height="200"
      cover
      expand-on-click
      :src="props.image"
    />

    <VCardItem>
      <VCardTitle class="text-base">
        {{ props.createdBy.name }}
      </VCardTitle>
      <VCardSubtitle>{{ props.createdAt }}</VCardSubtitle>
      <template #prepend>
        <VAvatar :image="props.createdBy.avatar" />
      </template>

      <template #append>
        <VBtn
          icon
          size="small"
          variant="text"
        >
          <VIcon
            size="24"
            icon="mdi-dots-vertical"
          />
        </VBtn>
      </template>
    </VCardItem>

    <VCardText v-if="props.content">
      {{ props.content }}
    </VCardText>

    <VDivider />

    <VCardActions class="justify-space-between">
      <VBtn color="error">
        <VIcon
          start
          icon="mdi-heart"
        />
        <span>{{ props.likes }}</span>
      </VBtn>

      <VBtn
        append-icon="mdi-chevron-down"
        @click="showComments = !showComments"
      >
        <span class="me-1">{{ props.comments.length }}</span>
        <span>Comments</span>
      </VBtn>
    </VCardActions>

    <VExpandTransition>
      <VCard
        v-show="showComments"
        subtitle="Comments"
        class="v-card--reveal"
        style="height: 100%;"
      >
        <template #append>
          <div>
            <VBtn
              icon
              variant="text"
              size="x-small"
              @click="showComments = false"
            >
              <VIcon
                size="20"
                icon="mdi-close"
              />
            </VBtn>
          </div>
        </template>

        <VCardText class="comment-wrapper">
          <PerfectScrollbar
            :options="{ wheelPropagation: false, suppressScrollX: true }"
            class="h-100 mb-4"
          >
            <VList class="comment-list">
              <VListItem
                v-for="comment in props.comments"
                :key="comment.createdAt"
              >
                <template #prepend>
                  <VAvatar
                    size="36"
                    :image="comment.createdBy.avatar"
                  />
                </template>

                <VListItemTitle>
                  {{ comment.createdBy.name }}
                </VListItemTitle>
                <VListItemSubtitle>
                  {{ comment.createdAt }}
                </VListItemSubtitle>

                <p>
                  {{ comment.content }}
                </p>

                <template #append>
                  <VBtn
                    icon
                    size="x-small"
                    variant="text"
                  >
                    <VIcon
                      size="24"
                      icon="mdi-dots-vertical"
                    />
                  </VBtn>
                </template>
              </VListItem>
            </VList>
          </PerfectScrollbar>

          <VForm @submit.prevent="() => {}">
            <VTextarea
              rows="1"
              hide-details="auto"
              placeholder="Write a comment..."
            />

            <VBtn
              block
              type="submit"
              color="primary"
              variant="tonal"
              class="mt-2"
            >
              Comment
            </VBtn>
          </VForm>
        </VCardText>
      </VCard>
    </VExpandTransition>
  </VCard>
</template>

<style lang="scss">
.heading-content {
  margin-block-start: -6.5rem;
}

.v-card--reveal {
  position: absolute;
  inline-size: 100%;
  inset-block-end: 0;
  opacity: 1 !important;
}

.comment-wrapper {
  block-size: calc(100% - 11rem);

  .comment-list {
    padding-block-start: 0;

    .v-list-item {
      padding-inline: 0;
    }

    .v-list-item-subtitle {
      margin-block-end: 1rem;
    }

    .v-list-item__prepend,
    .v-list-item__append {
      align-self: flex-start;
    }
  }
}
</style>
