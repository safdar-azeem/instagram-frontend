<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { OnClickOutsideHandler } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'
import Button from './Button.vue'

export default defineComponent({
  name: 'Offcanvas',
  components: {
    Button,
  },
  emits: ['open', 'close'],
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit: $emit }) {
    const offcanvasRef = ref(null)
    const isoffcanvasOpen = ref(false)

    const offcanvasHandler: OnClickOutsideHandler = (event) => {
      isoffcanvasOpen.value = false
      $emit('close')
    }
    onClickOutside(offcanvasRef, (event) => {
      isoffcanvasOpen.value = false
      $emit('close')
    })

    const handleClose = () => {
      isoffcanvasOpen.value = false
      $emit('close')
    }

    const openOffcanvas = () => {
      isoffcanvasOpen.value = true
      $emit('open')
    }

    return { offcanvasRef, isoffcanvasOpen, offcanvasHandler, openOffcanvas, handleClose }
  },
})
</script>

<template>
  <span @click="openOffcanvas">
    <slot name="trigger"></slot>
  </span>
  <div
    class="offcanvas"
    ref="offcanvasRef"
    v-on-click-outside.bubble="offcanvasHandler"
    v-if="isoffcanvasOpen">
    <header class="offcanvas-header">
      <h5 class="header-title">{{ title }}</h5>
      <Button
        icon="maki:cross"
        radius="rounded-full"
        @click="handleClose"
        size="sm"
        variant="transparent" />
    </header>
    <main class="offcanvas-body">
      <slot name="body"></slot>
    </main>
  </div>
</template>
