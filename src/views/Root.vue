<script lang="ts">
import { onClickOutside } from '@vueuse/core'
import { useMeQuery } from '@/graphql'
import type { OnClickOutsideHandler } from '@vueuse/core'
import { defineComponent, ref, defineAsyncComponent, onMounted } from 'vue'

const PageHeader = defineAsyncComponent(() => import('@/components/reusable/PageHeader.vue'))
const PageSidebar = defineAsyncComponent(() => import('@/components/reusable/PageSidebar.vue'))

export default defineComponent({
  name: 'Root',
  components: {
    PageSidebar,
    PageHeader,
  },

  setup() {
    const theme = localStorage.getItem('theme') || 'light'
    const sidebarRef = ref(null)
    const isSidebarOpen = ref(false)

    const sidebarHandler: OnClickOutsideHandler = (event) => (isSidebarOpen.value = false)
    onClickOutside(sidebarRef, (event) => (isSidebarOpen.value = false))

    const { result, loading, error } = useMeQuery()

    onMounted(() => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      }
    })

    return {
      result,
      loading,
      error,
      isSidebarOpen,
      sidebarRef,
      sidebarHandler,
    }
  },
  computed: {
    routePath() {
      return this.$route.path
    },
  },
})
</script>

<template>
  <div class="app-layout">
    <aside
      class="app-sidebar"
      ref="sidebarRef"
      v-on-click-outside.bubble="sidebarHandler"
      :class="{
        'hidden lg:flex': !isSidebarOpen,
        flex: isSidebarOpen,
      }">
      <PageSidebar @closeSidebar="isSidebarOpen = false" />
    </aside>
    <main class="app-main w-full">
      <PageHeader @openSidebar="isSidebarOpen = !isSidebarOpen" />
      <section class="py-6">
        <router-view :key="routePath" />
      </section>
    </main>
  </div>
</template>
