<script lang="ts">
import { useAutosizeTextarea } from '@/hooks/useAutosizeTextarea'
import useImage from '@/hooks/useImage'
import usePhotoUpload from '@/hooks/usePhotoUpload'
import { useCreatePostMutation, useMeQuery } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs } from 'vue'
import { useToast } from 'vue-toastification'
import Avatar from '../reusable/Avatar.vue'
import Button from '../reusable/Button.vue'
import Modal from '../reusable/Modal.vue'
import UploadBtn from '../reusable/UploadBtn.vue'

export default defineComponent({
  name: 'AddPostModal',
  components: { Button, Avatar, Modal, UploadBtn },
  setup($props, { emit: $emit }) {
    const toast = useToast()
    const { result: me } = useMeQuery()
    const { textareaRef, updateSize } = useAutosizeTextarea()
    const { handleUploadPhoto, uploadPhotoLoading } = usePhotoUpload()
    const {
      mutate: uploadPost,
      onError: onCreatePostError,
      loading: postLoading,
    } = useCreatePostMutation({
      refetchQueries: ['GetAllPosts', 'Me', 'GetPostsByUser'],
    })
    const { image, readAbleImage, handleImage, cancelImage } = useImage()

    const state = reactive({
      text: '',
      isModalOpen: false,
      maxTextLength: 500,
    })
    const handleText = (e: any) => {
      state.text = e.target.value
      state.maxTextLength = 500 - state.text.length
      updateSize()
    }

    const handleCreatePost = async () => {
      const photo = await handleUploadPhoto(image.value)
      const postResult: any = await uploadPost({
        content: state.text,
        photo,
      })
      if (postResult.data?.createPost) {
        toast.success('Post created successfully')
        state.text = ''
        cancelImage()
        state.isModalOpen = false
      }
    }

    onCreatePostError((error) => toast.error(error.message))

    return {
      ...toRefs(state),
      image,
      readAbleImage,
      postLoading,
      uploadPhotoLoading,
      me,
      handleImage,
      cancelImage,
      handleText,
      handleCreatePost,
      textareaRef,
    }
  },
})
</script>

<template>
  <Modal
    title="Create Post"
    @close="isModalOpen = false"
    @open="isModalOpen = true"
    :is-open="isModalOpen"
    :modalHeight="'h-max'"
    class="relative"
    :modalContentClass="readAbleImage ? 'active' : ''"
    modalFooterClass="block">
    <template v-slot:trigger>
      <Button
        text="Add Post"
        button-class="h-[2.7353293413173652rem] sm:h-[3rem]"
        @click="isModalOpen = true"
        icon="ion:add-circle" />
    </template>
    <template v-slot:modal-body>
      <main class="flex items-start gap-x-2">
        <Avatar :src="me?.me?.avatar || ''" />
        <div class="flex-1">
          <textarea
            ref="textareaRef"
            autofocus
            class="w-full text-area pt-2 theme bg-transparent"
            :class="!text ? 'h-11' : ''"
            placeholder="What’s Happening ?"
            v-model="text"
            @input="handleText" />
          <p
            class="text-right ml-auto -text-fs-2 text-gray-500 flex items-center justify-center rounded-full w-8"
            :class="{
              'text-yellow-600': maxTextLength < 15 && maxTextLength >= 0,
              'text-danger border-danger': maxTextLength < 0,
            }">
            {{ maxTextLength }}
          </p>
          <div
            class="relative bg-gray-100 mt-2 rounded-lg"
            v-if="readAbleImage">
            <img
              :src="readAbleImage"
              class="w-full rounded-lg object-contain max-h-[400px]"
              alt="" />
            <Button
              icon="ion:close"
              size="sm"
              button-class="absolute top-3 right-3 bg-[#1b1b1d40] "
              radius="rounded-full"
              @click="cancelImage" />
          </div>
        </div>
      </main>
    </template>
    <template v-slot:modal-footer>
      <footer class="-mt-2 flex gap-x-2 justify-end items-center pb-1">
        <UploadBtn
          buttonClass="border-none md"
          icon="ph:image-square-fill"
          @handleImage="handleImage" />
        <Button
          text="Post"
          :isLoading="postLoading || uploadPhotoLoading"
          :disabled="
            (!readAbleImage && !text) || maxTextLength < 0 || postLoading || uploadPhotoLoading
          "
          button-class="px-7"
          type="submit"
          size="md"
          @click="handleCreatePost" />
      </footer>
    </template>
  </Modal>
</template>
