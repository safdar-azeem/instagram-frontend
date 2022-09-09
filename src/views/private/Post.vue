<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import PostCardSkeleton from '@/components/skeletons/PostSkeleton.vue'
import { useGetPostByIdQuery, useMeQuery } from '@/graphql'

const Modal = defineAsyncComponent(() => import('@/components/reusable/Modal.vue'))
const PostCard = defineAsyncComponent(() => import('@/components/post/PostCard.vue'))
const Button = defineAsyncComponent(() => import('@/components/reusable/Button.vue'))
const CommentList = defineAsyncComponent(() => import('@/components/comments/CommentList.vue'))
const CreateComment = defineAsyncComponent(() => import('@/components/comments/CreateComment.vue'))

const ExplorePostList = defineAsyncComponent(
  () => import('@/components/explore/ExplorePostList.vue')
)

export default defineComponent({
  components: {
    Modal,
    Button,
    PostCard,
    CommentList,
    CreateComment,
    ExplorePostList,
    PostCardSkeleton,
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
          :me="meData?.me"
          :trimText="false"
          :isAspectSquare="true"
          :post="post?.getPostById"
          :key="post?.getPostById?._id" />
      </div>
      <aside
        class="flex-1 flex flex-col justify-between mt-5 md:mt-0 aspect-square md:overflow-auto">
        <div
          class="flex-1 aspect-square"
          v-if="post?.getPostById?._id">
          <CommentList
            class="mb-3"
            :post="post?.getPostById"
            :key="post?.getPostById?._id" />
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
