import { ref, onMounted, watch } from 'vue'

export function useAutosizeTextarea(minRows = 1) {
  const textareaRef = ref(null)

  onMounted(() => {
    const textarea = textareaRef.value
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight - 8}px`
    }
  })

  function updateSize() {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
      textareaRef.value.style.height = textareaRef.value.scrollHeight - 8 + 'px'
    }
  }

  watch(
    textareaRef,
    (textarea) => {
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    },
    { immediate: true }
  )

  return { textareaRef, updateSize }
}
