<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  onUnmounted,
  watch,
  onMounted,
  computed,
} from 'vue'
import Input from '../reusable/Input.vue'
import Button from '../reusable/Button.vue'
import UserSearchList from './UserSearchList.vue'
import { useSearchUsersByNameQuery, useSearchUsersByNameLazyQuery } from '@/graphql'
import { SearchUsersByNameQuery } from '@/graphql/queries/SearchUsersByName.query'
import type { OnClickOutsideHandler } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'

export default defineComponent({
  name: 'UserSearchInput',
  components: { Input, Button, UserSearchList },
  props: {
    showInput: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const listRef = ref(null)
    const isListOpen = ref(false)

    const listHandler: OnClickOutsideHandler = (event) => (isListOpen.value = false)
    onClickOutside(listRef, (event) => (isListOpen.value = false))

    const state = reactive({
      value: '',
    })
    let debounce = null

    const {
      load: loadUsers,
      result: users,
      error,
      loading,
    } = useSearchUsersByNameLazyQuery({
      name: state.value,
    })

    watch(
      () => state.value,
      () => {
        clearTimeout(debounce)

        if (state.value.length < 2) return

        isListOpen.value = true

        debounce = setTimeout(() => {
          loadUsers(
            SearchUsersByNameQuery,
            {
              name: state.value,
            },
            {
              fetchPolicy: 'cache-and-network',
            }
          )
        }, 500)
      }
    )

    watch(
      () => isListOpen.value,
      () => {
        if (!isListOpen.value) {
          state.value = ''
        }
      }
    )

    onMounted(() => {
      debounce = null
    })

    onUnmounted(() => {
      clearTimeout(debounce)
    })

    const errorMessage = computed(() => error.value?.message || '')

    return {
      ...toRefs(state),
      loading,
      users,
      error: errorMessage,
      isListOpen,
      listRef,
      listHandler,
    }
  },
})
</script>

<template>
  <slot />
  <div
    class="relative ml-3 md:ml-0 w-full md:w-[300px]"
    :class="{
      'hidden md:block w-full md:w-[300px]': !showInput,
    }">
    <Input
      placeholder="Search"
      slotDirection="left"
      v-model:value="value"
      class="w-full"
      className="pl-1">
      <Button
        icon="charm:search"
        variant="transparent"
        size="md"
        buttonClass="ml-1 mr-0"
        iconClass="text-fs-2" />
      <template
        v-slot:right
        v-if="loading">
        <Button
          :isLoading="true"
          variant="transparent"
          size="sm"
          class="absolute right-0"
          button-class="px-2"
          iconClass="text-fs-2" />
      </template>
    </Input>
    <UserSearchList
      v-on-click-outside.bubble="listHandler"
      ref="listRef"
      v-if="isListOpen"
      :loading="loading"
      :error="error"
      @close="isListOpen = false"
      :users="users?.searchUsersByName || []" />
  </div>
</template>
