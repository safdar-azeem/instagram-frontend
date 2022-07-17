<script lang="ts">
import useImage from '@/hooks/useImage'
import Modal from '../reusable/Modal.vue'
import Avatar from '../reusable/Avatar.vue'
import Button from '../reusable/Button.vue'
import { useToast } from 'vue-toastification'
import UploadBtn from '../reusable/UploadBtn.vue'
import usePhotoUpload from '@/hooks/usePhotoUpload'
import { defineComponent, reactive, toRefs } from 'vue'
import { useAutosizeTextarea } from '@/hooks/useAutosizeTextarea'
import { useCreatePostMutation, useMeQuery } from '@/graphql'

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
      me,
      handleText,
      postLoading,
      handleImage,
      cancelImage,
      textareaRef,
      readAbleImage,
      handleCreatePost,
      uploadPhotoLoading,
    }
  },
})
</script>

<template>
  <Modal
    title="Create Post"
    class="relative"
    :is-open="isModalOpen"
    :modalHeight="'h-max'"
    modalFooterClass="block"
    @open="isModalOpen = true"
    @close="isModalOpen = false"
    :modalContentClass="readAbleImage ? 'active' : ''">
    <template v-slot:trigger>
      <Button
        text="Add Post"
        icon="ion:add-circle"
        @click="isModalOpen = true"
        button-class="h-[2.7353293413173652rem] sm:h-[3rem]" />
    </template>
    <template v-slot:modal-body>
      <main class="flex items-start gap-x-2">
        <Avatar :src="me?.me?.avatar || ''" />
        <div class="flex-1">
          <textarea
            ref="textareaRef"
            autofocus
            v-model="text"
            @input="handleText"
            :class="!text ? 'h-11' : ''"
            placeholder="What’s Happening ?"
            class="w-full text-area pt-2 theme bg-transparent" />
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
              size="sm"
              icon="ion:close"
              radius="rounded-full"
              @click="cancelImage"
              button-class="absolute top-3 right-3 bg-[#1b1b1d40] " />
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
          size="md"
          type="submit"
          button-class="px-7"
          :isLoading="postLoading || uploadPhotoLoading"
          @click="handleCreatePost"
          :disabled="
            (!readAbleImage && !text) || maxTextLength < 0 || postLoading || uploadPhotoLoading
          " />
      </footer>
    </template>
  </Modal>
</template>
