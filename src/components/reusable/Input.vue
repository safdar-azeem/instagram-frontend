<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
export default defineComponent({
  name: 'Input',
  emits: ['update:value'],
  props: {
    value: String,
    error: String,
    label: String,
    name: String,
    placeholder: String,
    disabled: Boolean,
    required: Boolean,
    className: String,
    type: {
      type: String as () => 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea',
      default: 'text',
    },
    variant: {
      type: String as () => 'primary' | 'neobrutalism',
      default: 'primary',
    },
  },

  setup(props, { emit }) {
    const isFocus = ref(false)
    const onFocus = () => (isFocus.value = true)
    const onBlur = () => (isFocus.value = false)

    return {
      isFocus,
      onFocus,
      onBlur,
    }
  },
})
</script>

<template>
  <section>
    <label
      v-if="label"
      :for="name"
      class="label">
      {{ label }}
    </label>
    <div
      class="input-group"
      :class="{
        [`${variant}`]: variant,
        focus: isFocus,
        error: error,
        'h-24': type === 'textarea',
      }">
      <div class="slot">
        <slot></slot>
      </div>
      <input
        ref="input"
        class="input"
        v-if="type !== 'textarea'"
        :name="name"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        @focus="onFocus"
        :class="className"
        @blur="onBlur"
        :value="value"
        @input="$emit('update:value', $event.target['value'])" />
      <textarea
        ref="input"
        class="input textarea"
        v-else
        :name="name"
        :id="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        @focus="onFocus"
        :class="className"
        @blur="onBlur"
        :value="value"
        @input="$emit('update:value', $event.target['value'])" />
      <div class="slot">
        <slot name="right"></slot>
      </div>
    </div>
    <p
      v-if="error"
      class="text-danger mt-2 -text-fs-1">
      {{ error }}
    </p>
  </section>
</template>
