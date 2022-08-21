import gql from 'graphql-tag'
import CommentFragment from '../fragments/comment.fragment'

export const GetCommentsQuery = gql`
  ${CommentFragment}
  query GetComments($comments: [ID!]!) {
    getComments(comments: $comments) {
      ...comment
    }
  }
`
