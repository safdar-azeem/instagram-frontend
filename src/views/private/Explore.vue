<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'

const ExplorePostList = defineAsyncComponent(
  () => import('@/components/explore/ExplorePostList.vue')
)

export default defineComponent({
  name: 'Explore',
  components: { ExplorePostList },
})
</script>

<template>
  <div>
    <ExplorePostList />
  </div>
</template>
