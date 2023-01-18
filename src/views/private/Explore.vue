<script lang="ts">
import { useExplorePostsLazyQuery, useExplorePostsQuery } from '@/types/graphql.types'
import {
  defineComponent,
  onMounted,
  onUnmounted,
  defineAsyncComponent,
  reactive,
  toRefs,
} from 'vue'
import { useInfiniteScrollPagination } from '@/hooks/useInfiniteScrollPagination'
const PostList = defineAsyncComponent(() => import('@/components/post/PostList.vue'))
import debounce from './../../utils/debounce'

export default defineComponent({
  name: 'Explore',
  components: { PostList },
  setup() {
    const state = reactive({
      explorePostsLoading: false,
    })

    const { limit, loadMore } = useInfiniteScrollPagination()

    const {
      result: explorePosts,
      onResult: onExplorePostsResult,
      loading: explorePostsLoading,
      fetchMore: loadExplorePosts,
    } = useExplorePostsQuery({
      limit: limit.value,
    })

    onExplorePostsResult((result) => {
      state.explorePostsLoading = false
    })

    const handleScroll = debounce(() => {
      const bottomOfPage =
        document.documentElement.getBoundingClientRect().bottom <= window.innerHeight

      if (bottomOfPage && !explorePostsLoading.value) {
        loadMore()
        loadExplorePosts({
          variables: {
            limit: limit.value,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev
            return {
              ...prev,
              explorePosts: [
                ...prev.explorePosts,
                ...fetchMoreResult.explorePosts.filter(
                  (post) => !prev.explorePosts.find((p) => p._id === post._id)
                ),
              ],
            }
          },
        })
      }
    }, 500)

    onMounted(() => {
      loadExplorePosts({
        variables: {
          limit: limit.value,
        },
      })
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      ...toRefs(state),
      explorePosts,
    }
  },
})
</script>

<template>
  <div>
    <PostList
      :posts="explorePosts?.explorePosts"
      :loading="explorePostsLoading"
      :columnsOnLgScreens="3"
      :columnsOnMdScreens="3"
      :columnsOnSmScreens="2"
      :isCardPhotoOnly="true"
      v-if="explorePosts?.explorePosts.length" />
  </div>
</template>
