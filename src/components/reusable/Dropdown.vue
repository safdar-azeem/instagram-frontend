<script lang="ts">
import type { OnClickOutsideHandler } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  emits: ['onClose'],
  setup(props, { emit }) {
    const dropdownRef = ref(null)
    const isDropdownOpen = ref(false)

    const dropdownHandler: OnClickOutsideHandler = (event) => (isDropdownOpen.value = false)
    onClickOutside(dropdownRef, (event) => {
      isDropdownOpen.value = false
      emit('onClose')
    })

    return {
      dropdownRef,
      dropdownHandler,
      isDropdownOpen,
    }
  },
})
</script>

<template>
  <div class="dropdown">
    <div class="dropdown-trigger">
      <span @click.stop="isDropdownOpen = !isDropdownOpen">
        <slot name="trigger"></slot>
      </span>
    </div>
    <div
      class="dropdown-menu"
      ref="dropdownRef"
      v-if="isDropdownOpen"
      v-on-click-outside.bubble="dropdownHandler">
      <div class="dropdown-content">
        <slot name="menu"></slot>
      </div>
    </div>
  </div>
</template>
