<script lang="ts">
import { AppRoutes } from '@/constants/routes.constant'
import type { IPost, IUser } from '@/types/graphql.types'
import moment from 'moment'
import { defineComponent, reactive, toRefs, defineAsyncComponent } from 'vue'
import PostHeader from './PostHeader.vue'
const Avatar = defineAsyncComponent(() => import('../reusable/Avatar.vue'))
const Button = defineAsyncComponent(() => import('../reusable/Button.vue'))
const PostActionsDropdown = defineAsyncComponent(() => import('./PostActionsDropdown.vue'))
const PostContent = defineAsyncComponent(() => import('./PostContent.vue'))
const PostFooter = defineAsyncComponent(() => import('./PostFooter.vue'))
const PostImage = defineAsyncComponent(() => import('./PostImage.vue'))

export default defineComponent({
  name: 'PostCard',
  components: {
    Avatar,
    Button,
    PostActionsDropdown,
    PostFooter,
    PostHeader,
    PostContent,
    PostImage,
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
        @handleDeletePost="$emit('handleDeletePost', post._id)"
        :post="post"
        v-if="!isCardPhotoOnly"
        :me="me" />
      <PostContent
        @openModal="$emit('openModal')"
        :post="post"
        :isModalOpen="isModalOpen"
        :trimText="trimText" />
      <figure
        class="cursor-pointer relative h-max"
        v-if="post?.photo">
        <PostImage
          :photo="post?.photo"
          :isCardPhotoOnly="isCardPhotoOnly"
          :isAspectSquare="isModalOpen || isAspectSquare"
          @click="$emit('openModal')" />
        <footer
          v-if="isHovered && isCardPhotoOnly"
          class="overlay absolute top-0 grid place-items-center">
          <PostFooter
            :post="post"
            :me="me"
            variant="white"
            :isIconVariantSolid="true"
            :hideBookmark="true">
          </PostFooter>
        </footer>
      </figure>
      <PostFooter
        :class="isModalOpen || isAspectSquare ? 'sticky bottom-[-4px] bg-white py-1' : ''"
        v-if="!isCardPhotoOnly"
        @openModal="$emit('openModal')"
        @handleLikePost="$emit('handleLikePost', post._id)"
        @handleBookmarkPost="$emit('handleBookmarkPost', post._id)"
        :post="post"
        :me="me" />
    </article>
  </Transition>
</template>
