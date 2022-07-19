<script lang="ts">
import Button from '../reusable/Button.vue'
import { defineComponent, reactive, toRefs } from 'vue'
import type { IPost, IUser } from '@/graphql'
import { useBookmarkPostMutation, useLikePostMutation } from '@/graphql'

export default defineComponent({
  name: 'PostFooter',
  components: {
    Button,
  },
  emits: ['openModal', 'handleLikePost', 'handleBookmarkPost'],
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
    me: {
      type: Object as () => IUser | null,
      required: true,
    },
    isIconVariantSolid: Boolean,
    hideBookmark: Boolean,
  },
  setup(props, { emit }) {
    const state = reactive({
      bookmarks: props.me?.bookmarks,
    })

    const { mutate: likePost, loading: likePostLoading } = useLikePostMutation({
      refetchQueries: ['GetAllPosts', 'GetPostsByUser', 'GetBookmarkedPosts', 'GetPostById'],
    })

    const { mutate: bookmarkPost, loading: bookmarkPostLoading } = useBookmarkPostMutation({
      refetchQueries: ['GetBookmarkedPosts', 'Me', 'GetPostById'],
    })

    const handleLikePost = () => {
      emit('handleLikePost')
      likePost({
        postId: props.post._id,
      })
    }

    const handleBookmarkPost = () => {
      emit('handleBookmarkPost')
      bookmarkPost({
        postId: props.post._id,
      })
    }

    return {
      ...toRefs(state),
      handleLikePost,
      handleBookmarkPost,
      bookmarkPostLoading,
      likePostLoading,
    }
  },
  computed: {
    isPostLikedByMe() {
      return this.post.likes.includes(this.me?._id)
    },
    isBookmark() {
      return this.me.bookmarks.includes(this.post._id)
    },
    totalLikes() {
      return this.post.likes.length
    },
    totalComments() {
      return this.post.comments.length
    },
  },
})
</script>

<template>
  <footer class="card-footer gap-x-4">
    <div class="flex gap-x-5">
      <div class="flex items-center gap-1">
        <Button
          :icon="
            isIconVariantSolid
              ? 'mdi:cards-heart'
              : isPostLikedByMe
              ? 'mdi:cards-heart'
              : 'mdi:cards-heart-outline'
          "
          size="md"
          radius="rounded-full"
          @click="handleLikePost"
          button-class="font-normal"
          :variant="isPostLikedByMe ? 'like' : 'transparent'" />
        <span :class="isPostLikedByMe ? 'text-danger' : 'btn-text'">{{ totalLikes }}</span>
      </div>
      <div
        class="flex items-center gap-1"
        @click="$emit('openModal')">
        <Button
          size="md"
          radius="rounded-full"
          variant="transparent"
          button-class="font-normal"
          icon="ph:chat-circle-dots-fill" />
        <span class="btn-text">{{ totalComments }}</span>
      </div>
    </div>
    <Button
      size="md"
      v-if="!hideBookmark"
      radius="rounded-full"
      variant="transparent"
      @click="handleBookmarkPost"
      :loading="bookmarkPostLoading"
      :icon="isBookmark ? 'mingcute:bookmark-fill' : 'mingcute:bookmark-line'" />
  </footer>
</template>
