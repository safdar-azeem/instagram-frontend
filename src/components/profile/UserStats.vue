<script lang="ts">
import type { IUser } from '@/graphql'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserStats',
  props: {
    user: {
      type: Object as () => IUser | null,
      required: true,
    },
    variant: {
      type: String as () => 'default' | 'bg',
      default: 'default',
    },
  },
  setup() {
    return {}
  },
})
</script>

<template>
  <section
    class="flex justify-between text-center gap-x-3"
    :class="{ 'bg-gray-100 px-5 py-6 rounded': variant === 'bg' }">
    <div>
      <p>{{ user?.posts?.length }}</p>
      <p class="-text-fs-1 text-gray-500 mt-1 font-medium">Posts</p>
    </div>
    <div>
      <p>{{ user?.followers?.length }}</p>
      <p class="-text-fs-1 text-gray-500 mt-1 font-medium">Followers</p>
    </div>
    <div>
      <p>{{ user?.following?.length }}</p>
      <p class="-text-fs-1 text-gray-500 mt-1 font-medium">Following</p>
    </div>
  </section>
</template>
