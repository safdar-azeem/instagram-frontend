<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from './Avatar.vue'
import UserStats from '../profile/UserStats.vue'
import NavLink from './NavLink.vue'
import Button from './Button.vue'
import navigationJson from '@/json/navigation.json'
import { useMeQuery } from '@/graphql'
import Cookies from '@/utils/cookies'
import { useRouter } from 'vue-router'
import { AppRoutes } from '@/constants/routes.constant'
import PageSidebarSkeleton from '../skeletons/PageSidebarSkeleton.vue'

export default defineComponent({
  name: 'PageSidebar',
  components: { Avatar, NavLink, Button, PageSidebarSkeleton, UserStats },
  emits: ['closeSidebar'],
  setup() {
    const router = useRouter()
    const { result: MeData, loading } = useMeQuery()

    const handleLougout = () => {
      Cookies.removeToken()
      router.push(AppRoutes.LOGIN)
    }

    return {
      navigationJson,
      MeData,
      loading,
      AppRoutes,
      handleLougout,
    }
  },
})
</script>

<template>
  <PageSidebarSkeleton v-if="!MeData && loading" />

  <aside
    class="w-full flex flex-col justify-between faideIn"
    v-else>
    <header class="w-full">
      <header class="sidebar-avatar p-2 py-3 w-full rounded h-max">
        <router-link
          :to="`${AppRoutes.PROFILE}/${MeData?.me?._id}`"
          @click="$emit('closeSidebar')">
          <Avatar
            :src="MeData?.me?.avatar || ''"
            className="bg-gray-300"
            :text="MeData?.me?.name || ''" />
        </router-link>
      </header>
      <UserStats
        :user="MeData?.me"
        class="mt-6" />
      <nav class="mt-10">
        <NavLink
          v-for="item in navigationJson"
          :key="item.text"
          :to="item.to"
          :icon="item.icon"
          @click="$emit('closeSidebar')"
          :text="item.text" />
      </nav>
    </header>
    <footer>
      <Button
        text="Log Out"
        icon="material-symbols:logout-rounded"
        variant="secondary"
        fullWidth
        @click="handleLougout" />
    </footer>
  </aside>
</template>
