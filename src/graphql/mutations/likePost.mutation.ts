import gql from 'graphql-tag'

export const LikePostMutation = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId)
  }
`
