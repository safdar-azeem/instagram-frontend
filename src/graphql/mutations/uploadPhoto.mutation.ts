import gql from 'graphql-tag'

export const UploadPhotoMutation = gql`
  mutation UploadPhoto($file: Upload!) {
    uploadPhoto(file: $file)
  }
`
