<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthFormHeader',
  props: {
    title: String,
    description: String,
  },
})
</script>

<template>
  <header>
    <h1>{{ title }}</h1>
    <p class="mt-1 text-gray-700">{{ description }}</p>
  </header>
</template>
