<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'Button',
  components: { Icon },
  props: {
    text: String,
    type: {
      type: String as () => 'button' | 'submit' | 'reset',
      default: 'button',
    },
    iconDirection: {
      type: String as () => 'left' | 'right',
      default: 'left',
    },
    variant: {
      type: String as () =>
        | 'primary'
        | 'secondary'
        | 'danger'
        | 'Default'
        | 'transparent'
        | 'neobrutalism'
        | 'like'
        | 'outline',
      default: 'primary',
    },
    size: {
      type: String as () => 'sm' | 'md' | 'lg' | 'default',
      default: 'default',
    },
    radius: {
      type: String,
      default: 'rounded',
    },
    loadingDirection: {
      type: String as () => 'left' | 'right',
      default: 'left',
    },
    isLoading: Boolean,
    fullWidth: Boolean,
    disabled: Boolean,
    buttonClass: String,
    iconClass: String,
    icon: String,
  },
})
</script>

<template>
  <button
    class="btn"
    :class="{
      [`${variant}`]: variant,
      [`${size}`]: size,
      [`${radius}`]: radius,
      'w-full': fullWidth,
      loading: isLoading,
      [`${loadingDirection}`]: loadingDirection,
      'btn-icon': !text && icon,
      [`${buttonClass}`]: buttonClass,
      disabled: disabled,
    }"
    :disabled="disabled"
    :type="type">
    <span v-if="icon && iconDirection === 'left'">
      <Icon
        :icon="icon"
        class="icon"
        :class="iconClass" />
    </span>
    <span
      v-if="text"
      class="whitespace-nowrap"
      >{{ text }}</span
    >
    <span v-if="icon && iconDirection === 'right'">
      <Icon
        :icon="icon"
        class="icon"
        :class="iconClass" />
    </span>
  </button>
</template>
