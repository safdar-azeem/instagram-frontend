<script lang="ts">
import { defineComponent, ref } from 'vue'
import Button from '../reusable/Button.vue'
import Dropdown from '../reusable/Dropdown.vue'
import { useDeletePostMutation } from '@/graphql'

export default defineComponent({
  name: 'PostActionsDropdown',
  emits: ['handleDeletePost'],
  props: {
    postId: {
      type: String,
      required: true,
    },
    isCurrentUserPost: {
      type: Boolean,
      required: true,
    },
  },
  components: { Button, Dropdown },
  setup(props, { emit }) {
    const isCopied = ref(false)

    const { mutate: deletePost } = useDeletePostMutation({
      refetchQueries: ['Me', 'GetAllPosts', 'GetPostsByUser', 'ExplorePosts', 'GetPostById'],
    })

    const handleDeletePost = () => {
      emit('handleDeletePost', props.postId)
      deletePost({
        postId: props.postId,
      })
    }

    const handleCopyLink = () => {
      const url = new URL(window.location.href)
      const postLink = `${url.origin}/post/${props.postId}`
      navigator.clipboard.writeText(postLink)
      isCopied.value = true
    }

    return {
      isCopied,
      handleCopyLink,
      handleDeletePost,
    }
  },
})
</script>

<template>
  <Dropdown @onClose="isCopied = false">
    <template v-slot:trigger>
      <Button
        size="md"
        radius="rounded-full"
        variant="transparent"
        icon="mdi:dots-horizontal" />
    </template>
    <template v-slot:menu>
      <Button
        size="md"
        text="Delete"
        icon="mdi:trash-can"
        variant="transparent"
        v-if="isCurrentUserPost"
        @click="handleDeletePost"
        button-class="justify-start font-normal -text-fs-1 w-full" />
      <Button
        size="md"
        variant="transparent"
        @click="handleCopyLink"
        :text="isCopied ? 'Copied' : 'Copy Link'"
        :icon-class="`${isCopied && 'active-item'}`"
        :icon="
          !isCopied
            ? `material-symbols:content-copy-outline-rounded`
            : `material-symbols:content-copy-rounded`
        "
        :button-class="`w-full justify-start font-normal -text-fs-1 ${
          isCopied && 'font-bold active-item'
        }`" />
      <a
        :href="`/post/${postId}`"
        target="_blank">
        <Button
          size="md"
          variant="transparent"
          text="Open in new tab"
          icon="mdi:open-in-new"
          button-class="justify-start font-normal -text-fs-1 w-full" />
      </a>
    </template>
  </Dropdown>
</template>
