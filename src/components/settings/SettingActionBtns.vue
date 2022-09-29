<script lang="ts">
import { defineComponent } from 'vue'
import Button from '@/components/reusable/Button.vue'

export default defineComponent({
  name: 'SettingActionBtns',
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
  <Button
    type="submit"
    text="Update"
    variant="primary"
    :isLoading="loading"
    :disabled="disabled"
    buttonClass="lg:px-7 px-10 -text-fs-1" />
</template>
