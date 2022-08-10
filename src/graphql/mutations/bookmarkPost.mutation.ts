import gql from 'graphql-tag'

export const BookmarkPostMutation = gql`
  mutation BookmarkPost($postId: ID!) {
    bookmarkPost(postId: $postId)
  }
`
