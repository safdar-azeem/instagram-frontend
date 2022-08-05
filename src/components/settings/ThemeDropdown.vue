<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import Button from '../reusable/Button.vue'
import Dropdown from '../reusable/Dropdown.vue'
export default defineComponent({
  name: 'ThemeDropdown',
  components: { Button, Dropdown },
  setup() {
    const theme = localStorage.getItem('theme') || 'light'
    const handleThemeChange = (e: any) => {
      const theme = e.target.value
      if (theme === 'light') {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      }
    }

    return {
      handleThemeChange,
      theme,
    }
  },
})
</script>

<template>
  <div>
    <label class="label"> Choose Theme </label>
    <div class="input-group pr-3">
      <select
        class="input"
        v-model="theme"
        @input="handleThemeChange">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  </div>
</template>
