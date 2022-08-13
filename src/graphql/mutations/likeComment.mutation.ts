import gql from 'graphql-tag'

export const LikeCommentMutation = gql`
  mutation LikeComment($commentId: ID!) {
    likeComment(commentId: $commentId)
  }
`
