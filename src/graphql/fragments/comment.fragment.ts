import { gql } from '@apollo/client'

const CommentFragment = gql`
  fragment comment on Comment {
    content
    _id
    createdAt
    likes
    post {
      _id
    }
    user {
      _id
      avatar
      name
    }
  }
`

export default CommentFragment
