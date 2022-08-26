import { reactive, toRefs } from 'vue'

const useImage = () => {
  const state = reactive({
    image: '',
    readAbleImage: '',
  })

  const handleImage = (e: any) => {
    const {
      target: {
        validity,
        files: [file],
      },
    } = e
    if (!validity.valid) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      state.readAbleImage = reader.result as string
      state.image = file
    }
  }

  const cancelImage = () => {
    state.readAbleImage = ''
    state.image = ''
  }

  return {
    ...toRefs(state),
    handleImage,
    cancelImage,
  }
}

export default useImage
