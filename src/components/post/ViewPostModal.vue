<script lang="ts">
import type { IPost, IUser } from '@/graphql'
import { defineAsyncComponent, defineComponent, watch } from 'vue'
const Modal = defineAsyncComponent(() => import('../reusable/Modal.vue'))
const PostCard = defineAsyncComponent(() => import('./PostCard.vue'))
const CommentList = defineAsyncComponent(() => import('../comments/CommentList.vue'))
const CreateComment = defineAsyncComponent(() => import('../comments/CreateComment.vue'))
const Button = defineAsyncComponent(() => import('../reusable/Button.vue'))

export default defineComponent({
  name: 'ViewPostModal',
  components: {
    Modal,
    PostCard,
    CommentList,
    CreateComment,
    Button,
  },
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    post: {
      type: Object as () => IPost,
      required: true,
    },
    isPrevBtnDisabled: {
      type: Boolean,
      default: false,
    },
    isNextBtnDisabled: {
      type: Boolean,
      default: false,
    },
    me: {
      type: Object as () => IUser | null,
      required: true,
    },
  },
  emits: [
    'close',
    'open',
    'next',
    'prev',
    'handleDeletePost',
    'handleLikePost',
    'handleBookmarkPost',
  ],
  setup(props, { emit }) {
    watch(
      () => props.post,
      () => {
        if (!props.post) {
          emit('next')
        }
      }
    )
  },
})
</script>

<template>
  <Modal
    title="Post"
    @close="$emit('close')"
    @open="$emit('open')"
    modalClass="post-modal"
    class="relative"
    :is-open="isModalOpen">
    <template v-slot:modal-body>
      <section class="md:flex h-full gap-8 relative">
        <PostCard
          :me="me"
          :post="post"
          height="100%"
          :key="post._id"
          :trimText="false"
          :isModalOpen="isModalOpen"
          class="md:w-[46%] overflow-auto"
          @handleLikePost="$emit('handleLikePost', post._id)"
          @handleDeletePost="$emit('handleDeletePost', post._id)"
          @handleBookmarkPost="$emit('handleBookmarkPost', post._id)" />
        <aside class="flex-1 flex flex-col justify-between mt-5 md:mt-0">
          <CommentList
            class="mb-3"
            :key="post._id"
            :post="post" />
          <CreateComment
            class="sticky bottom-0 bg-white"
            :postId="post?._id" />
        </aside>
      </section>
    </template>
    <template v-slot:modal-aside>
      <Button
        size="sm"
        variant="secondary"
        radius="rounded-full"
        iconClass="text-fs-7"
        @click="$emit('prev')"
        :disabled="isPrevBtnDisabled"
        icon="ic:round-keyboard-arrow-left"
        buttonClass="border border-gray-300"
        class="absolute center-left md:left-[-20px] z-[1199]" />
      <Button
        size="sm"
        variant="secondary"
        radius="rounded-full"
        iconClass="text-fs-7"
        @click="$emit('next')"
        :disabled="isNextBtnDisabled"
        icon="ic:round-keyboard-arrow-right"
        buttonClass="border border-gray-300"
        class="absolute center-right md:right-[-20px] z-[1199]" />
    </template>
  </Modal>
</template>
