import gql from 'graphql-tag'
import PostFragment from '../fragments/post.fragment'

export const GetBookmarkedPostsQuery = gql`
  ${PostFragment}
  query GetBookmarkedPosts {
    getBookmarkedPosts {
      ...post
    }
  }
`
