<script lang="ts">
import PostCardSkeleton from '@/components/skeletons/PostSkeleton.vue'
import { useGetPostByIdQuery, useMeQuery } from '@/types/graphql.types'
import { defineAsyncComponent, defineComponent } from 'vue'
const CommentList = defineAsyncComponent(() => import('@/components/comments/CommentList.vue'))
const PostCard = defineAsyncComponent(() => import('@/components/post/PostCard.vue'))
const ExplorePostList = defineAsyncComponent(
  () => import('@/components/explore/ExplorePostList.vue')
)
const CreateComment = defineAsyncComponent(() => import('@/components/comments/CreateComment.vue'))
const Button = defineAsyncComponent(() => import('@/components/reusable/Button.vue'))
const Modal = defineAsyncComponent(() => import('@/components/reusable/Modal.vue'))

export default defineComponent({
  components: {
    Modal,
    PostCard,
    CommentList,
    CreateComment,
    PostCardSkeleton,
    Button,
    ExplorePostList,
  },
  props: ['id'],
  setup(props) {
    const { result: post, loading: postLoading } = useGetPostByIdQuery({
      postId: props.id,
    })
    const { result: meData } = useMeQuery()

    return { post, postLoading, meData }
  },
})
</script>

<template>
  <div>
    <section class="md:flex gap-8 relative single-post-card">
      <div class="md:w-[46.4%] overflow-auto">
        <PostCardSkeleton
          v-if="postLoading"
          imgHeight="aspect-square" />
        <PostCard
          v-else
          :key="post?.getPostById?._id"
          :me="meData?.me"
          :isAspectSquare="true"
          :trimText="false"
          :post="post?.getPostById" />
      </div>
      <aside
        class="flex-1 flex flex-col justify-between mt-5 md:mt-0 aspect-square md:overflow-auto">
        <div
          class="flex-1 aspect-square"
          v-if="post?.getPostById?._id">
          <CommentList
            class="mb-3"
            :key="post?.getPostById?._id"
            :post="post?.getPostById" />
        </div>
        <CreateComment
          class="sticky bottom-0 bg-white"
          :postId="post?.getPostById?._id" />
      </aside>
    </section>
    <ExplorePostList
      class="mt-12"
      :skipPostId="post?.getPostById?._id" />
  </div>
</template>
