<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PostSkeleton',
  props: {
    variant: {
      type: String as () => 'card' | 'photo',
      default: 'card',
    },
    imgHeight: {
      type: String,
      default: 'h-64',
    },
  },
})
</script>

<template>
  <article class="post-card">
    <header
      class="card-header"
      v-if="variant === 'card'">
      <div class="flex items-center gap-3">
        <div class="avatar skeleton"></div>
        <h1 class="h-6 w-32 rounded skeleton"></h1>
      </div>
    </header>
    <div v-if="variant === 'card'">
      <h1 class="h-3 w-full rounded skeleton mb-2"></h1>
      <h1 class="h-3 w-full rounded skeleton"></h1>
    </div>
    <div
      class="card-image skeleton"
      :class="imgHeight"></div>
  </article>
</template>
