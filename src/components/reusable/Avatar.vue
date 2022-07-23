<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'Avatar',
  components: { Icon },
  props: {
    src: {
      type: String,
      required: true,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    size: {
      type: String as () => 'sm' | 'md' | 'default' | 'lg',
      default: 'default',
    },
    classNameContainer: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: 'bg-gray-100',
    },
    textClassName: {
      type: String,
      default: '',
    },
    radius: {
      type: String,
      default: 'rounded-full',
    },
    isLoading: Boolean,
    time: String,
  },
})
</script>

<template>
  <div class="flex gap-x-3 items-center">
    <div
      class="avatar grid place-items-center rounded-full"
      :class="{
        [`${size}`]: size,
        [`${classNameContainer}`]: classNameContainer,
        [`${className}`]: className,
        skeleton: isLoading,
      }">
      <img
        v-if="src"
        :src="src"
        class="border border-gray-200"
        :class="{
          [`${radius}`]: radius,
        }" />
      <span v-else>
        <Icon
          icon="gridicons:user"
          :class="{
            [`${size}`]: size,
            [`${className}`]: className,
          }"
          class="avatar-icon text-gray-500 rounded-full" />
      </span>
    </div>
    <div>
      <p
        v-if="text"
        class="avatar-text"
        :class="{
          [`${size}`]: size,
          [`${textClassName}`]: textClassName,
        }">
        {{ text }}
      </p>
      <p
        v-if="isLoading"
        class="avatar-text h-5 w-28 skeleton rounded"
        :class="{
          'mt-8 h-7 w-36': size === 'lg',
        }"></p>
      <p
        class="text-[12px] text-gray-600"
        v-if="time">
        {{ time }}
      </p>
    </div>
  </div>
</template>
