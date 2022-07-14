<script lang="ts">
import { useToast } from 'vue-toastification'
import Input from '@/components/reusable/Input.vue'
import { useCreateCommentMutation } from '@/graphql'
import Button from '@/components/reusable/Button.vue'
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'CreateComment',
  components: { Input, Button },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const toast = useToast()
    const state = reactive({
      comment: '',
    })

    const {
      mutate: createComment,
      onError: createCommentOnError,
      loading: createCommentLoading,
    } = useCreateCommentMutation({
      refetchQueries: ['GetAllPosts', 'GetPostsByUser', 'GetBookmarkedPosts'],
      updateQueries: {
        GetComments: (prev, { mutationResult }) => {
          if (!mutationResult.data) return prev
          const newComment = mutationResult.data.createComment
          return {
            ...prev,
            getComments: [...prev.getComments, newComment],
          }
        },
      },
    })

    const handleCreateComment = async () => {
      if (!state.comment) return
      const result = await createComment({
        content: state.comment,
        postId: props.postId,
      })

      if (result?.data?.createComment) {
        state.comment = ''
      }
    }

    createCommentOnError((error) => {
      toast.error(error.message)
    })

    return {
      ...toRefs(state),
      createCommentLoading,
      handleCreateComment,
    }
  },
})
</script>

<template>
  <div class="relative">
    <Input
      type="textarea"
      :value="comment"
      @input="comment = $event.target.value"
      placeholder="Write a comment..." />
    <section class="bottom-right absolute bottom-2 right-2 flex items-center gap-x-1">
      <Button
        size="md"
        radius="rounded-full"
        variant="transparent"
        icon="fluent:emoji-48-filled" />
      <Button
        size="sm"
        @click="handleCreateComment"
        :isLoading="createCommentLoading"
        :text="!createCommentLoading ? 'Comment' : 'Posting...'"
        :disabled="comment.length === 0 || createCommentLoading" />
    </section>
  </div>
</template>
