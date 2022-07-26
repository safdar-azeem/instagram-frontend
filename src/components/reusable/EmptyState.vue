<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EmptyState',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      default: 'h-[50vh]',
    },
  },
  setup() {},
})
</script>

<template>
  <section
    class="flex justify-center items-center flex-col gap-6 text-center"
    :class="height">
    <img
      :src="icon"
      alt="Empty state icon" />
    <div>
      <h4 class="font-medium text-fs-3 sm:text-fs-5 mb-1">{{ title }}</h4>
      <p class="-text-fs-2 sm:-text-fs-1 text-gray-600">{{ description }}</p>
    </div>
  </section>
</template>
