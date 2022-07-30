<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'
export default defineComponent({
  name: 'NavLink',
  components: { Icon },
  props: {
    to: {
      type: String,
      required: true,
    },
    icon: String,
    text: {
      type: String,
      required: true,
    },
  },
})
</script>

<template>
  <router-link
    :to="to"
    class="nav-link">
    <span
      v-if="icon"
      class="text-fs-2">
      <Icon :icon="icon" />
    </span>
    <span>{{ text }}</span>
  </router-link>
</template>
