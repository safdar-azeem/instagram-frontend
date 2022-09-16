<script lang="ts">
import moment from 'moment'
import Button from '../reusable/Button.vue'
import { useToast } from 'vue-toastification'
import type { IComment, IUser } from '@/graphql'
import Avatar from '@/components/reusable/Avatar.vue'
import { defineComponent, reactive, toRefs } from 'vue'
import { AppRoutes } from '@/constants/routes.constant'
import { useDeleteCommentMutation, useLikeCommentMutation } from '@/graphql'

export default defineComponent({
  name: 'CommentItem',
  components: { Avatar, Button },
  props: {
    comment: {
      type: Object as () => IComment,
      required: true,
    },
    me: {
      type: Object as () => IUser,
      required: true,
    },
    postUserId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const toast = useToast()
    const state = reactive({
      isHovered: false,
      likes: props.comment.likes,
    })

    const {
      mutate: likeComment,
      onError: likeCommentOnError,
      loading: likeCommentLoading,
    } = useLikeCommentMutation({
      updateQueries: {
        GetComments: (prev, { mutationResult }) => {
          if (!mutationResult.data) return prev
          return {
            ...prev,
            getComments: prev.getComments.map((comment) => {
              if (comment._id === props.comment._id) {
                return {
                  ...comment,
                  likes: mutationResult.data.likeComment
                    ? [...comment.likes, props.me._id]
                    : comment.likes.filter((like) => like !== props.me._id),
                }
              }
              return comment
            }),
          }
        },
      },
    })

    const {
      mutate: deleteComment,
      onError: deleteCommentOnError,
      loading: deleteCommentLoading,
    } = useDeleteCommentMutation({
      refetchQueries: ['GetAllPosts', 'GetPostsByUser', 'GetBookmarkedPosts'],
      updateQueries: {
        GetComments: (prev, { mutationResult }) => {
          if (!mutationResult.data) return prev
          return {
            ...prev,
            getComments: prev.getComments.filter((comment) => comment._id !== props.comment._id),
          }
        },
      },
    })

    const actions = {
      deleteComment: () =>
        deleteComment({
          commentId: props.comment._id,
        }),
      likeComment: () => {
        state.likes = state.likes.includes(props.me._id)
          ? state.likes.filter((like) => like !== props.me._id)
          : [...state.likes, props.me._id]
        likeComment({
          commentId: props.comment._id,
        })
      },
    }

    likeCommentOnError((error) => {
      toast.error(error.message)
    })

    deleteCommentOnError((error) => {
      toast.error(error.message)
    })

    return {
      actions,
      likeCommentLoading,
      deleteCommentLoading,
      ...toRefs(state),
    }
  },

  computed: {
    totalLikes() {
      return this.likes.length
    },
    isLiked() {
      return this.likes.some((like) => like === this.me._id)
    },
    isCommentOwner() {
      return this.comment.user._id === this.me._id
    },
    isPostOwner() {
      return this.postUserId === this.me._id
    },
    timeAgo() {
      return moment(this.comment.createdAt).fromNow()
    },
    profileLink() {
      return `${AppRoutes.PROFILE}/${this.comment.user._id}`
    },
  },
})
</script>

<template>
  <div
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="flex items-start gap-x-2 w-full flex-shrink-0">
    <router-link :to="profileLink">
      <Avatar
        size="md"
        :src="comment.user.avatar" />
    </router-link>
    <div class="flex-1">
      <div class="flex justify-between items-center">
        <div>
          <router-link :to="profileLink">
            <h6>{{ comment.user.name }}</h6>
          </router-link>
          <p
            class="text-[12px] text-gray-600"
            v-if="timeAgo">
            {{ timeAgo }}
          </p>
        </div>
        <div class="flex gap-x-1">
          <Button
            icon="mdi:trash-can"
            size="sm"
            radius="rounded-full"
            variant="transparent"
            @click="actions.deleteComment"
            :loading="deleteCommentLoading"
            button-class="font-normal -text-fs-1"
            v-if="(isCommentOwner || isPostOwner) && isHovered" />
          <div class="flex items-center gap-x-1">
            <Button
              size="sm"
              radius="rounded-full"
              button-class="font-normal"
              @click="actions.likeComment"
              :loading="likeCommentLoading"
              :variant="isLiked ? 'like' : 'transparent'"
              :icon="isLiked ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'" />
            <span :class="'btn-text -text-fs-2 text-gray-500'">{{ totalLikes || 0 }}</span>
          </div>
        </div>
      </div>
      <p class="text-[14px] mt-2">{{ comment.content }}</p>
    </div>
  </div>
</template>
