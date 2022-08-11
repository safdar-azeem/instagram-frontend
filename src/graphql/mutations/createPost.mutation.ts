import gql from 'graphql-tag'
import PostFragment from '../fragments/post.fragment'

export const CreatePostMutation = gql`
  ${PostFragment}
  mutation CreatePost($content: String, $photo: String, $isPublic: Boolean) {
    createPost(content: $content, photo: $photo, isPublic: $isPublic) {
      ...post
    }
  }
`
