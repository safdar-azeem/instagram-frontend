<script lang="ts">
import type { OnClickOutsideHandler } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'
import { defineComponent, ref, watch } from 'vue'
import Button from './Button.vue'

export default defineComponent({
  name: 'Modal',
  components: { Button },
  emits: ['open', 'close'],
  props: {
    title: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
    modalClass: String,
    modalContentClass: String,
    modalBodyClass: String,
    modalFooterClass: String,
  },
  setup(props, { emit: $emit }) {
    const modalRef = ref(null)

    const modalHandler: OnClickOutsideHandler = (event) => {
      $emit('close')
    }

    onClickOutside(modalRef, (event) => {
      $emit('close')
    })

    return {
      modalRef,
      modalHandler,
    }
  },
  computed: {
    hasFooterSlot() {
      return !this.$slots['modal-footer']
    },
  },
})
</script>

<template>
  <span>
    <slot name="trigger"></slot>
  </span>
  <section
    class="modal"
    :class="modalClass"
    v-if="isOpen">
    <section
      ref="modalRef"
      class="modal-content relative"
      :class="modalContentClass"
      v-on-click-outside.bubble="modalHandler">
      <header class="modal-header">
        <h5 class="header-title">{{ title }}</h5>
        <Button
          icon="maki:cross"
          data-close-button="#postModal"
          @click.stop="$emit('close')"
          variant="transparent"
          size="sm"
          radius="rounded-full" />
      </header>
      <main
        class="modal-body"
        :class="modalBodyClass">
        <slot name="modal-body"></slot>
      </main>
      <footer
        v-if="!hasFooterSlot"
        class="modal-footer gap-x-2 justify-end"
        :class="modalFooterClass">
        <slot name="modal-footer"></slot>
      </footer>
      <slot name="modal-aside"></slot>
    </section>
  </section>
</template>
