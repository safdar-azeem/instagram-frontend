import gql from 'graphql-tag'

export const UpdateProfileMutation = gql`
  mutation UpdateProfile(
    $name: String
    $bio: String
    $avatar: String
    $location: String
    $website: String
    $cover: String
    $dateOfBirth: String
    $profession: String
  ) {
    updateProfile(
      name: $name
      bio: $bio
      avatar: $avatar
      location: $location
      website: $website
      cover: $cover
      dateOfBirth: $dateOfBirth
      profession: $profession
    )
  }
`
