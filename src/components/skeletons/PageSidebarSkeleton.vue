<script lang="ts">
import navigationJson from '@/json/navigation.json'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageSidebarSkeleton',
  setup() {
    return {
      navigationJson,
    }
  },
})
</script>

<template>
  <aside class="w-full flex flex-col justify-between">
    <header class="w-full">
      <header class="py-3 w-full rounded h-max flex gap-x-3 items-center">
        <div class="avatar skeleton"></div>
        <div class="h-6 w-28 rounded skeleton"></div>
      </header>
      <section class="flex justify-between text-center gap-x-3 mt-6">
        <div
          class="flex items-center flex-col"
          v-for="i in 3"
          :key="i">
          <div class="h-4 w-6 rounded-full skeleton"></div>
          <div class="h-4 w-16 rounded skeleton mt-2"></div>
        </div>
      </section>
      <nav class="mt-10">
        <div
          v-for="item in navigationJson"
          :key="item.text"
          class="h-10 w-full rounded skeleton mb-3"></div>
      </nav>
    </header>
    <footer>
      <div class="h-10 w-full rounded skeleton mb-3"></div>
    </footer>
  </aside>
</template>
