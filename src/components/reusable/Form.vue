<script lang="ts">
import { defineComponent } from 'vue'
import useForm from '@/hooks/useForm'
import Input from '../reusable/Input.vue'
import type { Form } from '../../types/form.type'

export default defineComponent({
  name: 'Form',
  components: {
    Input,
  },
  props: {
    values: Object,
    schema: {
      type: Object as () => Form[],
    },
  },
  emits: ['onSubmit'],
  setup(props, { emit }) {
    const { state, handleChange, doValidation } = useForm(props.schema)

    const handleSubmit = (e: Event) => {
      e.preventDefault()
      if (doValidation()) {
        const values = {}
        Object.keys(state).forEach((key) => {
          values[key] = state[key].value
        })

        emit('onSubmit', values)
      }
    }

    return {
      handleSubmit,
      handleChange,
      state,
    }
  },
})
</script>

<template>
  <form
    class="grid gap-y-5"
    @submit="handleSubmit">
    <Input
      :key="item.name"
      :name="item.name"
      :type="item.type"
      :label="item.label"
      :variant="item.variant"
      v-for="item in schema"
      :placeholder="item.placeholder"
      :error="state[item.name].error"
      @update:value="handleChange(item.name)"
      v-model:value="state[item.name].value" />
    <slot />
  </form>
</template>
