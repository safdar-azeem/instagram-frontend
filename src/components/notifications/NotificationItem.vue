<script lang="ts">
import { defineComponent, ref } from 'vue'
import Avatar from '../reusable/Avatar.vue'
import FollowOrUnfollowBtn from '../reusable/FollowOrUnfollowBtn.vue'
import { AppRoutes } from '@/constants/routes.constant'
import moment from 'moment'

export default defineComponent({
  name: 'NotificationItem',
  components: {
    Avatar,
    FollowOrUnfollowBtn,
  },
  props: {
    notification: {
      type: Object,
    },
  },
  setup() {
    const isHovered = ref(false)
    return { AppRoutes, isHovered }
  },
  computed: {
    profileRoute() {
      return `${AppRoutes.PROFILE}/${this.notification?.sender?._id}`
    },
    postRoute() {
      return `${AppRoutes.POST}/${this.notification?.post?._id}`
    },
    text() {
      switch (this.notification?.type) {
        case 'follow':
          return 'started following you'
        case 'like':
          return 'liked your post'
        case 'comment':
          return 'commented on your post'
        case 'mention':
          return 'mentioned you in a post'
        case 'like-comment':
          return 'liked a comment on your post'
        default:
          return ''
      }
    },
    timeAgo() {
      return moment(this.notification.createdAt).fromNow()
    },
    isSeen() {
      return this.notification?.isSeen
    },
  },
})
</script>

<template>
  <div
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="notification-item"
    :class="{
      'bg-gray-100': !isSeen,
    }">
    <router-link :to="profileRoute">
      <Avatar
        :src="notification?.sender?.avatar"
        :className="!isSeen || isHovered ? 'bg-gray-300' : 'bg-gray-100'" />
    </router-link>
    <aside class="notification-item-content">
      <div>
        <div>
          <router-link :to="profileRoute"
            ><span class="h6 mr-2">{{ notification?.sender?.name }}</span>
          </router-link>
          <span>
            {{ text }}
          </span>
        </div>
        <span class="-text-fs-3 text-gray-600">{{ timeAgo }}</span>
      </div>
      <FollowOrUnfollowBtn
        v-if="notification?.type === 'follow'"
        :userId="notification?.sender?._id"
        size="sm" />
      <router-link
        :to="postRoute"
        v-if="
          notification?.type === 'like' ||
          notification?.type === 'comment' ||
          notification?.type === 'mention' ||
          notification?.type === 'like-comment'
        ">
        <Avatar
          :src="notification?.post?.photo || '/textPostPhoto.png'"
          radius="rounded" />
      </router-link>
    </aside>
  </div>
</template>
