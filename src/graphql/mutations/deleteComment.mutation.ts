import gql from 'graphql-tag'

export const DeleteCommentMutation = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId)
  }
`
