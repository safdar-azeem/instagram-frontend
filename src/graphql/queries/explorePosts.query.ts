import gql from 'graphql-tag'
import PostFragment from '../fragments/post.fragment'

export const ExplorePostsQuery = gql`
  ${PostFragment}
  query ExplorePosts($limit: Int) {
    explorePosts(limit: $limit) {
      ...post
    }
  }
`
