import gql from 'graphql-tag'
import PostFragment from '../fragments/post.fragment'

export const GetPostByIdQuery = gql`
  ${PostFragment}
  query GetPostById($postId: ID!) {
    getPostById(postId: $postId) {
      ...post
    }
  }
`
