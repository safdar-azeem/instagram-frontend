<script lang="ts">
import moment from 'moment'
import { Icon } from '@iconify/vue'
import { defineComponent } from 'vue'
import type { IUser } from '@/graphql'

export default defineComponent({
  name: 'UserAbout',
  components: { Icon },
  props: {
    user: {
      type: Object as () => IUser,
      required: true,
    },
  },
  setup(props) {
    return { moment }
  },
})
</script>

<template>
  <section class="flex flex-col gap-3 bg-gray-100 px-5 py-5 rounded">
    <header class="h6">About</header>
    <p class="text-[14px]">{{ user?.bio }}</p>
    <ul class="flex flex-col gap-6 mt-2">
      <li
        class="flex items-center gap-x-4"
        v-if="user?.location">
        <Icon
          icon="mdi:map-marker"
          class="icon text-fs-3" />
        <span>
          Live at
          <span class="font-bold ml-1">{{ user?.location }} </span>
        </span>
      </li>
      <li
        class="flex items-center gap-x-4"
        v-if="user?.dateOfBirth">
        <Icon
          icon="mdi:clock"
          class="icon text-fs-3" />
        <span> Born {{ moment(new Date(user?.dateOfBirth)).format('LL') }}</span>
      </li>
      <li
        class="flex items-center gap-x-4"
        v-if="user?.profession">
        <Icon
          icon="ph:bag-simple-fill"
          class="icon text-fs-3" />
        <span> {{ user?.profession }}</span>
      </li>
      <li
        class="flex items-center gap-x-4"
        v-if="user?.website">
        <Icon
          icon="ph:link-simple-bold"
          class="icon text-fs-3" />
        <a
          :href="user?.website"
          class="underline"
          target="_blank">
          {{ user?.website }}</a
        >
      </li>
      <li
        class="flex items-center gap-x-4"
        v-if="user?.createdAt">
        <Icon
          icon="ph:calendar-blank-fill"
          class="icon text-fs-3" />

        <span>Joined {{ moment(new Date(user?.createdAt)).format('MMM YYYY') }}</span>
      </li>
    </ul>
  </section>
</template>
