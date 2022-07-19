<script lang="ts">
import type { IPost } from '@/graphql'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PostContent',
  emits: ['openModal'],
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
    trimText: {
      type: Boolean,
      default: true,
    },
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<template>
  <main
    class="gray"
    v-if="post.content"
    :class="{ 'card-content': post.photo === null }">
    <div class="relative">
      <span
        class="card-title"
        :class="{
          'trim-text': trimText,
        }">
        {{ post.content }}
      </span>

      <span
        v-if="!isModalOpen && post.content.length > 400"
        @click="$emit('openModal')"
        class="absolute bottom-0 right-0 bg-gray-100 pl-2 font-bold cursor-pointer text-gray-800">
        ...Read more
      </span>
    </div>
  </main>
</template>
