<script lang="ts">
import { defineComponent, reactive, toRefs, defineAsyncComponent } from 'vue'
import Button from './Button.vue'
const AddPostModal = defineAsyncComponent(() => import('../post/AddPostModal.vue'))
const UserSearchInput = defineAsyncComponent(() => import('../search/UserSearchInput.vue'))
const Input = defineAsyncComponent(() => import('./Input.vue'))
const NotificationOffCanvas = defineAsyncComponent(
  () => import('../notifications/NotificationnOffCanvas.vue')
)

export default defineComponent({
  name: 'PageHeader',
  components: { Input, Button, AddPostModal, UserSearchInput, NotificationOffCanvas },
  emits: ['openSidebar'],
  setup() {
    const state = reactive({
      showInput: false,
    })

    return { ...toRefs(state) }
  },
})
</script>

<template>
  <header class="app-header no-animation">
    <section class="flex items-center flex-1 no-animation">
      <Button
        icon="fa6-solid:bars-staggered"
        variant="transparent"
        class="sm:mr-2 ml-[-5px] lg:hidden no-animation"
        :class="{
          'hidden md:flex': showInput,
        }"
        @click="$emit('openSidebar')" />
      <UserSearchInput
        :showInput="showInput"
        class="w-full lg:w-[400px] no-animation">
        <Button
          :icon="!showInput ? 'charm:search' : 'material-symbols:arrow-back-rounded'"
          variant="transparent"
          class="mr-0 md:hidden no-animation"
          radius="rounded-full"
          iconClass="text-fs-2"
          :class="{
            'ml-[-5px]': showInput,
          }"
          @click="showInput = !showInput"
          buttonClass="ml-1 mr-0" />
      </UserSearchInput>
    </section>
    <aside
      class="flex gap-x-2 sm:gap-x-4"
      :class="{
        'hidden md:flex': showInput,
        flex: showInput,
      }">
      <Button
        icon="jam:messages-f"
        radius="rounded-full"
        variant="transparent" />
      <NotificationOffCanvas />
      <AddPostModal />
    </aside>
  </header>
</template>
