<script lang="ts">
import type { IPost } from '@/graphql'
import CommentItem from './CommentItem.vue'
import { defineComponent, watch } from 'vue'
import { useGetCommentsQuery, useMeQuery } from '@/graphql'
import CommentItemSkeleton from '../skeletons/CommentItemSkeleton.vue'

export default defineComponent({
  name: 'CommentList',
  components: { CommentItem, CommentItemSkeleton },
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
  },
  setup(props) {
    const { result: meData } = useMeQuery()

    const {
      result: commentsData,
      loading: commentsLoading,
      refetch: commentsRefetch,
    } = useGetCommentsQuery({
      comments: props.post.comments,
    })

    watch(
      () => props.post._id,
      () => {
        commentsRefetch({
          comments: props.post.comments,
        })
      }
    )

    return {
      commentsData,
      commentsLoading,
      meData,
    }
  },
})
</script>

<template>
  <div class="md:max-h pb-5 overflow-auto">
    <header class="h4 font-medium mb-3 pb-2 sticky top-0 bg-white w-full z-10">Comments</header>
    <section class="flex flex-col items-start gap-6">
      <template v-if="commentsLoading">
        <CommentItemSkeleton
          v-for="i in 4"
          :key="i" />
      </template>

      <div
        v-else
        class="w-full">
        <CommentItem
          class="mb-5"
          :me="meData?.me"
          :comment="comment"
          :key="comment?._id"
          :postUserId="post?.user._id"
          v-for="comment in commentsData.getComments" />
      </div>
      <p
        class="w-full text-center text-gray-400 -text-fs-1 my-2"
        v-if="commentsData?.getComments.length === 0">
        No comments yet – be the first to leave a comment!
      </p>
    </section>
  </div>
</template>
