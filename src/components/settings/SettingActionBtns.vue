<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@/components/reusable/Button.vue'
export default defineComponent({
  name: 'SettingActionBtns',
  emits: ['handleSubmit'],
  components: {
    Button,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<template>
  <div class="flex gap-x-3">
    <Button
      class="mt-10"
      buttonClass="lg:px-7 px-10 -text-fs-1"
      text="Update"
      :isLoading="loading"
      :disabled="disabled"
      @click="$emit('handleSubmit')"
      variant="primary" />
  </div>
</template>
