<script lang="ts">
import type { IUser } from '@/graphql'
import { defineComponent, watch } from 'vue'
import Avatar from '../reusable/Avatar.vue'
import { AppRoutes } from '@/constants/routes.constant'
export default defineComponent({
  components: { Avatar },
  name: 'UserSearchList',
  emits: ['close'],
  props: {
    loading: Boolean,
    error: String,
    users: {
      type: Array as () => IUser[],
      required: true,
    },
  },
  setup() {
    return { AppRoutes }
  },
})
</script>

<template>
  <section
    class="w-full shadow px-2 py-3 rounded-md bg-white mt-2 max-h-[500px] min-h-[70px] overflow-auto absolute">
    <section>
      <section
        v-if="loading"
        class="flex flex-col gap-y-5">
        <template>
          <Avatar
            v-for="i in 3"
            :key="i"
            :is-loading="true"
            size="sm"
            class="mb-3"
            :src="''" />
        </template>
      </section>
      <div
        v-else-if="error"
        class="grid place-items-center pt-3">
        <p class="text-center">
          {{ error }}
        </p>
      </div>
      <section v-else>
        <router-link
          v-for="user in users"
          :key="user?._id"
          :to="`${AppRoutes.PROFILE}/${user?._id}`"
          @click="$emit('close')">
          <Avatar
            class="hover:bg-gray-100 p-3 rounded-md"
            :src="user?.avatar || ''"
            :text="user?.name || ''"
            size="sm" />
        </router-link>
      </section>
    </section>
  </section>
</template>
