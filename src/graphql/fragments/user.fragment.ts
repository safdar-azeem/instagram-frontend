import { gql } from '@apollo/client'

const UserFragment = gql`
  fragment user on User {
    _id
    name
    avatar
    location
    website
    cover
    bio
    profession
    dateOfBirth
    createdAt
    followers
    following
    posts
    bookmarks
    totalNotifications
    totalMessages
    isVerified
  }
`

export default UserFragment
