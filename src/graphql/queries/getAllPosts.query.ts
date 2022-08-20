import gql from 'graphql-tag'
import PostFragment from '../fragments/post.fragment'

export const GetAllPostsQuery = gql`
  ${PostFragment}
  query GetAllPosts {
    getAllPosts {
      ...post
    }
  }
`
