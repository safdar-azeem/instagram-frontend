<script lang="ts">
import { useGetAllPostsQuery } from '@/graphql'
import EmptyState from '@/components/reusable/EmptyState.vue'
import { defineComponent, defineAsyncComponent, ref } from 'vue'

const PostList = defineAsyncComponent(() => import('@/components/post/PostList.vue'))

export default defineComponent({
  name: 'Dashboard',
  components: { PostList, EmptyState },
  setup() {
    const isLoading = ref(true)
    const { result, loading, error, onResult } = useGetAllPostsQuery({
      fetchPolicy: 'cache-and-network',
    })

    onResult((result) => {
      isLoading.value = false
    })

    return { result, loading, error, isLoading }
  },
})
</script>

<template>
  <div>
    <PostList
      :posts="result?.getAllPosts"
      :loading="isLoading" />
    <EmptyState
      v-if="result?.getAllPosts.length === 0"
      icon="/emptyFeed.svg"
      title="Looks like there's nothing new here"
      description="Follow some more users or groups to fill up your feed" />
  </div>
</template>
