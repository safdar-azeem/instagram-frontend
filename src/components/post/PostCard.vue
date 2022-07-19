<script lang="ts">
import moment from 'moment'
import PostHeader from './PostHeader.vue'
import { AppRoutes } from '@/constants/routes.constant'
import type { IPost, IUser } from '@/graphql'
import { defineComponent, reactive, toRefs, defineAsyncComponent } from 'vue'

const PostImage = defineAsyncComponent(() => import('./PostImage.vue'))
const PostFooter = defineAsyncComponent(() => import('./PostFooter.vue'))
const Avatar = defineAsyncComponent(() => import('../reusable/Avatar.vue'))
const Button = defineAsyncComponent(() => import('../reusable/Button.vue'))
const PostContent = defineAsyncComponent(() => import('./PostContent.vue'))
const PostActionsDropdown = defineAsyncComponent(() => import('./PostActionsDropdown.vue'))

export default defineComponent({
  name: 'PostCard',
  components: {
    Avatar,
    Button,
    PostImage,
    PostFooter,
    PostHeader,
    PostContent,
    PostActionsDropdown,
  },
  emits: ['handleDeletePost', 'handleLikePost', 'handleBookmarkPost', 'openModal'],
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
    me: {
      type: Object as () => IUser | null,
      required: true,
    },
    height: String,
    trimText: {
      type: Boolean,
      default: true,
    },
    isCardPhotoOnly: {
      type: Boolean,
      default: false,
    },
    isModalOpen: {
      type: Boolean,
      default: false,
    },
    isAspectSquare: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const state = reactive({
      isHovered: false,
    })

    return { ...toRefs(state), AppRoutes, moment }
  },
})
</script>

<template>
  <Transition
    name="card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    <article
      class="post-card"
      :class="{
        'gap-0': isCardPhotoOnly && !post?.photo,
        'gap-3': isCardPhotoOnly && post?.photo,
      }">
      <PostHeader
        :me="me"
        :post="post"
        v-if="!isCardPhotoOnly"
        @handleDeletePost="$emit('handleDeletePost', post._id)" />
      <PostContent
        :post="post"
        :trimText="trimText"
        :isModalOpen="isModalOpen"
        @openModal="$emit('openModal')" />
      <figure
        class="cursor-pointer relative h-max"
        v-if="post?.photo">
        <PostImage
          :photo="post?.photo"
          @click="$emit('openModal')"
          :isCardPhotoOnly="isCardPhotoOnly"
          :isAspectSquare="isModalOpen || isAspectSquare" />
        <footer
          v-if="isHovered && isCardPhotoOnly"
          class="overlay absolute top-0 grid place-items-center">
          <PostFooter
            :me="me"
            :post="post"
            variant="white"
            :hideBookmark="true"
            :isIconVariantSolid="true">
          </PostFooter>
        </footer>
      </figure>
      <PostFooter
        :me="me"
        :post="post"
        v-if="!isCardPhotoOnly"
        @openModal="$emit('openModal')"
        @handleLikePost="$emit('handleLikePost', post._id)"
        @handleBookmarkPost="$emit('handleBookmarkPost', post._id)"
        :class="isModalOpen || isAspectSquare ? 'sticky bottom-[-4px] bg-white py-1' : ''" />
    </article>
  </Transition>
</template>
