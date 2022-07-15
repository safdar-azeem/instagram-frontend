<script lang="ts">
import moment from 'moment'
import { defineComponent, ref } from 'vue'
import Avatar from '../reusable/Avatar.vue'
import type { INotification } from '@/graphql'
import { AppRoutes } from '@/constants/routes.constant'
import FollowOrUnfollowBtn from '../reusable/FollowOrUnfollowBtn.vue'

export default defineComponent({
  name: 'NotificationItem',
  components: {
    Avatar,
    FollowOrUnfollowBtn,
  },
  props: {
    notification: {
      type: Object as () => INotification,
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
      const notificationTypes = {
        like: 'liked your post',
        follow: 'started following you',
        comment: 'commented on your post',
        mention: 'mentioned you in a post',
        'like-comment': 'liked a comment on your post',
      }
      return notificationTypes[this.notification?.type] || ''
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
        size="sm"
        :userId="notification?.sender?._id"
        v-if="notification?.type === 'follow'" />
      <router-link
        :to="postRoute"
        v-if="/^(like|comment|mention|like-comment)$/.test(notification?.type)">
        <Avatar
          radius="rounded"
          :src="notification?.post?.photo || '/textPostPhoto.png'" />
      </router-link>
    </aside>
  </div>
</template>
