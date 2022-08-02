<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'UploadBtn',
  components: { Icon },
  emits: ['handleImage', 'cancelImage'],
  props: {
    image: {
      type: String || null,
    },
    icon: {
      type: String,
      default: 'material-symbols:edit',
    },
    buttonClass: String,
    size: {
      type: String,
      default: 'sm',
    },
  },
})
</script>

<template>
  <label
    class="btn transparent rounded-full btn-icon"
    :class="{
      [`${size}`]: size,
      [`${buttonClass}`]: buttonClass,
    }"
    v-if="!image">
    <span>
      <Icon
        :icon="icon"
        class="icon" />
    </span>
    <input
      type="file"
      @change="$emit('handleImage', $event)"
      class="hidden" />
  </label>
  <button
    class="btn transparent rounded-full btn-icon"
    @click="$emit('cancelImage')"
    :class="{
      [`${size}`]: size,
      [`${buttonClass}`]: buttonClass,
    }"
    v-else>
    <span>
      <Icon
        icon="maki:cross"
        class="icon -text-fs-1" />
    </span>
  </button>
</template>
