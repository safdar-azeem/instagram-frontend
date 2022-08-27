import { useUploadPhotoMutation } from '@/graphql'
import { useToast } from 'vue-toastification'

const useUploadPhoto = () => {
  const toast = useToast()
  const {
    mutate: uploadPhoto,
    onError: onUploadPhotoError,
    loading: uploadPhotoLoading,
  } = useUploadPhotoMutation({})

  const handleUploadPhoto = async (image: any) => {
    if (!image) return
    const photoResult: any = await uploadPhoto(
      {
        file: image,
      },
      {
        context: {
          'Apollo-Require-Preflight': 'true',
          'Content-Type': 'application/json',
        },
      }
    )
    return photoResult.data?.uploadPhoto
  }

  onUploadPhotoError((error) => toast.error(error.message))

  return {
    handleUploadPhoto,
    uploadPhotoLoading,
  }
}

export default useUploadPhoto
