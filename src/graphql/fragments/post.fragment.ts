import { gql } from '@apollo/client'

const PostFragment = gql`
  fragment post on Post {
    _id
    content
    photo
    user {
      name
      _id
      avatar
    }
    createdAt
    likes
    comments
    isPublic
  }
`

export default PostFragment
