import gql from 'graphql-tag'
import CommentFragment from '../fragments/comment.fragment'

export const CreateCommentMutation = gql`
  ${CommentFragment}
  mutation CreateComment($content: String!, $postId: ID!) {
    createComment(content: $content, postId: $postId) {
      ...comment
    }
  }
`
