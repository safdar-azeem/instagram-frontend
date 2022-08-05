<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CommentItemSkeleton',
})
</script>

<template>
  <div class="flex items-start gap-x-2 w-full flex-shrink-0">
    <div class="avatar skeleton"></div>
    <Avatar size="md" />
    <div class="flex-1">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="h-7 w-32 mb-1 rounded skeleton"></h1>
        </div>
      </div>
      <div class="h-3 mb-2 w-full skeleton mt-3 rounded"></div>
      <div class="h-3 mb-2 w-full skeleton rounded"></div>
      <div class="h-3 mb-2 w-full skeleton rounded"></div>
    </div>
  </div>
</template>
