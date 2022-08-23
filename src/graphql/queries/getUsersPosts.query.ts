import gql from 'graphql-tag'
import PostFragment from '../fragments/post.fragment'

export const GetPostsByUserQuery = gql`
  ${PostFragment}
  query GetPostsByUser($userId: ID!) {
    getPostsByUser(userId: $userId) {
      ...post
    }
  }
`
