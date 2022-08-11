import gql from 'graphql-tag'

export const DeletePostMutation = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`
